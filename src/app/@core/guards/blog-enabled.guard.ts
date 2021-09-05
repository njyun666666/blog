import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogEnabledGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      const account = route.paramMap.get('account') as string;

      this.authService.checkBlogEnabled({ account: account }).subscribe(() => {
        resolve(true);
      }, (error) => {

        this.authService.noAuthRedirect();
        reject(false);
      });

    });
  }

}
