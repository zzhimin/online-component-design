import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from "@app/components/ngZorroAntd.module";
import { ComponentsModule } from "@app/components/components.module";

import { OnlineRenderRoutingModule } from './render-routing.module';
import { OnlineRenderComponent } from './render.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    OnlineRenderComponent
  ],
  imports: [
    OnlineRenderRoutingModule,
    NgZorroAntdModule,
    ComponentsModule,
    CommonModule,
  ],
  providers: [],
})
export class OnlineRenderModule { }
