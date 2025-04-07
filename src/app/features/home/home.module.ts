import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent  // Import du composant standalone
  ]
})
export class HomeModule { }
