import { ThemeService } from './../services/theme.service'
import { Injectable } from '@angular/core'
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ThemeDataResolver implements Resolve<boolean> {

  constructor(
    private themeService: ThemeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const account = route.paramMap.get('account') as string;
    this.themeService.getThemeData({ account: account });
    return of(true)
  }
}
