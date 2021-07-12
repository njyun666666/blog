import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MeunComponent } from './components/meun/meun.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ToolbarMenuComponent } from './components/toolbar-menu/toolbar-menu.component';
import { ToolbarMenuItemComponent } from './components/toolbar-menu-item/toolbar-menu-item.component';

const components = [
  MainLayoutComponent
];

@NgModule({
  declarations: [
    ...components,
    MeunComponent,
    LoginComponent,
    ToolbarMenuComponent,
    ToolbarMenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class ThemeModule { }
