import { ReturnModel } from 'src/app/@core/models/return.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ArticleListAddFormModel, ArticleListInfoModel, ArticleListModel, ArticleListRequestModel } from '../models/article/article-list.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) { }

  addArticle(data: ArticleListAddFormModel): Observable<ReturnModel<number>> {
    return this.apiService.post('/Article/AddArticle', data);
  }

  getIndexList(data: ArticleListRequestModel): Observable<ArticleListInfoModel[]> {
    return this.apiService.post('/Article/GetIndexList', data);
  }

}
