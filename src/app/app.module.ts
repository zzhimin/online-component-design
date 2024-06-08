import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from "@app/components/components.module";
import { NgZorroAntdModule } from "@app/components/ngZorroAntd.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnlineDesignComponent } from "./pages/design/design.component";
import { OnlineRenderComponent } from "./pages/render/render.component";

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    OnlineDesignComponent,
    OnlineRenderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    NgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
