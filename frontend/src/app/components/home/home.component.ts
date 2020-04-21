import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moduleName = '';
  slug;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setSlugAndGetModuleNameBySlug();
  }

  private setSlugAndGetModuleNameBySlug() {
    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug || '';
      this.apiService.getModuleNameBySlug(this.slug).subscribe((res:any) => {
        this.moduleName = res.moduleName;
        console.log('result ===>', res);
      })
    });
  }



}
