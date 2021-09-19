import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleEnabledGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const article_id = Number(route.paramMap.get('article_id'));
    const account = route.paramMap.get('account') as string;

    return new Promise((resolve, reject) => {
      this.authService.checkArticleEnabled({ account: account, article_id: article_id }).subscribe(() => {
        resolve(true);
      }, () => { reject(false); });
    });

  }

}
