import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ToggleLanguageComponent} from '../../shared/ui/toggle-language/toggle-language.component';
import {AppPages} from '../../app.component';
import {setActivePage} from '../../shared/utils/page-utils';
import {AuthenticationPage} from '../../shared/utils/page-enums';
import {AuthenticationService} from '../../core/services/authentication.service';
import {Authentication, LoginCredentials} from '../../core/models/ktdi';
import {Router} from '@angular/router';
import {EMPTY, map, switchMap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, TranslateModule, ToggleLanguageComponent],
  templateUrl: './authentication.component.html',
  standalone: true,
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  AppPages = AppPages
  authPage: AuthenticationPage = AppPages.Authentication.Login;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router)
  /**
   * Authentication form consists of login and sign up
   * Login contains email & password
   * Sign up contains email, password & phone number
   */
  authenticationForm = this.formBuilder.group({
    login: this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    }),
    signUp: this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]),
      phoneNumber: this.formBuilder.control('', [Validators.required])
    }),
    forgotPassword: this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
    })
  })
  private authenticationService = inject(AuthenticationService);

  /**
   * Switch view from sign up -> login or vice versa
   */
  switchPage(choice: AuthenticationPage) {
    this.authPage = setActivePage(this.authPage, choice);
  }

  /**
   * Sign In functions
   * Extract login form group from Authentication form
   * Passed the login form value to Authentication service
   */
  onSignIn(signInMethod: string) {
    const loginForm = this.authenticationForm.get('login') as FormGroup
    if (loginForm.valid) {
      const credentials: LoginCredentials = loginForm.value;
      if (signInMethod === 'standard') {
        this.authenticationService.login$(credentials).subscribe({
          next: result => {
            localStorage.setItem('token', result.token);
            this.router.navigate(['/home']);
            },

          error: error => {console.error('Login error', error);}
        })
      }
      else if (signInMethod == 'google'){}
      else {
        Object.keys(loginForm.controls).forEach(key => {
          loginForm.get(key)?.markAsTouched({ onlySelf: true })
        })
      }
    }
  }

  /**
   * Sign Up functions
   * Extract signup form group from Authentication form
   * Passed the signUp form value to Authentication service
   * Then, logged in the user
   * @param(signUpMethod)
   */
  onSignUp(signUpMethod: string) {
    const signUpForm = this.authenticationForm.get('signUp') as FormGroup;
    if (signUpForm.valid) {
      const user: Authentication = signUpForm.value;
      if (signUpMethod === 'standard') {
        this.authenticationService.createUser$(user).pipe(
          switchMap(() => this.authenticationService.login$({
            email: user.email,
            password: user.password,
          })),
          catchError(err => {
            console.error('Login error: ', err);
            return EMPTY;
          })
        ).subscribe({
          next: response => {
            localStorage.setItem('token', response.token)
            this.router.navigate(['/home'])
          },
          error: error => {console.error('Authentication error: ', error);}
        })
      }
    }
  }

}
