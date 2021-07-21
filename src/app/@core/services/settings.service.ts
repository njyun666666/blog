import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private apiService: ApiService
  ) { }


  getSetting() {
    return this.apiService.post('/Settings/GetBlogSetting');
  }

}
