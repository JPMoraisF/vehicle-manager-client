import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
  filteredVehicles: Vehicle[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (serviceResponse) => {
        if(serviceResponse != null){
          this.vehicles = serviceResponse;
          this.filteredVehicles = this.vehicles;
          console.log(this.vehicles)
        }

        this.isLoading = false;
      },
      error: (serviceResponse) => {
        this.hasError = true;
        console.error(serviceResponse);
        this.isLoading = false;
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
    this.vehicleService.setSelectedVehicle(vehicle);
    this.router.navigate(['/vehicle-details']);
  }
}
