import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../config/config';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { ServiceResponse } from '../models/ServiceResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = AppConfig.apiUrl;
  private urlEndpoint = 'auth'

  constructor(
    private http: HttpClient,
    private router: Router) { }

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

  updateUser(updatedUser: User){
    const url = `${this.apiUrl + this.urlEndpoint}/update`;
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ServiceResponse<User>>(url,updatedUser, { headers });
  }

  getUser(): Observable<ServiceResponse<User>> {
    const url = `${this.apiUrl + this.urlEndpoint}/`;
    const token = this.getToken();
    let userId = '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.sub) {
        userId = decodedToken.sub;
      }
    }
    return this.http.get<ServiceResponse<User>>(url + userId, { headers });
  }

  register(user: User) {
    const model = { userName: user.userName, password: user.password, email: user.email, name: user.name };
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
    return !JwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
