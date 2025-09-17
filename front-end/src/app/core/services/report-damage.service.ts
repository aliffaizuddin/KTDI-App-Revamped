import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ReportDamage} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class ReportDamageService {
  private readonly API_ENDPOINT = `${environment.API_URL}/report-damage`;
  private readonly httpClient = inject(HttpClient);

  getReports$: () => Observable<ReportDamage[]> = () => this.httpClient.get<ReportDamage[]>(this.API_ENDPOINT);
  createReports$: (report: ReportDamage) => Observable<ReportDamage> = (report: ReportDamage) => this.httpClient.post<ReportDamage>(this.API_ENDPOINT, report);
  updateReports$: (id: number, report: ReportDamage) => Observable<ReportDamage> = (id: number, report: ReportDamage) => this.httpClient.put<ReportDamage>(`${this.API_ENDPOINT}/${id}`, report);
  deleteReports$: (id: number) => Observable<{ message: string }> = (id: number) => this.httpClient.delete<{ message: string }>(`${this.API_ENDPOINT}/${id}`);
}
