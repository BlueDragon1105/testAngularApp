import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  slug;
  isNotFound = false;

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
        } else {
          this.router.navigate([res.moduleName]);
        }
      })
    });
  }

}
