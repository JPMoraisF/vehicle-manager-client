import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDetailsComponent } from './pages/vehicle-details/vehicle-details.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { AddMaintenanceComponent } from './components/add-maintenance/add-maintenance.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
   { path: 'vehicle-details', component: VehicleDetailsComponent },
  { path: 'my-vehicles', component: VehicleListComponent, canActivate : [AuthGuard] },
  // { path: 'my-vehicles', component: VehicleListComponent},
  { path: 'add-vehicle', component: AddVehicleComponent, canActivate: [AuthGuard] },
  { path: 'add-maintenance', component: AddMaintenanceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
