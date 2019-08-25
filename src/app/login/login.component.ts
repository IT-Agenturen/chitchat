import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss'],
providers: [AuthService]
})
export class LoginComponent implements OnInit {
constructor(private  authService:  AuthService) {}

  email: string;
  password: string;
  errorMsg: string;

  login() {
    console.log('login() called from login component');
    this.authService.login(this.email, this.password)
      .catch(error => this.errorMsg = error.message);
  }

  ngOnInit() { }

  }


