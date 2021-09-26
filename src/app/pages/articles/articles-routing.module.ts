import { ArticlesNewComponent } from './articles-new/articles-new.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticleDataResolver } from 'src/app/@core/resolves/article-data.resolver';
import { ArticleEnabledGuard } from 'src/app/@core/guards/article-enabled.guard';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { ArticleEditAuthGuard } from 'src/app/@core/guards/article-edit-auth.guard';

const routes: Routes = [
  {
    path: 'new',
    component: ArticlesNewComponent,
    canActivate: [AuthGuard],
    data: { role: 'Blogger' }
  },
  {
    path: 'new/:article_id',
    component: ArticlesNewComponent,
    canActivate: [ArticleEditAuthGuard],
    data: { role: 'Blogger' },
    resolve: { data: ArticleDataResolver }
  },
  {
    path: '',
    component: ArticlesComponent,
    canActivate: [ArticleEnabledGuard],
    resolve: { content: ArticleDataResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
