import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly authService = inject(AuthenticationService);
  private router = inject(Router);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const cloned = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
    return next.handle(cloned).pipe(
      catchError(err => {
        if (err.status === 401){
          this.authService.logout();
          this.router.navigate(['/authentication'])
        }
        return EMPTY;
      })
    )
  }
}
