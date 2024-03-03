import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, Subscription, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Vehicle } from '../models/Vehicle';
import { AppConfig } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class VehicleService{
  private apiUrl = AppConfig.apiUrl;
  public vehicleList: any[] = [];
  public vehicleSelected: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
    }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}users/${this.authService.userId}/vehicle.json`, {
      params: new HttpParams().set('auth', this.authService.userToken)
    }).pipe(
      map((vehicles) => {
        let vehicleList = [];
        for (const key in vehicles){
          if(vehicles.hasOwnProperty(key)){
            vehicleList.push({...vehicles[key], id: key})
          }
        }
        this.vehicleList = vehicleList;
        return this.vehicleList;
      })
    );
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle.json`
    return this.http.post<Vehicle>(url, vehicle, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${id}/.json`
    return this.http.patch<Vehicle>(url, vehicle, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }

  deleteVehicle(vehicleId: string): Observable<Vehicle> {
    const url = `${this.apiUrl}users/${this.authService.userId}/vehicle/${vehicleId}/.json`
    return this.http.delete<Vehicle>(url, {
      params: new HttpParams().set('auth', this.authService.userToken)
    });
  }
  setSelectedVehicle(vehicle: Vehicle){
    let maintenanceList = [];
    for (const key in vehicle.maintenanceList){
      if(vehicle.maintenanceList.hasOwnProperty(key)){
        maintenanceList.push({...vehicle.maintenanceList[key], id: key})
      }
    }
    vehicle.maintenanceList = maintenanceList;
    this.vehicleSelected = vehicle;
  }
}
