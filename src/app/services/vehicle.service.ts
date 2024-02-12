// vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/config';
import { AuthService } from './auth.service';
import { Vehicle } from '../models/Vehicle';
import { ServiceResponse } from '../models/ServiceResponse';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = AppConfig.apiUrl;
  private urlEndpoint = 'Vehicle'

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  getVehicles(): Observable<ServiceResponse<Vehicle[]>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ServiceResponse<Vehicle[]>>(this.apiUrl + this.urlEndpoint, {headers});
  }

  getVehicleById(id: number): Observable<ServiceResponse<Vehicle>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ServiceResponse<Vehicle>>(`${this.apiUrl + this.urlEndpoint}/${id}`, {headers});
  }

  addVehicle(vehicle: Vehicle): Observable<ServiceResponse<Vehicle>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl + this.urlEndpoint}`
    return this.http.post<ServiceResponse<Vehicle>>(url, vehicle, {headers});
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<ServiceResponse<Vehicle>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ServiceResponse<Vehicle>>(`${this.apiUrl + this.urlEndpoint, {headers}}/${id}`, vehicle);
  }

  deleteVehicle(vehicleId: number): Observable<ServiceResponse<Vehicle>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ServiceResponse<Vehicle>>(`${this.apiUrl + this.urlEndpoint, {headers}}/${vehicleId}`);
  }
}
