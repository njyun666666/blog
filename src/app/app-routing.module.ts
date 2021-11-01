import { GapiLoadGuard } from './@core/guards/gapi-load.guard';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', canActivate: [GapiLoadGuard], loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '**', redirectTo: '' }
];

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
