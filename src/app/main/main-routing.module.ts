import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@app/main/home-page/home-page.component';
import {FullImageComponent} from '@app/main/full-image/full-image.component';
const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      }
    ]
  },
  {
    path: 'full',
    component: FullImageComponent,
  }
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
