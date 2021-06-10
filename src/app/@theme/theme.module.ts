import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MeunComponent } from './components/meun/meun.component';

const components = [
  MainLayoutComponent
];

@NgModule({
  declarations: [
    ...components,
    MeunComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class ThemeModule { }
