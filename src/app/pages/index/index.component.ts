import { ArticleService } from './../../@core/services/article.service';
import { ThemeService } from 'src/app/@core/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListInfoModel } from 'src/app/@core/models/article/article-list.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  targetAccount: string = '';
  articleList: ArticleListInfoModel[] = [];
  type?: number;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.targetAccount = params.get('account') as string;
      // console.log('account', this.targetAccount);

      if (!this.targetAccount) {
        this.targetAccount = 'i';
      }

      // this.themeService.themeAccount$.next(this.targetAccount);
      // this.themeService.getThemeData({ account: this.targetAccount });

      this.articleService.getIndexList({ account: this.targetAccount }).subscribe((data) => {
        this.articleList = data;
      });


    });


    this.route.queryParamMap.subscribe((query) => {

      const type = query.get('type');

      if (type !== undefined && type !== null) {
        this.type = Number(type);
      } else {
        this.type = undefined;
      }

    });



  }

}
