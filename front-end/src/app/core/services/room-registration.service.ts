import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RoomRegistration} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class RoomRegistrationService {
  private readonly API_ENDPOINT = `${environment.API_URL}/room-registration`;
  private readonly httpClient = inject(HttpClient);

  getRooms$: () => Observable<RoomRegistration[]> = () => this.httpClient.get<RoomRegistration[]>(this.API_ENDPOINT)
  createRooms$: (room: RoomRegistration) => Observable<RoomRegistration> = (room: RoomRegistration) => this.httpClient.post<RoomRegistration>(this.API_ENDPOINT, room);
  updateRooms$: (id: number, room: RoomRegistration) => Observable<RoomRegistration> = (id: number, room: RoomRegistration) => this.httpClient.put<RoomRegistration>(`${this.API_ENDPOINT}/${id}`, room);
  deleteRooms$: (id: number) => Observable<{ message:string }> = (id: number) => this.httpClient.delete<{ message: string }>(`${this.API_ENDPOINT}/${id}`);
}
