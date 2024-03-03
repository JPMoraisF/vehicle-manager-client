import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  newVehicle: Vehicle = {
    id: '',
    make: '',
    modelName: '',
    modelYear: 2020,
    vin: '',
    licensePlate: '',
    color: '',
    notes: '',
    image: '',
    kilometersDriven: 0,
    dateAdded: new Date(),
    dateUpdated: new Date(),
    userId: '',
    maintenanceList: []
  };
  private userSub: Subscription;

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  onSubmit() {
    this.vehicleService.addVehicle(this.newVehicle).subscribe(
      {
        next: (response) => {
          console.log('New vehicle successfully added:', response);
          this.snackBar.open('New vehicle successfully added!', '', { duration: 3000 });
          this.router.navigate(['/my-vehicles/']);
        },
        error: (error) => {
          console.error('Error adding vehicle:', error.error);
          this.snackBar.open(`Error adding vehicle: ${error.error}`, '', { duration: 5000 });
        }
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newVehicle.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.newVehicle = {
      id: '',
      make: '',
      modelName: '',
      modelYear: 2020,
      vin: '',
      licensePlate: '',
      color: '',
      notes: '',
      image: '',
      kilometersDriven: 0,
      dateAdded: new Date(),
      dateUpdated: new Date(),
      userId: '',
      maintenanceList: []
    };
  }
}
