import { ArticlesTypeComponent } from './articles-type/articles-type.component';
import { BlogSettingComponent } from './blog-setting/blog-setting.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', component: BlogSettingComponent },
      { path: 'articles-type', component: ArticlesTypeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
