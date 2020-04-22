import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ArticleDetailsComponent} from "../../components/article-details/article-details.component";

const routes: Routes = [
  {
    path: '',
    component: ArticleDetailsComponent
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

export class ArticleDetailsModule { }
