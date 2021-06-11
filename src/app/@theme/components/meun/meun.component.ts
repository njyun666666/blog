import { Component, Input, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-meun',
  templateUrl: './meun.component.html',
  styleUrls: ['./meun.component.scss']
})
export class MeunComponent implements OnInit {

  @Input() in_menuList?: MenuModel[];

  constructor() { }

  ngOnInit(): void {

  }


}
