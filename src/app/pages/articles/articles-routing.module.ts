import { ArticlesNewComponent } from './articles-new/articles-new.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticleDataResolver } from 'src/app/@core/resolves/article-data.resolver';
import { ArticleEnabledGuard } from 'src/app/@core/guards/article-enabled.guard';

const routes: Routes = [
  { path: 'new', component: ArticlesNewComponent },
  { path: '', component: ArticlesComponent, canActivate: [ArticleEnabledGuard], resolve: { content: ArticleDataResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
