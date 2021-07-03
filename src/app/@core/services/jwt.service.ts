import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): void {
    console.log('getToken()');
    // return window.localStorage['jwtToken'];
  }

}
