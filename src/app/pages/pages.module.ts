import { NgModule } from '@angular/core';

import { OnlineDesignModule } from './design/design.module';
import { OnlineRenderModule } from "./render/render.module";

@NgModule({
  exports: [
    OnlineDesignModule,
    OnlineRenderModule,
  ]
})
export class OnlineComponentDesignPagesModule { }
