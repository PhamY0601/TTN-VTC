import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  showPassword: boolean = false;
  loginError = false;
  logInForm!: FormGroup ;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  ngOnInit() {
    this.logInForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', Validators.required],
      }
    );
  }

  submit(data: any) {
    this.authService.logIn(data.username, data.password).subscribe((res) => {
      if (res) {
        this.router.navigate(['dashboard']);
      } else {
        this.loginError = true;
      }
    }, err => {
      this.loginError = true;
    })

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
