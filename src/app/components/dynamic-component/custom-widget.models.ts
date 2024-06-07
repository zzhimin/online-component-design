import { Injector, NgZone, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatValue } from '@app/core/utils';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as RxJS from 'rxjs';
import * as RxJSOperators from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

export class WidgetContext {
  dashboardWidget: any;

  constructor(private widget: any) {}
  date: DatePipe;
  http: HttpClient;
  sanitizer: DomSanitizer;
  router: Router;

  message: NzMessageService;

  utils = {
    formatValue
  };

  $container: HTMLElement;
  $containerParent: HTMLElement;
  $scope: IDynamicWidgetComponent;

  widgetNamespace?: string;

  servicesMap?: Map<string, Type<any>>;

  $injector?: Injector;

  ngZone?: NgZone;

  rxjs = {
    ...RxJS,
    ...RxJSOperators
  };
}

export interface IDynamicWidgetComponent {
  readonly ctx: WidgetContext;
  readonly $injector: Injector;
  [key: string]: any;
}
