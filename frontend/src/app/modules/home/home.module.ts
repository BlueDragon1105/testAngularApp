import {Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `<p>Home works</p>`
})

export class HomeComponent {
}

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    HomeComponent
  ]
})

export class HomeModule {
  static components = {
    home: HomeComponent
  };
  constructor() {
    console.log('homeModule...');
  }
}
