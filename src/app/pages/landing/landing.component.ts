import { Component } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  easyToUseText = 'Simple set up and configuration ensures that user won\'t have to deal with tedious setup processes and long training sessions.'
  fleetManagement = 'Manage your fleet from anywhere in the world. With cloud-based infrastructure you can at a glance observe your fleet maintenance history and driver information.'
  costCenter = 'With our new Cost Center menu, you can see your profits and expenses in detailed information and export to multiple formats for data analysis.'
}
