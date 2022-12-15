import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  showPass: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('rk5', [Validators.required]),
      password: new FormControl('testpass123', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['allboards']);
    }
  }

  login(): void {
    if (this.loginForm.value) {
      this.userService.login(this.loginForm.value).subscribe((res) => {
        console.log("LOGIN BACK", res, this.userService.isAuthenticated())

        this.router.navigate(['home']);
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPass = !this.showPass;
  }
}
