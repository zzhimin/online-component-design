import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from "@app/components/ngZorroAntd.module";
import { ComponentsModule } from "@app/components/components.module";

import { OnlineRenderRoutingModule } from './render-routing.module';
import { OnlineRenderComponent } from './render.component';

@NgModule({
  declarations: [
    OnlineRenderComponent
  ],
  imports: [
    BrowserModule,
    OnlineRenderRoutingModule,
    NgZorroAntdModule,
    ComponentsModule,
  ],
  providers: [],
})
export class OnlineRenderModule { }
