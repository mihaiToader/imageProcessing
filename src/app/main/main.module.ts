import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { MainRoutingModule } from '@app/main/main-routing.module';
import { ImageUploadModule } from 'angular2-image-upload';
import { SpinnerComponent } from './spinner/spinner.component';
import { Lab1Component } from './lab-1/lab-1.component';
import { Lab2Component } from './lab-2/lab-2.component';
import { FormsModule } from '@angular/forms';
import { Lab3Component } from './lab-3/lab-3.component';
import { FullImageComponent } from './full-image/full-image.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MainRoutingModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    HomePageComponent,
    SpinnerComponent,
    Lab1Component,
    Lab2Component,
    Lab3Component,
    FullImageComponent,
    NotificationComponent
  ],
})
export class MainModule {

}

