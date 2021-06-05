import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { ThemeModule } from 'src/app/@theme/theme.module';


@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
