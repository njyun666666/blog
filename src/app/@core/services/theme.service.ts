import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';
import { ThemeDataRequestModel, ThemeDataViewModel } from '../models/theme.model';
import { Title } from '@angular/platform-browser';
import { ArticlesTypeMenuModel } from '../models/article/articles-type-menu.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeAccount: string = '';
  themeAccount$ = new Subject<string>();
  toolbarTitle$ = new Subject<string>();
  sidebarMenu$ = new Subject<ArticlesTypeMenuModel[]>();

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private jwtService: JwtService
  ) {

    this.themeAccount$.subscribe((account) => {
      if (account == 'i') account = '';
      this.themeAccount = account;
      // this.getThemeData({ account: account });
    });

  }

  setTheme() {

  }

  getThemeData(data?: ThemeDataRequestModel) {

    if (data?.self == 1) {
      this.themeAccount = this.jwtService.getAccount();
      this.themeAccount$.next(this.themeAccount);
    }

    this.apiService.post('/Theme/GetThemeData', data).subscribe((data: ThemeDataViewModel) => {
      this.toolbarTitle$.next(data.title);
      this.titleService.setTitle(data.title);

      this.sidebarMenu$.next(data.menu);
    });
  }

}
