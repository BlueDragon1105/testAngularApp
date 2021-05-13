import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details.component';

@NgModule({
  declarations: [
  ArticleDetailsComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ArticleDetailsComponent
  ],
  entryComponents: [
    ArticleDetailsComponent
  ]
})

export class ArticleDetailsModule {
  static components = {
    articleDetails: ArticleDetailsComponent
  };
}
