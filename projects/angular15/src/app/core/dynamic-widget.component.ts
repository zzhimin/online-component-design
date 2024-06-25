import { Inject, Type } from '@angular/core';
import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDynamicWidgetComponent, WidgetContext } from '../components/dynamic-component/custom-widget.models';
import { NzMessageService } from 'ng-zorro-antd/message';


export function DInject<T>(token: any): (target: Type<T>, key: any, paramIndex: number) => void {
  return (target: Type<T>, key: any, paramIndex: number) => {
    Inject(token)(target, key, paramIndex);
  };
}


@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DynamicWidgetComponent implements IDynamicWidgetComponent, OnInit, OnDestroy {

  [key: string]: any;

  validators = Validators;

  constructor(
              @DInject(FormBuilder) public fb: FormBuilder,
              @DInject(Injector) public readonly $injector: Injector,
              @DInject('widgetContext') public readonly ctx: WidgetContext) {
    this.ctx.$injector = $injector;
    this.ctx.date = $injector.get(DatePipe);
    this.ctx.http = $injector.get(HttpClient);
    this.ctx.sanitizer = $injector.get(DomSanitizer);
    this.ctx.router = $injector.get(Router);
    this.ctx.message = $injector.get(NzMessageService);

    this.ctx.$scope = this;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    
  }

}
