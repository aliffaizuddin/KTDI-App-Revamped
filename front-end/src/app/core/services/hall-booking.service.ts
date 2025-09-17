import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HallBooking} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class HallBookingService {
  private readonly API_ENDPOINT = `${environment.API_URL}/hall-booking`;
  private readonly httpClient = inject(HttpClient);

  getHallBookings$: () => Observable<HallBooking[]> = () => this.httpClient.get<HallBooking[]>(this.API_ENDPOINT);
  createHallBookings$: (booking: HallBooking) => Observable<HallBooking> = (booking: HallBooking) => this.httpClient.post<HallBooking>(this.API_ENDPOINT, booking);
  updateHallBookings$: (id: number, booking: HallBooking) => Observable<HallBooking> = (id: number, booking: HallBooking) => this.httpClient.put<HallBooking>(`${this.API_ENDPOINT}/${id}`, booking);
  deleteHallBookings$: (id:number) => Observable<{ message: string }> = (id: number) => this.httpClient.delete<{ message: string }>(`${this.API_ENDPOINT}/${id}`);
}
