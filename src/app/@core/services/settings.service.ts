import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { SettingsModel } from '../models/settings/settings.model';
import { ArticleTypeAddModel, ArticleTypeEditModel, ArticleTypeModel } from '../models/settings/article-type.model';

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

  edit(data: SettingsModel) {
    return this.apiService.post('/Settings/Edit', data);
  }

  getArticleType(): Observable<ArticleTypeModel[]> {
    return this.apiService.post('/Settings/ArticleTypeGet');
  }

  addArticleType(data: ArticleTypeAddModel): Observable<any> {
    return this.apiService.post('/Settings/ArticleTypeAdd', data);
  }

  editArticleType(data: ArticleTypeEditModel): Observable<any> {
    return this.apiService.post('/Settings/ArticleTypeEdit', data);
  }

}
