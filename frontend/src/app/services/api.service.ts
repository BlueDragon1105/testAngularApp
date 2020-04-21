import { Injectable } from '@angular/core';
import {slugs} from "../utils/slug";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getModuleNameBySlug(slug) {
    const slugList = slugs.find(item => item.slug === slug);
    return slugList.moduleName;
  }

}
