import { ThemeService } from 'src/app/@core/services/theme.service';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesTypeMenuModel } from 'src/app/@core/models/article/articles-type-menu.model';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-articles-type-menu',
  templateUrl: './articles-type-menu.component.html',
  styleUrls: ['./articles-type-menu.component.scss']
})
export class ArticlesTypeMenuComponent implements OnInit {

  @Input() in_menuList?: ArticlesTypeMenuModel[];

  url: string = '';
  account: string = '';

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {

    this.setURL();

    this.themeService.themeAccount$.subscribe((account) => {
      this.setURL();
    });

  }

  setURL() {
    this.account = this.themeService.themeAccount;

    if (this.account) {
      this.url = `/${this.account}/`;
    } else {
      this.url = '/';
    }
  }

}
