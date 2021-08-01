import { LoginService } from './../../../@core/services/login.service';
import { GoogleBasicProfile } from './../../../@core/models/google/google-basic-profile';
import { GoogleAuthService } from './../../../@core/services/google-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: GoogleBasicProfile;
  isLogin: boolean = false;

  logging_in: boolean = false;


  constructor(
    private googleAuthService: GoogleAuthService,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {

    this.user = this.googleAuthService.googleUser;

    this.loginService.isLogin$.subscribe((data) => {
      this.user = this.googleAuthService.googleUser;
      this.isLogin = data;
      this.logging_in = false;
    });



  }


  login() {
    this.logging_in = true;
    this.loginService.login();
  }

  logout() {
    this.logging_in = false;
    this.loginService.logout();
  }

}
