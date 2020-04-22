import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-category',
  template: `<p>Article-category works</p>`
})

export class ArticleCategoryComponent {
}

@NgModule({
  declarations: [
    ArticleCategoryComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArticleCategoryComponent
  ],
  entryComponents: [
    ArticleCategoryComponent
  ]
})

export class ArticleCategoryModule {
  static components = {
    articleCategory: ArticleCategoryComponent
  };
}
