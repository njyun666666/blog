import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { BlogSettingComponent } from './blog-setting/blog-setting.component';
import { ArticlesTypeComponent } from './articles-type/articles-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesTypeFormComponent } from './articles-type/articles-type-form/articles-type-form.component';


@NgModule({
  declarations: [
    SettingsComponent,
    BlogSettingComponent,
    ArticlesTypeComponent,
    ArticlesTypeFormComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
