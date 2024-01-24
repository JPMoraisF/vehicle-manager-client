// user-details.component.ts
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
  user: User = {
    name: '',
    userName: '',
    email: '',
    password: '',
  };

  isEditing = false;
  editedUser: User;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private globalSettings: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.useMetric = this.globalSettings.getMeasureSetting();
    this.authService.getUser().subscribe({
      next: (serviceResponse) => {
        this.user = serviceResponse.data;
        this.isLoading = false;
        this.editedUser = { ...this.user };
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    })
  }

  startEditing(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.globalSettings.setMeasureSetting(this.useMetric);
    this.authService.updateUser(this.editedUser).subscribe({
      next: (serviceResponse) => {
        console.log(serviceResponse)
      },
      error: (error) => {
        console.error(error);
      },
    })
    // Lógica para salvar as alterações no usuário
    // Atualize this.user com os valores editados
    this.user = { ...this.editedUser };
    
    this.isEditing = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
    // Se necessário, redefina os campos editados para os valores originais
    this.editedUser = { ...this.user };
  }
}
