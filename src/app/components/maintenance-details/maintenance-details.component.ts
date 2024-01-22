// maintenance-details-dialog.component.ts

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
  private maintenanceService: MaintenanceService, // Substitua pelo seu serviço real
  public dialog: MatDialog) {}

  editMaintenance(id:number): void {
    this.maintenanceService.editMaintenance(id, this.data).subscribe(
      (response) => {
        console.log('Manutenção editada com sucesso:', response);
        // Atualize os detalhes localmente, se necessário
      },
      (error) => {
        console.error('Erro ao editar a manutenção:', error);
      }
    );
  }

  getTotalCost() {
    return this.data.maintenanceItems.map(t => t.totalAmount).reduce((acc, value) => acc + value, 0);
  }
}
