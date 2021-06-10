import { Injectable } from '@angular/core';
import { MenuModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuList: MenuModel[] = [
    {
      title: 'HOME',
      icon: 'home-outline',
      url: '/pages/dashboard'
    },
    {
      title: '2',
      icon: 'home-outline',
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
          title: 'd2-2',
          url: '/pages/Test',
        },
      ],
    },
    {
      title: '3',
      icon: 'shuffle-2-outline',
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
