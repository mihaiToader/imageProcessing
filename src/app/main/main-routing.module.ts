import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@app/main/home-page/home-page.component';
const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  providers: [],
  exports: [
    RouterModule,
  ],
})
export class MainRoutingModule {
}
