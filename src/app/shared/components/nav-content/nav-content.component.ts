import { MenuService } from './../../../@core/services/menu.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {

  @Input() in_menu_type!: number;

  menu!: MenuModel[];
  activeLink!: string;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenu(this.in_menu_type).subscribe((data) => {
      this.menu = data;
      this.activeLink = window.location.pathname;
    }, (err) => { console.log(err); });

  }





}
