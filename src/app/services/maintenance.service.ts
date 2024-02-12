// maintenance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/Maintenance';
import { AppConfig } from '../config/config';
import { ServiceResponse } from '../models/ServiceResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiUrl = AppConfig.apiUrl;
  private urlEndpoint = 'Maintenance'

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  getMaintenanceDetails(maintenanceId: number): Observable<ServiceResponse<Maintenance>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint, {headers}}/${maintenanceId}`;
    return this.http.get<ServiceResponse<Maintenance>>(url);
  }
  
  editMaintenance(id: number, maintenance: Maintenance): Observable<ServiceResponse<Maintenance>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint, {headers}}/${id}`;
    return this.http.put<ServiceResponse<Maintenance>>(url, maintenance);
  }

  deleteMaintenance(maintenanceId: number): Observable<ServiceResponse<Maintenance>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint, {headers}}/${maintenanceId}`;
    return this.http.delete<ServiceResponse<Maintenance>>(url);
  }

  addMaintenance(maintenance: Maintenance): Observable<ServiceResponse<Maintenance>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint, {headers}}`;
    return this.http.post<ServiceResponse<Maintenance>>(url, maintenance);
  }
}
