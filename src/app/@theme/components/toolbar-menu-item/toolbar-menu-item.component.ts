import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-toolbar-menu-item',
  templateUrl: './toolbar-menu-item.component.html',
  styleUrls: ['./toolbar-menu-item.component.scss']
})
export class ToolbarMenuItemComponent implements OnInit {

  @Input() in_menuList?: MenuModel[];
  @ViewChild('childMenu', { static: true }) public childMenu: any;


  constructor() {
  }

  ngOnInit(): void {

  }

}
