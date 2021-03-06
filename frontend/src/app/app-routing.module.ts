import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoPlayerComponent} from "./components/video-player/video-player.component";

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //   import('./modules/home/home.module').then((mod) => mod.HomeModule)
  // },
  // {
  //   path: 'article-details',
  //   loadChildren: () =>
  //   import('./modules/article-details/article-details.module').then((mod) => mod.ArticleDetailsModule)
  // },
  // {
  //   path: 'article-category',
  //   loadChildren: () =>
  //   import('./modules/article-category/article-category.module').then((mod) => mod.ArticleCategoryModule)
  // },
  {
    path: 'video',
    component: VideoPlayerComponent
  },
  // {
  //   path: ":slug",
  //   loadChildren: () =>
  //   import("./modules/url-handler/url-handler.module").then((mod) => mod.UrlHandlerModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
