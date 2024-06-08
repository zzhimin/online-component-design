import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from "@app/components/ngZorroAntd.module";
import { ComponentsModule } from "@app/components/components.module";

import { OnlineDesignRoutingModule } from './design-routing.module';
import { OnlineDesignComponent } from './design.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    OnlineDesignComponent
  ],
  imports: [
    OnlineDesignRoutingModule,
    NgZorroAntdModule,
    ComponentsModule,
    CommonModule,
  ],
  providers: [],
})
export class OnlineDesignModule { }
