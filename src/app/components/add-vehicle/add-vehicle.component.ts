// add-vehicle.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  newVehicle: Vehicle = {
    id: 0,
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

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  onSubmit() {
    console.log(this.newVehicle);
    this.vehicleService.addVehicle(this.newVehicle).subscribe(
      (response) => {
        console.log('Novo veículo adicionado com sucesso:', response);
        this.snackBar.open('Veículo adicionado com sucesso!' , '', {duration: 3000});
        this.router.navigate(['/my-vehicles/']);
      },
      (error) => {
        console.error('Erro ao adicionar o veículo:', error);
        this.snackBar.open(`Erro ao adicionar veículo: ${error.error}` , '', {duration: 5000});
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
      id: 0,
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
