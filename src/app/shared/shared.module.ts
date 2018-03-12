import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const sharedModules = [
  HttpClientModule,
  CommonModule,
  BrowserAnimationsModule,
];
const sharedComponents = [];
const sharedProviders = [];
@NgModule({
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedComponents],
  declarations: [...sharedComponents],
  providers: [...sharedProviders],
})
export class SharedModule {
}
