import { ArticleListInfoModel } from './../../@core/models/article/article-list.model';
import { ThemeService } from 'src/app/@core/services/theme.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Vditor from 'vditor';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {

  targetAccount: string = '';
  item!: ArticleListInfoModel;
  @ViewChild('contentDOM') contentDOM!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) { }


  ngOnInit(): void {
    // const account = this.route.snapshot.paramMap.get('account');
    // const id = this.route.snapshot.paramMap.get('article_id');
    // console.log('account: ', account);
    // console.log('article id: ', id);



    this.route.paramMap.subscribe(params => {
      const account = params.get('account') as string;
      this.targetAccount = account;
      // const article_id = params.get('article_id');

      // this.themeService.themeAccount$.next(account);
      this.themeService.getThemeData({ account: account });

      // console.log('route sub: ', account);
      // console.log('route sub: ', article_id);
      // const account = params['account'];
    });


    this.route.data.subscribe((data) => {
      this.item = data['content'];

    });



  }

  ngAfterViewInit(): void {
    // console.log(this.contentDOM.nativeElement);
    this.mde();
  }


  mde() {
    Vditor.preview(this.contentDOM.nativeElement,
      this.item.content,
      {
        mode: 'dark',
        lang: 'zh_TW',
        cdn: '/assets/packages/vditor@3.8.6',
        theme: {
          current: 'dark',
          path: '/assets/packages/vditor@3.8.6/dist/css/content-theme'
        }
      }
    );


  }


}
