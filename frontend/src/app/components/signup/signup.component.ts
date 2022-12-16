import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, tap, throwError } from 'rxjs';
import { AppHttpService } from 'src/app/services/apphttp.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
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
      this.userService.signUp(this.signUpForm.value).subscribe((res) => {
        this.router.navigate(['allboards']);
      });
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
