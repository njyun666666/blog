import { LoginGuard } from './../@core/guards/login.guard';
import { LoginCheckGuard } from '../@core/guards/login-check.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../@core/guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [LoginGuard],
  children: [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'dashbord', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'settings', canActivate: [AuthGuard], data: { role: 'Blogger' }, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
