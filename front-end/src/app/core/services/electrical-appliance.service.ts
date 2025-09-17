import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ElectricalAppliance, ReportDamage} from '../models/ktdi';

@Injectable({
  providedIn: 'root',
})
export class ElectricalApplianceService {
  private readonly API_ENDPOINT = `${environment.API_URL}/electrical-appliance`;
  private readonly httpClient = inject(HttpClient);

  getAppliances$: () => Observable<ElectricalAppliance[]> = () => this.httpClient.get<ElectricalAppliance[]>(this.API_ENDPOINT);
  updateAppliance$: (id: number, appliance: ElectricalAppliance) => Observable<ElectricalAppliance> = (id: number, appliance: ElectricalAppliance) => this.httpClient.put<ElectricalAppliance>(`${this.API_ENDPOINT}/${id}`, appliance);
  deleteAppliance$: (id: number) => Observable<{ message: string }> = (id:number) => this.httpClient.delete<{ message: string }>(`${this.API_ENDPOINT}/${id}`);
}
