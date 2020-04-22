import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HomeModule} from "../../modules/home/home.module";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  slug;
  isNotFound = false;
  loaded = false;
  myComponent;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setSlugAndGetModuleNameBySlug();
  }

  private setSlugAndGetModuleNameBySlug() {
    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug || 'home';
      this.apiService.getModuleNameBySlug(this.slug).subscribe((res:any) => {
        if (res.moduleName === 'Not Found') {
          this.isNotFound = true;
          this.loaded = false;
        } else {
          console.log('loading.........');
          if (res.moduleName === 'home') {
            console.log('home.........');
            import('./../../modules/home/home.module')
              .then(mod => mod.HomeModule)
              .then(homeModule => {
                this.myComponent = homeModule.components['home'];
                this.loaded = true;
              });
          }
          if (res.moduleName === 'article-category') {
            console.log('article-category.........');
            import('./../../modules/article-category/article-category.module')
              .then(mod => mod.ArticleCategoryModule)
              .then(articleCategoryModule => {
                this.myComponent = articleCategoryModule.components['articleCategory'];
                this.loaded = true;
              });
          }
          if (res.moduleName === 'article-details') {
            console.log('article-details.........');
            import('./../../modules/article-details/article-details.module')
              .then(mod => mod.ArticleDetailsModule)
              .then(articleDetailModule => {
                this.myComponent = articleDetailModule.components['articleDetails'];
                this.loaded = true;
              });
          }

        }
      })
    });
  }

}
