import { MenuService } from './../../@core/services/menu.service';
import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  menu!: MenuModel[];
  activeLink!: string;


  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {

    this.menuService.getMenu(2).subscribe((data) => {
      this.menu = data;
      this.activeLink = window.location.pathname;
    }, (err) => { console.log(err); });



  }




}
