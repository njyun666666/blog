import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './components/nav-content/nav-content.component';
import { RouterModule } from '@angular/router';
import { NoticeMessageComponent } from './components/notice-message/notice-message.component';



@NgModule({
  declarations: [
    NavContentComponent,
    NoticeMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NavContentComponent
  ]
})
export class SharedModule { }
