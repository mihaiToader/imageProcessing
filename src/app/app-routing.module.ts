import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
