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

  constructor(
    private googleAuthService: GoogleAuthService,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {


    this.loginService.isLogin$.subscribe((data) => {
      this.user = this.googleAuthService.googleUser;
      this.isLogin = data;
    });

    this.loginService.isLogin().then(() => {

      this.user = this.googleAuthService.googleUser;

    }).catch(() => { });




  }


  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

}
