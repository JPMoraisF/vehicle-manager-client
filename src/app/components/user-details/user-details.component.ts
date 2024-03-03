import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalSettingsService } from 'src/app/services/global-settings.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  useMetric: boolean = false;
  isEditing = false;
  editedUser: User;
  isLoading: boolean;

  constructor(
    private globalSettings: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.useMetric = this.globalSettings.getMeasureSetting();
  }
}
