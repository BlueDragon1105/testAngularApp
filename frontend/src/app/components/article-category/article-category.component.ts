import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss']
})
export class ArticleCategoryComponent implements OnInit {

  moduleName = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  getModuleNameBySlug(slug) {
    this.moduleName = this.apiService.getModuleNameBySlug(slug);
  }

}
