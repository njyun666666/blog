import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  toolbarTitle!: string;
  toolbarTitle$ = new Subject<string>();


  constructor(
    private apiService: ApiService
  ) { }


  getTitle() {
    this.apiService.get('');
  }

}
