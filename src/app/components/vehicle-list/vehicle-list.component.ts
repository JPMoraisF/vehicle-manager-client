import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadVehicles();
  }

  ngOnDestroy() {
    console.log('Vehicle list destroyed!');
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (serviceResponse) => {
        if (serviceResponse.data && serviceResponse.data.length > 0) {
          this.vehicles = serviceResponse.data;
          this.filteredVehicles = this.vehicles;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      error: (serviceResponse) => {
        this.hasError = true;
        this.isLoading = false;
        console.error(serviceResponse.errorList);
      }
    });
  }

  applyFilter(event: any): void {
    const filterValue = event ? event.target.value.toLowerCase() : '';
    this.filteredVehicles = this.vehicles.filter((vehicle) =>
      vehicle.modelName.toLowerCase().includes(filterValue) ||
      vehicle.licensePlate.toLowerCase().includes(filterValue)
    );
    console.log(this.filteredVehicles);
  }

  redirectToDetails(vehicle: Vehicle) {
    this.router.navigate(['/vehicle-details', vehicle.id]);
  }
}
