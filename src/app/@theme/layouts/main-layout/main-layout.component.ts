import { ThemeService } from './../../../@core/services/theme.service';
import { MenuService } from './../../../@core/services/menu.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/@core/models/menu.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = [];
  sidebarOpened = true;

  toolbarTitle: string = '';
  menuList: MenuModel[] = [];

  private _mobileQueryListener: () => void;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private menuService: MenuService,
    private themeService: ThemeService,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');


    if (this.mobileQuery.matches) {
      this.sidebarOpened = false;
    }

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    themeService.toolbarTitle$.subscribe((data) => {
      this.toolbarTitle = data;
    });

    themeService.sidebarMenu$.subscribe((data) => {
      this.menuList = data;
    });

    // themeService.getThemeData({ account: '', self: 0 });


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
