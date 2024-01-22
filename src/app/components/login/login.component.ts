import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    userName: '',
    email: '',
    password: ''
  }
  isRegister: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  login(): void {
    this.isLoading = true;
    this.authService.login(this.user).subscribe(
      {
        next: () => {
          this.isLoading = false;
          this.notificationService.notify('Successfully logged in')
          this.router.navigate['/my-vehicles'];
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.notify(`Error logging in: ${error.error.message}`)
        }
      }
    );
  }

  register() {
    this.authService.register(this.user)
      .subscribe(
        {
          next: () => {
            this.isRegister = true;
            this.router.navigate['/my-vehicles'];
          },
          error: () => {
            this.notificationService.notify('Error during register')
          }
        }
      )
  }
}
