import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-details',
  template: `<p>Article-details works</p>`
})

export class ArticleDetailsComponent {
}

@NgModule({
  declarations: [
    ArticleDetailsComponent
  ],
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
