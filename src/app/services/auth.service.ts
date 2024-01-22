// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../config/config';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = AppConfig.apiUrl;
  private urlEndpoint = 'auth'

  constructor(
    private http: HttpClient,
    private router: Router) {}

  login(user: User): Observable<any> {
    const model = { name: user.userName, password: user.password };
    const url = `${this.apiUrl + this.urlEndpoint}/login`;

    return this.http.post<any>(url, model).pipe(
      map(response => {
        localStorage.setItem('access_token', response.token);
        return response;
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        throw error;
      })
    );
  }

  register(user: User) {
    const model = {name: user.userName, password: user.password, email: user.email};
    const url = `${this.apiUrl + this.urlEndpoint}/register`;

    return this.http.post<any>(url, model).pipe(
      map(response => {
        localStorage.setItem('access_token', response.token);
        return response;
      }),
      catchError(error => {
        console.log('Error making request: ', error);
        throw error;
      })
    )
  }

  getUserName(): string {
    const token = this.getToken();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    const JwtHelper = new JwtHelperService();
    if(JwtHelper.isTokenExpired(token))
    {
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
