import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from "@app/components/ngZorroAntd.module";
import { ComponentsModule } from "@app/components/components.module";

import { OnlineDesignRoutingModule } from './design-routing.module';
import { OnlineDesignComponent } from './design.component';

@NgModule({
  declarations: [
    OnlineDesignComponent
  ],
  imports: [
    BrowserModule,
    OnlineDesignRoutingModule,
    NgZorroAntdModule,
    ComponentsModule,
  ],
  providers: [],
})
export class OnlineDesignModule { }
