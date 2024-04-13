import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Vehicle } from 'src/app/models/Vehicle';
import { GlobalSettingsService } from 'src/app/services/global-settings.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  isEdit: boolean = false;
  isMetric: boolean;
  vehicleDetails: Vehicle;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private globalSettings: GlobalSettingsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.vehicleDetails = this.vehicleService.vehicleSelected;
    this.isMetric = this.globalSettings.getMeasureSetting()
  }

  onDeleteVehicle(): void {
    this.vehicleService.deleteVehicle(this.vehicleDetails.id)
      .subscribe({
        next: (response) => {
          this.notificationService.notify('Vehicle deleted');
          this.router.navigate(['/vehicles']);
        },
        error: (error) => {
          this.notificationService.notify('Error deleting vehicle');
          console.error(error);
        }
      });
  }

  openDriverModal() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        headerMessage: 'Driver details',
        leftButton: {
          visible: false,
          color: '',
          text: ''
        },
        rightButton: {
          visible: false,
          color: '',
          text: ''
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        headerMessage: `Are you sure you want to delete vehicle ${this.vehicleDetails.modelName} ?`,
        leftButton: {
          visible: true,
          color: '',
          text: 'Cancel'
        },
        rightButton: {
          visible: true,
          color: 'warn',
          text: 'Delete'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteVehicle();
      }
    });
  }

  updateDistance(value: number): void {
    if (!this.isMetric) {
      this.vehicleDetails.kilometersDriven = Math.round(value / 0.6);
    } else {
      this.vehicleDetails.kilometersDriven = value;
    }
  }

  onSave() {
    this.vehicleService.updateVehicle(this.vehicleDetails.id, this.vehicleDetails).subscribe(
      (response) => {
        this.notificationService.notify('Vehicle details updated successfully');
        this.isEdit = false;
      },
      (error) => {
        this.notificationService.notify('Error updating vehicle details', 5000);
        console.error(error);
      }
    );
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.vehicleDetails.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
