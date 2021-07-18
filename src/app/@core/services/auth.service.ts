import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService
  ) { }

  authCheck(role: string) {
    return this.apiService.post('/Auth/Check', { role });
  }

}
