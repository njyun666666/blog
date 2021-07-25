import { LoginService } from './../services/login.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(childRoute, state);
  }


  doCanActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve, reject) => {
      const role = route.data.role;



      // 檢查前端登入
      this.loginService.frontIsLogin().then((check) => {
        // console.log('----------doCanActivate  checkFrontEndLogin', check);
        // console.log(check);

        if (check) {
          // console.log('----------doCanActivate  resolve(true)', true);

          this.authService.authCheck(role).toPromise().then(() => {

            resolve(true);

          }).catch(() => {
            reject(false);
          });


        } else {
          this.loginService.noLoginRedirect();
          reject(false);
        }




      }).catch(() => {
        console.log('----------doCanActivate checkFrontEndLogin catch  reject', false);

        this.loginService.noLoginRedirect();
        reject(false);
      });





    });

  }
}
