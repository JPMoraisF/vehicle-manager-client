import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDetailsComponent } from '../../components/maintenance-details/maintenance-details.component';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/models/Maintenance';
import { AddMaintenanceComponent } from '../../components/add-maintenance/add-maintenance.component';
import { MatTable } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Vehicle } from 'src/app/models/Vehicle';
import { GlobalSettingsService } from 'src/app/services/global-settings.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  isEdit: boolean = false;
  vehicleDetails: Vehicle;
  displayedColumns: string[] = ['maintenanceDate', 'kilometersDriven', 'notes', 'price', 'details'];
  @ViewChild(MatTable) table: MatTable<Maintenance[]>;
  isMetric: boolean;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private maintenanceService: MaintenanceService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private globalSettings: GlobalSettingsService
  ) { }

  ngOnInit() {
    this.vehicleDetails = this.vehicleService.vehicleSelected;
    console.log(this.vehicleDetails.maintenanceList)
    this.isMetric = this.globalSettings.getMeasureSetting()
  }

  onDeleteVehicle(): void {
    this.vehicleService.deleteVehicle(this.vehicleDetails.id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notificationService.notify('Vehicle deleted');
          this.router.navigate(['/my-vehicles']);
        },
        error: (error) => {
          this.notificationService.notify('Error deleting vehicle');
          console.error(error);
        }
      });
  }

  openMaintenanceDetailsDialog(maintenanceId: string): void {
    this.maintenanceService.getMaintenanceDetails(this.vehicleDetails.id, maintenanceId)
      .subscribe((maintenanceDetails: Maintenance) => {
        console.log('Maintenance details', maintenanceDetails);
        const dialogRef = this.dialog.open(MaintenanceDetailsComponent, {
          width: '700px',
          data: maintenanceDetails,
        });

        dialogRef.afterClosed().subscribe(result => {
        });
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
        headerMessage: `Are you sure you want to delete ${this.vehicleDetails.modelName} ?`,
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

  addMaintenance(): void {
    const dialogRef = this.dialog.open(AddMaintenanceComponent, {
      width: '900px',
      data: this.vehicleDetails.id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.renderRows();
    });
  }

  deleteMaintenance(maintenance: Maintenance): void {
    this.maintenanceService.deleteMaintenance(this.vehicleDetails.id, maintenance.id).subscribe(
      {
        next: () => {
          this.notificationService.notify(`Service done on ${maintenance.maintenanceDate} deleted successfully`);
          this.vehicleDetails.maintenanceList = this.vehicleDetails.maintenanceList.filter(item => item.id !== maintenance.id);
          this.table.renderRows();
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
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

  getMaintenanceTotalCost(maintenanceItems: any) {
    return maintenanceItems.reduce((sum, object) => {
      const itemTotal = object.quantity * object.unitCost;
      return sum + itemTotal;
    }, 0);
  }
}
