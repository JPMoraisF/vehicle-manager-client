import { Component, Input, ViewChild } from '@angular/core';
import { Maintenance } from 'src/app/models/Maintenance';
import { Vehicle } from 'src/app/models/Vehicle';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddMaintenanceComponent } from '../add-maintenance/add-maintenance.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MaintenanceDetailsComponent } from '../maintenance-details/maintenance-details.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  @Input('maintenanceList') maintenanceList: Maintenance[];
  @Input('vehicleId') vehicleId: string;
  @Input('isMetric') isMetric: boolean;
  @ViewChild(MatTable) table: MatTable<Maintenance[]>;
  displayedColumns: string[] = ['maintenanceDate', 'kilometersDriven', 'notes', 'price', 'details'];

  constructor(
    private maintenanceService: MaintenanceService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
    
  }
  addMaintenance(): void {
    const dialogRef = this.dialog.open(AddMaintenanceComponent, {
      width: '900px',
      data: this.vehicleId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.renderRows();
    });
  }

  deleteMaintenance(maintenance: Maintenance): void {
    this.maintenanceService.deleteMaintenance(this.vehicleId, maintenance.id).subscribe(
      {
        next: () => {
          this.notificationService.notify(`Service done on ${maintenance.maintenanceDate} deleted successfully`);
          this.maintenanceList = this.maintenanceList.filter(item => item.id !== maintenance.id);
          this.table.renderRows();
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

  openMaintenanceDetailsDialog(maintenanceId: string): void {
    this.maintenanceService.getMaintenanceDetails(this.vehicleId, maintenanceId)
      .subscribe((maintenanceDetails: Maintenance) => {
        const dialogRef = this.dialog.open(MaintenanceDetailsComponent, {
          width: '700px',
          data: maintenanceDetails,
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      });
  }
  
  getMaintenanceTotalCost(maintenanceItems: any) {
    return maintenanceItems.reduce((sum, object) => {
      const itemTotal = object.quantity * object.unitCost;
      return sum + itemTotal;
    }, 0);
  }
}
