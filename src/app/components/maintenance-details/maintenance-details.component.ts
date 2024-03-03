import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Maintenance } from 'src/app/models/Maintenance';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-maintenance-details-dialog',
  templateUrl: './maintenance-details.component.html',
  styleUrls: ['./maintenance-details.component.css']
})
export class MaintenanceDetailsComponent {
  displayedColumns: string[] = ['description', 'quantity', 'unitCost', 'totalAmount'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Maintenance,
  private maintenanceService: MaintenanceService, 
  public dialog: MatDialog) {}

  editMaintenance(id: string): void {
    this.maintenanceService.editMaintenance(id, this.data).subscribe(
      (response) => {
        console.log('Manutenção editada com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao editar a manutenção:', error);
      }
    );
  }

  getTotalCost() {
    return this.data.maintenanceItems.map(t => t.quantity * t.unitCost).reduce((acc, value) => acc + value, 0);
  }
}
