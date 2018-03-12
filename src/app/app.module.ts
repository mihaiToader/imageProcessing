import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { SharedModule } from '@app/shared/shared.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { MainModule } from '@app/main/main.module';
import { ServiceModule } from '@app/service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ServiceModule,
    AppRoutingModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
