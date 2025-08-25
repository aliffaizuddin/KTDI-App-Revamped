import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Feedback} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly apiUrl = `${environment.apiUrl}/feedback`;

  constructor(private readonly http: HttpClient) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching feedback:', error);
        return throwError(() => new Error('Failed to fetch feedback'));
      })
    );
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback).pipe(
      catchError((error) => {
        console.error('Error creating feedback:', error);
        return throwError(() => new Error('Failed to create feedback'));
      })
    );
  }

  updateFeedback(id: number, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback).pipe(
      catchError((error) => {
        console.error('Error updating feedback:', error);
        return throwError(() => new Error('Failed to update feedback'));
      })
    );
  }

  deleteFeedback(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting feedback:', error);
        return throwError(() => new Error('Failed to delete feedback'));
      })
    );
  }
}
