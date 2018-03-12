import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { MainRoutingModule } from '@app/main/main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
  declarations: [HomePageComponent],
})
export class MainModule {

}

