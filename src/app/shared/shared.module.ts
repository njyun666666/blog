import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './components/nav-content/nav-content.component';
import { RouterModule } from '@angular/router';
import { NoticeMessageComponent } from './components/notice-message/notice-message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingDirective } from './directive/loading.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ArticleTypeLabelComponent } from './components/article-type-label/article-type-label.component';



@NgModule({
  declarations: [
    NavContentComponent,
    NoticeMessageComponent,
    LoadingComponent,
    LoadingDirective,
    DialogComponent,
    FilterPipe,
    ArticleTypeLabelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NavContentComponent,
    LoadingDirective,
    FilterPipe,
    ArticleTypeLabelComponent
  ]
})
export class SharedModule { }
