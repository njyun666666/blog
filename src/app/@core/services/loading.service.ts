import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$ = new Subject<boolean>();

  constructor(
    private router: Router
  ) {

    router.events.subscribe((event) => {

      // console.log(event);

      if (event instanceof NavigationStart) {
        this.loading$.next(true);
      }
      if (event instanceof NavigationEnd) {
        this.loading$.next(false);
      }

    });

  }
}
