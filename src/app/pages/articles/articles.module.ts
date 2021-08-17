import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticlesNewComponent } from './articles-new/articles-new.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesNewComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ArticlesModule { }
