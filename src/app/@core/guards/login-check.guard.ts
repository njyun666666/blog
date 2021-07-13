import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService
  ) {
  }

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
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve, reject) => {

      // 檢查登入
      this.loginService.isLogin().then((check) => {
        // console.log('----------doCanActivate  checkFrontEndLogin', check);
        // console.log(check);

        if (check) {
          // console.log('----------doCanActivate  resolve(true)', true);
          resolve(true);

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
