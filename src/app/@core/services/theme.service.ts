import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';
import { ThemeDataRequestModel, ThemeDataViewModel } from '../models/theme.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  toolbarTitle$ = new Subject<string>();
  sidebarMenu$ = new Subject<MenuModel[]>();

  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) { }


  getThemeData(data?: ThemeDataRequestModel) {
    this.apiService.post('/Theme/GetThemeData', data).subscribe((data: ThemeDataViewModel) => {
      this.toolbarTitle$.next(data.title);
      this.titleService.setTitle(data.title);

      this.sidebarMenu$.next(data.menu);
    });
  }

}
