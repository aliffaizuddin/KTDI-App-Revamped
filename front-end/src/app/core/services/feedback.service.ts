import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Feedback} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private readonly API_ENDPOINT = `${environment.API_URL}/feedback`;
  private readonly httpClient = inject(HttpClient)

  getFeedbacks$: () => Observable<Feedback[]> = () => this.httpClient.get<Feedback[]>(this.API_ENDPOINT);
  createFeedback$: (feedback: Feedback) => Observable<Feedback> = (feedback: Feedback) => this.httpClient.post<Feedback>(this.API_ENDPOINT, feedback);
  updateFeedback$: (id: number, feedback: Feedback) => Observable<Feedback> = (id: number, feedback: Feedback) => this.httpClient.put<Feedback>(`${this.API_ENDPOINT}/${id}`, feedback);
  deleteFeedback$: (id: number) => Observable<{ message: string }> = (id: number) => this.httpClient.delete<{ message: string }>(`${this.API_ENDPOINT}/${id}`);
}
