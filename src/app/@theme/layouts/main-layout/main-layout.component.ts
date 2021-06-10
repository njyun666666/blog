import { MenuService } from './../../../@core/services/menu.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = [];
  sidebarOpened = true;

  menuList: MenuModel[];

  private _mobileQueryListener: () => void;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    menuService: MenuService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');


    if (this.mobileQuery.matches) {
      this.sidebarOpened = false;
    }

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.menuList = menuService.menuList;

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
