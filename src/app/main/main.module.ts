import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { MainRoutingModule } from '@app/main/main-routing.module';
import { ImageUploadModule } from 'angular2-image-upload';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [HomePageComponent, SpinnerComponent],
})
export class MainModule {

}

