import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {RoomBooking} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class RoomBookingService {
  private readonly apiUrl = `${environment.apiUrl}/room-booking`;

  constructor(private readonly http: HttpClient) {}

  getBookings(): Observable<RoomBooking[]> {
    return this.http.get<RoomBooking[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching bookings:', error);
        return throwError(() => new Error('Failed to fetch bookings'));
      })
    );
  }

  createBooking(booking: RoomBooking): Observable<RoomBooking> {
    return this.http.post<RoomBooking>(this.apiUrl, booking).pipe(
      catchError((error) => {
        console.error('Error creating booking:', error);
        return throwError(() => new Error('Failed to create booking'));
      })
    );
  }

  updateBooking(id: number, booking: RoomBooking): Observable<RoomBooking> {
    return this.http.put<RoomBooking>(`${this.apiUrl}/${id}`, booking).pipe(
      catchError((error) => {
        console.error('Error updating booking:', error);
        return throwError(() => new Error('Failed to update booking'));
      })
    );
  }

  deleteBooking(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting booking:', error);
        return throwError(() => new Error('Failed to delete booking'));
      })
    );
  }
}
