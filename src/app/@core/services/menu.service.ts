import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuList: MenuModel[] = [
    {
      title: 'HOME',
      icon: 'fas fa-user',
      url: '/pages/dashboard'
    },
    {
      title: '2',
      icon: 'fas fa-user',
      url: '/pages/dashboard/d2',
      children: [
        {
          title: '2-1',
          url: '/pages/miscellaneous/404',
          children: [
            {
              title: '2-1-1',
              url: '/pages/miscellaneous/404',
            },
            {
              title: '2-2-2',
              url: '/pages/Test',
            },
          ],
        },
        {
          title: '2-2',
          url: '/pages/Test',
        },
      ],
    },
    {
      title: '3',
      icon: 'fas fa-user',
      children: [
        {
          title: '3-1',
          url: '/pages/miscellaneous/404',
        },
        {
          title: '3-2',
          url: '/pages/Test',
        },
      ],
    }
  ];

  constructor() { }



}
