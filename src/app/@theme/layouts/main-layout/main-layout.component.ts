import { ThemeService } from './../../../@core/services/theme.service';
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

  toolbarTitle!: string;
  menuList: MenuModel[];

  private _mobileQueryListener: () => void;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private menuService: MenuService,
    private themeService: ThemeService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');


    if (this.mobileQuery.matches) {
      this.sidebarOpened = false;
    }

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.menuList = menuService.menuList;



    themeService.toolbarTitle$.subscribe((data) => {
      this.toolbarTitle = data;
    });


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
