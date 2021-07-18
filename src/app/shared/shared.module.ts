import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './components/nav-content/nav-content.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavContentComponent
  ]
})
export class SharedModule { }
