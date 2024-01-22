import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  notify(message: string, duration: number = 4000){
    this.snackBar.open(message, '',{
      duration: duration,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}
