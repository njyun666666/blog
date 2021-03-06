import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { SettingsModel } from '../models/settings/settings.model';
import { ArticleTypeAddModel, ArticleTypeDeleteModel, ArticleTypeEditModel, ArticleTypeModel, ArticleTypeSortModel } from '../models/settings/article-type.model';
import { ReturnModel } from '../models/return.model';
import { BlogEnabledModel } from '../models/settings/blog-enabled.model';

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

  edit(data: SettingsModel): Observable<ReturnModel<any>> {
    return this.apiService.post('/Settings/Edit', data);
  }

  getArticleType(): Observable<ArticleTypeModel[]> {
    return this.apiService.post('/Settings/ArticleTypeGet');
  }

  addArticleType(data: ArticleTypeAddModel): Observable<ReturnModel<number>> {
    return this.apiService.post('/Settings/ArticleTypeAdd', data);
  }

  editArticleType(data: ArticleTypeEditModel): Observable<ReturnModel<any>> {
    return this.apiService.post('/Settings/ArticleTypeEdit', data);
  }

  deleteArticleType(data: ArticleTypeDeleteModel): Observable<ReturnModel<any>> {
    return this.apiService.post('/Settings/ArticleTypeDelete', data);
  }

  editArticleTypeSort(data: ArticleTypeSortModel): Observable<ReturnModel<any>> {
    return this.apiService.post('/Settings/ArticleTypeSortEdit', data);
  }



}
