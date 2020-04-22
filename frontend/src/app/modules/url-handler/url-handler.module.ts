import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, RouterModule, Routes} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {LayoutComponent} from "../../components/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
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

export class UrlHandlerModule {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    console.log('url handler >>> ');
  }
}
