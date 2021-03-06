import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/@core/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {




  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {

    this.themeService.getThemeData({ self: 1 });

  }




}
