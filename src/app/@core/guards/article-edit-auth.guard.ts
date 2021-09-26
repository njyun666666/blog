import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleEditAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      const article_id = Number(route.paramMap.get('article_id'));

      this.authService.articleEditAuth({ article_id: article_id }).subscribe((data) => {
        resolve(true);
      }, (error) => {
        this.authService.noAuthRedirect();
        reject(false);
      });

    });
  }

}
