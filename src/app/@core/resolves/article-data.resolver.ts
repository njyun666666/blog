import { ArticleService } from './../services/article.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleListInfoModel } from '../models/article/article-list.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataResolver implements Resolve<ArticleListInfoModel> {

  constructor(
    private articleService: ArticleService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleListInfoModel> {

    const account = route.paramMap.get('account') as string;
    const article_id = Number(route.paramMap.get('article_id'));

    console.log(account, article_id);

    return this.articleService.getArticle({ account: account, id: article_id });
  }
}
