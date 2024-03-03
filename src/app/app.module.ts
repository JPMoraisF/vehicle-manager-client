import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaintenanceDetailsComponent } from './components/maintenance-details/maintenance-details.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AddMaintenanceComponent } from './components/add-maintenance/add-maintenance.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule }  from '@angular/material/datepicker'
import { MatCheckboxModule }  from '@angular/material/checkbox'
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    AddVehicleComponent,
    MaintenanceDetailsComponent,
    AddMaintenanceComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
