import { Injectable } from '@angular/core';
import {slugs} from "../utils/slug";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getModuleNameBySlug(slug) {
    return this.http.get(`${environment.apiUrl}/${slug}`);
  }

}
