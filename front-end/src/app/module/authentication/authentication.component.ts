import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ToggleLanguageComponent} from '../../shared/ui/toggle-language/toggle-language.component';
import {AppPages} from '../../app.component';
import {setActivePage} from '../../shared/utils/page-utils';
import {AuthenticationPage} from '../../shared/utils/page-enums';
import {AuthenticationService} from '../../core/authentication.service';
import {LoginCredentials} from '../../core/api-interface';

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
        this.authenticationService.login(credentials).subscribe({
          next: result => {
            console.log('Login Successful: ', result);
          },
          error: error => {
            console.error('Login error', error);
          }
        })
      }
      else if (signInMethod == 'google'){
      }
      else {
        console.error('Login failed');
        loginForm.markAllAsTouched()
      }
    }
  }

}
