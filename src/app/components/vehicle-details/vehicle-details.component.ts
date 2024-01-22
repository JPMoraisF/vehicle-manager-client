// Importe os módulos necessários
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceDetailsComponent } from '../maintenance-details/maintenance-details.component';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/models/Maintenance';
import { AddMaintenanceComponent } from '../add-maintenance/add-maintenance.component';
import { MatTable } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Vehicle } from 'src/app/models/Vehicle';
import { ServiceResponse } from 'src/app/models/ServiceResponse';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  isEdit: boolean = false;
  vehicleId: number = 0;
  vehicleDetails: Vehicle;
  displayedColumns: string[] = ['maintenanceDate', 'kilometersDriven', 'notes', 'price', 'details'];
  @ViewChild(MatTable) table: MatTable<Maintenance[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private maintenanceService: MaintenanceService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    // if(this.vehicleDetails == null){
    //   console.error('Vehicle cant be loaded');
    // }
    this.getVehicleById();
  }

  getVehicleById() {
    this.route.params.subscribe(params => {
      this.vehicleId = +params['id'];
      this.vehicleService.getVehicleById(this.vehicleId).subscribe(
        {
          next: (serviceResponse) => {
            this.vehicleDetails = serviceResponse.data
          },
          error: (error) => {
            console.error(error);
          }
        }
      );
    });
  }

  onDeleteVehicle(): void {
    this.vehicleService.deleteVehicle(this.vehicleId)
      .subscribe((response) => {
        this.notificationService.notify('Vehicle deleted');
        this.router.navigate(['/my-vehicles']);
      }, (error) => {
        console.log(error);
        this.notificationService.notify('Error deleting vehicle');
        console.error(error);

      });
  }

  openMaintenanceDetailsDialog(maintenanceId: number): void {
    this.maintenanceService.getMaintenanceDetails(maintenanceId).subscribe((maintenanceDetails: Maintenance) => {
      console.log('Maintenance details', maintenanceDetails);
      const dialogRef = this.dialog.open(MaintenanceDetailsComponent, {
        width: '700px',
        data: maintenanceDetails,
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        vehicleName: this.vehicleDetails.modelName,
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
      data: this.vehicleId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getVehicleById();
      this.table.renderRows();
    });
  }

  deleteMaintenance(maintenance: Maintenance): void {
    this.maintenanceService.deleteMaintenance(maintenance.id).subscribe(
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

  onSave() {
    this.vehicleService.updateVehicle(this.vehicleId, this.vehicleDetails).subscribe(
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
