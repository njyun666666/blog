import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { GoogleAuthService } from './google-auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin$ = new BehaviorSubject<boolean>(false);



  constructor(
    private googleAuthService: GoogleAuthService,
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }


  login() {


    this.googleAuthService.signIn()
      .then(() => {

        this.apiService.post('/Login/Login').subscribe((result) => {
          this.jwtService.saveToken(result.token);

          // this.user = this.googleAuthService.googleUser;

          this.isLogin$.next(true);

        },
          (err) => {
            this.logout();
          });


      })
      .catch(() => {
        this.isLogin$.next(false);
      });



  }

  logout() {
    this.jwtService.destroyToken();
    this.googleAuthService.signOut();
    this.isLogin$.next(false);
  }

  isLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.googleAuthService.isSignedIn()
        .then(() => {

          const token = this.jwtService.getToken();
          if (token == undefined || token == null || token.length == 0) {
            this.googleAuthService.signOut().then(() => {
              reject(false);
            }).catch(() => { reject(false); });

          }

          this.isLogin$.next(true);
          resolve(true);
        })
        .catch(() => {
          reject(false);
        })
    });
  }


}
