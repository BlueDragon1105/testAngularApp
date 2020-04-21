import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  moduleName = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  getModuleNameBySlug(slug) {
    // this.moduleName = this.apiService.getModuleNameBySlug(slug);
  }

}
