import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Authentication, LoginCredentials, LoginResponse} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly AUTH_ENDPOINT = "http://localhost:3000/authentication";
  private readonly API_ENDPOINT = environment.API_URL;
  private readonly httpClient = inject(HttpClient)

  login$: (params: LoginCredentials) => Observable<LoginResponse> = (params: LoginCredentials) => this.httpClient.get<LoginResponse>(`${this.API_ENDPOINT}/login`, {params});
  getUsers$: () => Observable<Authentication[]> = () => this.httpClient.get<Authentication[]>(`${this.API_ENDPOINT}/authentication`);
  createUser$: (user: Authentication) => Observable<Authentication> = (user: Authentication) => this.httpClient.post<Authentication>(`${this.API_ENDPOINT}/authentication`, user);
  updateUser$: (id: number, user: Authentication) => Observable<Authentication> = (id: number, user: Authentication) => this.httpClient.put<Authentication>(`${this.API_ENDPOINT}/authentication/${id}`, user);
  deleteUser$: (id: number) => Observable<{message: string}> = (id: number) => this.httpClient.delete<{message: string}>(`${this.API_ENDPOINT}/authentication/${id}`);

  logout(): void {
    localStorage.removeItem('token');
  }
}
