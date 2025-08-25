import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {HallBooking} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class HallBookingService {
  private readonly apiUrl = `${environment.apiUrl}/hall-booking`;

  constructor(private readonly http: HttpClient) {}

  getBookings(): Observable<HallBooking[]> {
    return this.http.get<HallBooking[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching hall bookings:', error);
        return throwError(() => new Error('Failed to fetch hall bookings'));
      })
    );
  }

  createBooking(booking: HallBooking): Observable<HallBooking> {
    return this.http.post<HallBooking>(this.apiUrl, booking).pipe(
      catchError((error) => {
        console.error('Error creating hall booking:', error);
        return throwError(() => new Error('Failed to create hall booking'));
      })
    );
  }

  updateBooking(id: number, booking: HallBooking): Observable<HallBooking> {
    return this.http.put<HallBooking>(`${this.apiUrl}/${id}`, booking).pipe(
      catchError((error) => {
        console.error('Error updating hall booking:', error);
        return throwError(() => new Error('Failed to update hall booking'));
      })
    );
  }

  deleteBooking(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting hall booking:', error);
        return throwError(() => new Error('Failed to delete hall booking'));
      })
    );
  }
}
