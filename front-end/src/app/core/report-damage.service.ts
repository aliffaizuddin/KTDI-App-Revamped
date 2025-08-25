import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ReportDamage} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class ReportDamageService {
  private readonly apiUrl = `${environment.apiUrl}/report-damage`;

  constructor(private readonly http: HttpClient) {}

  getReports(): Observable<ReportDamage[]> {
    return this.http.get<ReportDamage[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching damage reports:', error);
        return throwError(() => new Error('Failed to fetch damage reports'));
      })
    );
  }

  createReport(report: ReportDamage): Observable<ReportDamage> {
    return this.http.post<ReportDamage>(this.apiUrl, report).pipe(
      catchError((error) => {
        console.error('Error creating damage report:', error);
        return throwError(() => new Error('Failed to create damage report'));
      })
    );
  }

  updateReport(id: number, report: ReportDamage): Observable<ReportDamage> {
    return this.http.put<ReportDamage>(`${this.apiUrl}/${id}`, report).pipe(
      catchError((error) => {
        console.error('Error updating damage report:', error);
        return throwError(() => new Error('Failed to update damage report'));
      })
    );
  }

  deleteReport(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting damage report:', error);
        return throwError(() => new Error('Failed to delete damage report'));
      })
    );
  }
}
