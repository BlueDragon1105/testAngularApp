import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moduleName = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.moduleName = this.apiService.getModuleNameBySlug('');
  }

}
