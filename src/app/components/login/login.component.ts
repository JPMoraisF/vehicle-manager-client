import { Component } from '@angular/core';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  isLoginMode: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  submit(loginForm: NgForm): void {
    if(!loginForm.valid){
      return;
    }
    this.isLoading = true;
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.register(email, password);
    }

    authObs.subscribe(
      {
        next: () => {
          this.isLoading = false;
          this.notificationService.notify('Successfully logged in')
          this.router.navigate['/my-vehicles'];
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.notify(`Error logging in: ${error}`)
        }
      }
    );
  }
}
