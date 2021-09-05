import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BlogEnabledModel } from '../models/settings/blog-enabled.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  authCheck(role: string) {
    return this.apiService.post('/Auth/Check', { role });
  }

  checkBlogEnabled(data: BlogEnabledModel) {
    return this.apiService.post('/Auth/CheckBlogEnabled', data);
  }

  noAuthRedirect() {
    this.router.navigateByUrl('/404');
  }


}
