import { GoogleAuthService } from './../services/google-auth.service';
import { JwtService } from './../services/jwt.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService,
    private googleAuthService: GoogleAuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newRequest = request.clone();

    if (this.googleAuthService.googleUser) {
      newRequest = request.clone({ setHeaders: { token: this.googleAuthService.googleUser.id_token } });
    }


    return next.handle(newRequest);
  }
}
