import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, tap, throwError } from 'rxjs';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isDiffPass!: boolean;
  showPass: boolean = false;

  constructor(
    private http: AppHttpService,
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.signUpForm = this.fb.group({
      username: new FormControl('rk5', [Validators.required]),
      email: new FormControl('rk5@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password1: new FormControl('test123', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password2: new FormControl('test1234', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
    this.signUpForm.controls['password2']?.valueChanges.subscribe((val) =>
      this.checkDifferentPassword()
    );
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.signUpForm.value) {
      this.http
        .post(`signup/`, this.signUpForm.value)
        .pipe(
          tap((res) => {
            console.log('RESPONSE', res);
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
        )
        .subscribe((res) => console.log('END RES: ', res));
    }
  }

  checkDifferentPassword(): void {
    this.isDiffPass =
      this.signUpForm.controls['password1'].value !==
      this.signUpForm.controls['password2'].value;
  }

  togglePasswordVisibility(): void {
    this.showPass = !this.showPass;
  }
}
