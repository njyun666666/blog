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
      newRequest = newRequest.clone({ setHeaders: { gtoken: this.googleAuthService.googleUser.id_token } });
    }


    const token = this.jwtService.getToken();

    if (token) {
      newRequest = newRequest.clone({ setHeaders: { token: token } });
    }

    return next.handle(newRequest);
  }
}
