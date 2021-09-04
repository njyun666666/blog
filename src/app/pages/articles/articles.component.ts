import { ThemeService } from 'src/app/@core/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

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
      const article_id = params.get('article_id');

      this.themeService.themeAccount$.next(account);
      console.log('route sub: ', account);
      console.log('route sub: ', article_id);
      // const account = params['account'];
    });


  }

}
