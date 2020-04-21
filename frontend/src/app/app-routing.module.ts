import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ArticleDetailsComponent} from './components/article-details/article-details.component';
import {ArticleCategoryComponent} from './components/article-category/article-category.component';
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  {
    path: 'test',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'article-details',
        component: ArticleDetailsComponent
      },
      {
        path: 'article-category',
        component: ArticleCategoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
