import { ComponentFactory, Inject, Injectable, Optional, Type } from '@angular/core';
import { Observable, ReplaySubject, Subject, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Widget } from './widget.model';
import { ComponentsModule } from '@app/components/components.module';
import { DynamicWidgetComponent } from '@app/core/dynamic-widget.component';
import { DynamicComponentFactoryService } from './dynamic-component-factory.service';

@Injectable({
  providedIn: 'root'
})
export class CustomComponentService {
  constructor(
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
  ) {

  }

  public getWidgetInfo(widget: Widget) {
    const widgetInfoSubject = new ReplaySubject<any>();

    this.loadWidget(widget, widgetInfoSubject);

    return widgetInfoSubject.asObservable();
  }

  private loadWidget(widget: Widget, widgetInfoSubject: Subject<any>) {
    const key = String(widget.id);
    let widgetControllerDescriptor: any = null;
    widgetControllerDescriptor = this.createWidgetControllerDescriptor(widget, key);
    // console.log("🚀 ~ widgetControllerDescriptor:", widgetControllerDescriptor)
    widget['widgetTypeFunction'] = widgetControllerDescriptor.widgetTypeFunction;
    const widgetNamespace = `widget-type-${key}`;
    this.loadWidgetResources(
      widget,
      widgetNamespace,
      [
        ComponentsModule,
        // ...    // module里可以注入任何需要的服务，指令，组件等
      ]
    ).subscribe(() => {
      if (widgetInfoSubject) {
        widgetInfoSubject.next(widget);
        widgetInfoSubject.complete();
      }
    })
  }

  private createWidgetControllerDescriptor(widget: Widget, name: string) {
    let widgetTypeFunctionBody = `return function _${name.replace(/-/g, '_')} (ctx) {\n` +
      '    var self = this;\n' +
      '    self.ctx = ctx;\n\n';

    widgetTypeFunctionBody += widget.javascriptTemplate;
    widgetTypeFunctionBody += '\n};\n';
    // console.log('widgetTypeFunctionBody >>:', widgetTypeFunctionBody);
    const widgetTypeFunction = new Function(widgetTypeFunctionBody);
    const widgetType = widgetTypeFunction.apply(this);
    const result = {
      widgetTypeFunction: widgetType
    };
    return result;
  }

  private loadWidgetResources(widgetInfo: any, widgetNamespace: string, modules?: Type<any>[]): Observable<any> {
    const resourceTasks: Observable<string>[] = [];

    let modulesObservable: any = of({ modules });

    resourceTasks.push(
      modulesObservable.pipe(
        mergeMap((resolvedModules: any) => {
          return this.dynamicComponentFactoryService.createDynamicComponentFactory(
            class DynamicWidgetComponentInstance extends DynamicWidgetComponent { },
            widgetInfo.templateHtml,
            resolvedModules.modules
          ).pipe(
            map((factory) => {
              widgetInfo.componentFactory = factory;
              return null;
            }),
            catchError(() => {
              const errorMessage = `Failed to compile widget html`;
              return of(errorMessage);
            })
          );
        }))
    );
    return forkJoin(resourceTasks).pipe(
      switchMap(msgs => {
        let errors: string[] = [];
        if (msgs && msgs.length) {
          errors = msgs.filter(msg => msg && msg.length > 0);
        }
        if (errors.length) {
          return throwError(() => errors);
        } else {
          return of(null);
        }
      })
    );
  }
}