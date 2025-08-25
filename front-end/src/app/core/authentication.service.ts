import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  Authentication,
  LoginCredentials,
  LoginResponse
} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = `${environment.apiUrl}/authentication`;
  private readonly loginUrl = `${environment.apiUrl}/login`;

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  getUsers(): Observable<Authentication[]> {
    return this.http.get<Authentication[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  createUser(user: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(() => new Error('Failed to create user'));
      })
    );
  }

  updateUser(id: number, user: Authentication): Observable<Authentication> {
    return this.http.put<Authentication>(`${this.apiUrl}/${id}`, user).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
