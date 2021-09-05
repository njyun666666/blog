import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogEnabledGuard } from 'src/app/@core/guards/blog-enabled.guard';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [BlogEnabledGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
