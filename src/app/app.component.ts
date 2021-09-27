import { LoadingService } from './@core/services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  loading: boolean = true;

  constructor(
    private loadingService: LoadingService
  ) {

    loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });

  }

}
