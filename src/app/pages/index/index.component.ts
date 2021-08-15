import { ThemeService } from 'src/app/@core/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const account = params['account'];
      this.themeService.getThemeData({ account: account });
    });


  }

}
