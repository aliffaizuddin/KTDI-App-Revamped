import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {map, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const token = localStorage.getItem('jwt_token');

  if (!token){
    return router.parseUrl('/authentication');
  }

  // Optional to verify token validity by calling a protected endpoint
  return authService.getUsers().pipe(
    map(() => true),
    catchError((error) => {
      authService.logout();
      return throwError(error);
    })
  )
}
