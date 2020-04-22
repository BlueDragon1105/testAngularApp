import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../../components/home/home.component";
import {ArticleCategoryComponent} from "../../components/article-category/article-category.component";

const routes: Routes = [
  {
    path: '',
    component: ArticleCategoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ArticleCategoryModule { }
