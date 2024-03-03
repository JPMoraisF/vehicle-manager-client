import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { ServiceResponse } from '../models/ServiceResponse';

export interface AuthResponseData {
  kind: string,
  idToken: string, 
  email: string, 
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDevuTN1g6UdqhTHc2tRz-ssya5R3XBfo8';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDevuTN1g6UdqhTHc2tRz-ssya5R3XBfo8'
  private urlEndpoint = 'Hi'

  user = new Subject<User>();
  public userId;
  public userToken;
  private loggedIn: boolean = false;

  constructor(
    private http: HttpClient) { }

  login(email: string, password: string) {
    const model = { email: email, password: password, returnSecureToken: true};

    return this.http.post<AuthResponseData>(this.loginUrl, model).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user = new User(response.email, response.localId, response.idToken, expirationDate);
        this.userId = response.localId;
        this.userToken = response.idToken;
        this.loggedIn = true;
        this.user.next(user);
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  handleError(error: any){
    let errorMessage
    switch(error.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exists'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password incorrect'
        break;
    }
    return throwError (errorMessage);
  }

  register(email: string, password: string) {
    const model = { password: password, email: email, returnSecureToken: true};
    
    return this.http.post<AuthResponseData>(this.registerUrl, model).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        const user = new User(response.email, response.localId, response.idToken, expirationDate);
        this.user.next(user);
      }),
      catchError(error => {
        return this.handleError(error);
      })
    )
  }

  updateUser(updatedUser: User){
    const url = `${this.registerUrl + this.urlEndpoint}/update`;

    return this.http.post<ServiceResponse<User>>(url,updatedUser);
  }

  getUser(): Observable<ServiceResponse<User>> {
    const url = `${this.registerUrl + this.urlEndpoint}/`;
    let userId = '';
    return this.http.get<ServiceResponse<User>>(url + userId);
  }

  isLoggedIn(): boolean {
     return this.loggedIn
  }

  logout(): void {
    this.loggedIn = false;
    this.user.next(null);
  }
}
