import { GoogleAuthService } from './../services/google-auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class GoogleTokenCheckInterceptor implements HttpInterceptor {

  constructor(
    private googleAuthService: GoogleAuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.googleAuthService.isSignedIn()).pipe(
      switchMap(check => {
        // console.log(check);
        return next.handle(request);
      }));

  }
}
