import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { BlogSettingComponent } from './blog-setting/blog-setting.component';
import { ArticlesTypeComponent } from './articles-type/articles-type.component';


@NgModule({
  declarations: [
    SettingsComponent,
    BlogSettingComponent,
    ArticlesTypeComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule
  ]
})
export class SettingsModule { }
