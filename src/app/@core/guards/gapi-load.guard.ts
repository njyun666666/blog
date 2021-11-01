import { GoogleAuthService } from './../services/google-auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GapiLoadGuard implements CanActivate {


  constructor(
    private googleAuthService: GoogleAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.googleAuthService.isAuth2load().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      })
    });
  }

}
