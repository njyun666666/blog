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
    private googleAuthService: GoogleAuthService
  ) {

  }

  ngOnInit(): void {


    this.googleAuthService.isLogin$.subscribe((result) => {
      this.user = this.googleAuthService.googleUser;
      this.isLogin = result;
    });


    this.googleAuthService.isSignedIn().then(() => {

      this.user = this.googleAuthService.googleUser;

    }).catch(() => { });




  }


  login() {
    this.googleAuthService.signIn();
  }

  logout() {
    this.googleAuthService.signOut();
  }

}
