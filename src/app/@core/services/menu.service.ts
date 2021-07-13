import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuList!: MenuModel[];


  constructor(
    private apiService: ApiService
  ) { }

  getMenu(type: number): Observable<MenuModel[]> {
    return this.apiService.get('/Menu/MenuGet/' + type);
  }


}
