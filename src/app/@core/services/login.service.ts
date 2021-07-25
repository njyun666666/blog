import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { GoogleAuthService } from './google-auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin$ = new BehaviorSubject<boolean>(false);



  constructor(
    private googleAuthService: GoogleAuthService,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
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

    this.cleanLoginToken();

    const path = window.location.pathname;
    const needRedirectPage = ['/settings'];

    needRedirectPage.forEach(x => {

      if (path.indexOf(x) == 0) {
        this.router.navigate(['/']);
      }

    });

  }

  cleanLoginToken() {

    this.jwtService.destroyToken();
    this.googleAuthService.signOut();
    this.isLogin$.next(false);
  }

  noLoginRedirect() {
    this.logout();
    this.router.navigate(['/']);
  }

  /**檢查登入 */
  isLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      // 先檢查前端登入
      this.frontIsLogin().then(() => {


        // 檢查token
        this.loginCheckAPI().toPromise().then(() => {
          // console.log('---  loginCheckAPI()');

          this.isLogin$.next(true);
          resolve(true);

        }).catch((err) => {
          // console.log('---  loginCheckAPI()', err);
          this.cleanLoginToken();
          reject(false);
        });


      })
        .catch((err) => {
          // console.log('googleAuthService.isSignedIn()', err);
          this.cleanLoginToken();
          reject(false);
        });

    });
  }


  /**檢查前端登入 */
  frontIsLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      // 先檢查google sign
      this.googleAuthService.isSignedIn()
        .then(() => {

          const token = this.jwtService.getToken();
          if (token) {

            resolve(true);

          } else {
            this.cleanLoginToken();
            reject(false);
          }

        })
        .catch((err) => {
          // console.log('googleAuthService.isSignedIn()', err);
          this.cleanLoginToken();
          reject(false);
        });

    });
  }



  /**檢查 token */
  loginCheckAPI() {
    return this.apiService.post('/Login/Check');
  }

}
