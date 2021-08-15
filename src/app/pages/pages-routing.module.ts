import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './../@core/guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../@core/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [LoginGuard],
  children: [
    // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'settings', canActivate: [AuthGuard], data: { role: 'Blogger' }, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    { path: '404', component: PageNotFoundComponent },
    { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) },
    { path: ':account/:article_id', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) },

    // blog index
    { path: 'i', redirectTo: '' },
    { path: ':account', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
    { path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },

    { path: '**', component: PageNotFoundComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
