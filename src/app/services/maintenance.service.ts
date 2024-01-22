// maintenance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/Maintenance';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiUrl = AppConfig.apiUrl;
  private urlEndpoint = 'Maintenance'

  constructor(private http: HttpClient) {}

  getMaintenanceDetails(maintenanceId: number): Observable<Maintenance> {
    const url = `${this.apiUrl + this.urlEndpoint}/${maintenanceId}`;
    return this.http.get<Maintenance>(url);
  }
  
  editMaintenance(id: number, maintenance: Maintenance): Observable<Maintenance> {
    const url = `${this.apiUrl + this.urlEndpoint}/${id}`;
    return this.http.put<Maintenance>(url, maintenance);
  }

  deleteMaintenance(maintenanceId: number): Observable<Maintenance> {
    const url = `${this.apiUrl + this.urlEndpoint}/${maintenanceId}`;
    return this.http.delete<Maintenance>(url);
  }

  addMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    const url = `${this.apiUrl + this.urlEndpoint}`;
    return this.http.post<Maintenance>(url, maintenance);
  }
}
