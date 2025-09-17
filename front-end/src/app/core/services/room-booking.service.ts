import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HallBooking, RoomBooking} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class RoomBookingService {
  private readonly API_ENDPOINT = `${environment.API_URL}/room-booking`;
  private readonly httpClient = inject(HttpClient);

  getRoomBookings$: () => Observable<HallBooking[]> = () =>this.httpClient.get<HallBooking[]>(this.API_ENDPOINT);
  createBookings$: (booking: RoomBooking) => Observable<RoomBooking> = (booking: RoomBooking) => this.httpClient.post<RoomBooking>(this.API_ENDPOINT, booking);
  updateBookings$: (id: number, booking: RoomBooking) => Observable<RoomBooking> = (id: number, booking: RoomBooking) => this.httpClient.put<RoomBooking>(`${this.API_ENDPOINT}/${id}`, booking);
  deleteBookings$: (id: number) => Observable<{message: string}> = (id: number) => this.httpClient.delete<{message: string}>(`${this.API_ENDPOINT}/${id}`);
}
