import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { LoginUser, RegisterUser } from '../tmt.interface';
import { AppHttpService } from './apphttp.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$: any = new ReplaySubject(1);
  public token: string = '';
  public _user: any;

  constructor(
    private http: AppHttpService,
    private storage: StorageService,
    private notification: NotificationService
  ) {
    this.token = this.storage.get('token');
  }

  getCurrentUser() {
    return this.http.get('currentuser/').pipe(
      tap((res: any) => {
        this._user = res;
        this.user$.next(res);
      })
    );
  }

  login(user: LoginUser) {
    return this.http.post(`rest-auth/login/`, user).pipe(
      tap((res) => {
        const key = res.key;
        this.storage.set('token', key);
        this.token = key;
      }),
      catchError((errRes) =>
        throwError(() => {
          const error = errRes.error;
          this.notification.errorNotification(
            error.username ||
              error.password ||
              (error.non_field_errors
                ? error.non_field_errors[0]
                : 'Something wrong')
          );
        })
      )
    );
  }

  signUp(user: RegisterUser) {
    return this.http.post(`signup/`, user).pipe(
      tap((res) => {
        const key = res.key;
        this.storage.set('token', key);
        this.token = key;
      }),
      catchError((errRes) =>
        throwError(() => {
          const error = errRes.error;
          if (error.username) {
            this.notification.errorNotification(error.username);
          } else if (error.email) {
            this.notification.errorNotification(error.email);
          } else if (error.password1) {
            this.notification.errorNotification(error.password1);
          } else if (error.password2) {
            this.notification.errorNotification(error.password2);
          } else {
            this.notification.errorNotification('Something went wrong');
          }
        })
      )
    );
  }

  logOut(): void {
    this.storage.clear();
    this.token = '';
    this._user = null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
