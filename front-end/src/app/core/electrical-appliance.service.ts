import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ElectricalAppliance} from './api-interface';

@Injectable({
  providedIn: 'root',
})
export class ElectricalApplianceService {
  private readonly apiUrl = `${environment.apiUrl}/electrical-appliance`;

  constructor(private readonly http: HttpClient) {}

  getAppliances(): Observable<ElectricalAppliance[]> {
    return this.http.get<ElectricalAppliance[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching appliances:', error);
        return throwError(() => new Error('Failed to fetch appliances'));
      })
    );
  }

  createAppliance(appliance: ElectricalAppliance): Observable<ElectricalAppliance> {
    return this.http.post<ElectricalAppliance>(this.apiUrl, appliance).pipe(
      catchError((error) => {
        console.error('Error creating appliance:', error);
        return throwError(() => new Error('Failed to create appliance'));
      })
    );
  }

  updateAppliance(
    id: number,
    appliance: ElectricalAppliance
  ): Observable<ElectricalAppliance> {
    return this.http.put<ElectricalAppliance>(`${this.apiUrl}/${id}`, appliance).pipe(
      catchError((error) => {
        console.error('Error updating appliance:', error);
        return throwError(() => new Error('Failed to update appliance'));
      })
    );
  }

  deleteAppliance(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting appliance:', error);
        return throwError(() => new Error('Failed to delete appliance'));
      })
    );
  }
}
