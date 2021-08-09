import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { SettingsModel } from '../models/settings/settings.model';
import { ArticleTypeAddModel, ArticleTypeDeleteModel, ArticleTypeEditModel, ArticleTypeModel, ArticleTypeSortModel } from '../models/settings/article-type.model';
import { ReturnModel } from '../models/return.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private apiService: ApiService
  ) { }


  get(): Observable<SettingsModel> {
    return this.apiService.post('/Settings/Get');
  }

  edit(data: SettingsModel): Observable<ReturnModel> {
    return this.apiService.post('/Settings/Edit', data);
  }

  getArticleType(): Observable<ArticleTypeModel[]> {
    return this.apiService.post('/Settings/ArticleTypeGet');
  }

  addArticleType(data: ArticleTypeAddModel): Observable<ReturnModel> {
    return this.apiService.post('/Settings/ArticleTypeAdd', data);
  }

  editArticleType(data: ArticleTypeEditModel): Observable<ReturnModel> {
    return this.apiService.post('/Settings/ArticleTypeEdit', data);
  }

  deleteArticleType(data: ArticleTypeDeleteModel): Observable<ReturnModel> {
    return this.apiService.post('/Settings/ArticleTypeDelete', data);
  }

  editArticleTypeSort(data: ArticleTypeSortModel): Observable<ReturnModel> {
    return this.apiService.post('/Settings/ArticleTypeSortEdit', data);
  }

}
