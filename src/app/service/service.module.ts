import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '@app/service/image-processing.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    ImageService,
  ],
})
export class ServiceModule {
  /* make sure ServiceModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    if (parentModule) {
      throw new Error('ServiceModule is already loaded. Import only in AppModule');
    }
  }
}
