import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { SettingsModel } from '../models/settings.model';

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

}
