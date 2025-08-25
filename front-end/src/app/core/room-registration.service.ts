import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoomRegistration} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class RoomRegistrationService {
  private readonly apiUrl = `${environment.apiUrl}/room-registration`;

  constructor(private readonly http: HttpClient) {}

  getRooms(): Observable<RoomRegistration[]> {
    return this.http.get<RoomRegistration[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching rooms:', error);
        return throwError(() => new Error('Failed to fetch rooms'));
      })
    );
  }

  createRoom(room: RoomRegistration): Observable<RoomRegistration> {
    return this.http.post<RoomRegistration>(this.apiUrl, room).pipe(
      catchError((error) => {
        console.error('Error creating room:', error);
        return throwError(() => new Error('Failed to create room'));
      })
    );
  }

  updateRoom(id: number, room: RoomRegistration): Observable<RoomRegistration> {
    return this.http.put<RoomRegistration>(`${this.apiUrl}/${id}`, room).pipe(
      catchError((error) => {
        console.error('Error updating room:', error);
        return throwError(() => new Error('Failed to update room'));
      })
    );
  }

  deleteRoom(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting room:', error);
        return throwError(() => new Error('Failed to delete room'));
      })
    );
  }
}
