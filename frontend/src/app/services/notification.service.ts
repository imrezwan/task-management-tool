import { Component, Inject, inject, Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: NotificationType, durationInSeconds: number = 2) {
    this._snackBar.openFromComponent(NotificationAnnotatedComponent, {
      duration: durationInSeconds * 1000,
      data: { message: message, type: type },
      panelClass: ['mat-toolbar', 'mat-'+ type],
    });
  }
}

@Component({
  selector: 'notification-snackbar',
  template: `
    <span 
      matSnackBarLabel>
      {{ data.message || 'Something wrong' }}
    </span>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class NotificationAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

export enum NotificationType {
  SUCCESS = "success",
  WARN = "warn",
  FAILED = "failed",
}