// maintenance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/Maintenance';
import { AppConfig } from '../config/config';
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

  getMaintenanceDetails(maintenanceId: number): Observable<Maintenance> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint}/${maintenanceId}`;
    return this.http.get<Maintenance>(url, {headers});
  }
  
  editMaintenance(id: number, maintenance: Maintenance): Observable<Maintenance> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint}/${id}`;
    return this.http.put<Maintenance>(url, maintenance, {headers});
  }

  deleteMaintenance(maintenanceId: number): Observable<Maintenance> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint}/${maintenanceId}`;
    return this.http.delete<Maintenance>(url, {headers});
  }

  addMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint}`;
    return this.http.post<Maintenance>(url, maintenance, {headers});
  }
}
