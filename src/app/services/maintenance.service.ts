import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/Maintenance';
import { AppConfig } from '../config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiUrl = AppConfig.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  getMaintenanceDetails(vehicleId: string, maintenanceId: string): Observable<Maintenance> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${vehicleId}/maintenanceList/${maintenanceId}/.json`
    return this.http.get<Maintenance>(url, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }
  
  editMaintenance(vehicleId: string, maintenance: Maintenance): Observable<Maintenance> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${vehicleId}/maintenanceList/${maintenance.id}/.json`
    return this.http.patch<Maintenance>(url, maintenance, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }

  deleteMaintenance(vehicleId: string, maintenanceId: string): Observable<Maintenance> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${vehicleId}/maintenanceList/${maintenanceId}/.json`
    return this.http.delete<any>(url, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }

  addMaintenance(vehicleId: string, maintenance: Maintenance): Observable<any> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${vehicleId}/maintenanceList.json`
    return this.http.post(url, maintenance, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }
}
