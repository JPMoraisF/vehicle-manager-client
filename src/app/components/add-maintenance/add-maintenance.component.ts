import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Maintenance } from 'src/app/models/Maintenance';
import { MaintenanceItem } from 'src/app/models/MaintenanceItem';
import { GlobalSettingsService } from 'src/app/services/global-settings.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class AddMaintenanceComponent implements OnInit {
  displayedColumns: string[] = ['description', 'quantity', 'unitCost', 'totalAmount', 'remove'];
  totalCost: number = 0;
  maintenanceForm: FormGroup;
  maintenanceItems: MaintenanceItem[] = [];
  @ViewChild(MatTable) table: MatTable<MaintenanceItem>;
  isMetric: boolean = false;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public vehicleId: any,
    public dialogRef: MatDialogRef<AddMaintenanceComponent>,
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private notificationService: NotificationService,
    private globalSettings: GlobalSettingsService) {
    this.maintenanceForm = this.fb.group({
      maintenanceDate: [null, Validators.required],
      kilometersDriven: [null, Validators.required],
      notes: 'No notes',
      isDealershipService: [false],
      description: [null],
      quantity: [null],
      unitPrice: [null]
    });

  }

  ngOnInit(): void {
    this.initializeForm();
    this.isMetric = this.globalSettings.getMeasureSetting();
  }

  onRemoveItem(maintenanceItem: MaintenanceItem) {
    const index = this.maintenanceItems.indexOf(maintenanceItem);
    if (index !== -1) {
      this.maintenanceItems.splice(index, 1);
      this.notificationService.notify('Item removed: ' + maintenanceItem.description);
      this.table.renderRows();
    } else {
      this.notificationService.notify('Item not found!');
    }
  }

  initializeForm(): void {
    this.maintenanceForm = this.fb.group({
      maintenanceDate: [null, Validators.required],
      kilometersDriven: [null, Validators.required],
      notes: [''],
      isDealershipService: [false],
      description: [null],
      quantity: [null],
      unitPrice: [null]
    });
  }

  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      this.isLoading = true;
      const maintenanceData: Maintenance = {
        maintenanceDate: this.maintenanceForm.get('maintenanceDate')?.value,
        kilometersDriven: this.maintenanceForm.get('kilometersDriven')?.value,
        notes: this.maintenanceForm.get('notes')?.value,
        isDealershipService: this.maintenanceForm.get('isDealershipService')?.value,
        maintenanceItems: this.maintenanceItems,
        vehicleId: this.vehicleId,
      };

      this.maintenanceService.addMaintenance(this.vehicleId, maintenanceData)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.notificationService.notify('Service added!');
            this.dialogRef.close();
          },
          (error) => {
            this.isLoading = false;
            this.notificationService.notify('Error adding service to vehicle!');
            console.error(error);
          }
        );
    }
  }

  addMaintenanceItem(): void {
    const maintenanceItems = this.maintenanceForm.get('maintenanceItems') as FormArray;
    maintenanceItems.push(this.createMaintenanceItem());
  }

  createMaintenanceItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      unitCost: [0, Validators.required]
    });
  }

  addItem() {
    let newItem: MaintenanceItem = {
      description: this.maintenanceForm.get('description')?.value,
      quantity: this.maintenanceForm.get('quantity')?.value,
      unitCost: this.maintenanceForm.get('unitPrice')?.value,
    }
    this.maintenanceItems.push({ ...newItem });
    this.table.renderRows();
    console.log(this.maintenanceItems);
  }

  getTotalCost() {
    return this.maintenanceItems.map(t => t.totalCost).reduce((acc, value) => acc + value, 0);
  }
}
