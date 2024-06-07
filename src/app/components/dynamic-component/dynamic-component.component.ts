import { Component, OnInit, Input, ViewChild, ViewContainerRef, ElementRef, ComponentRef, ChangeDetectorRef, Injector, OnDestroy } from '@angular/core';
import cssjs from '@app/core/css/css';
import { CustomComponentService } from "@app/core/custom-component.service";
import { Widget } from '@app/core/widget.model';
import { WidgetContext } from './custom-widget.models';

@Component({
  selector: 'dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.less'],
})
export class DynamicComponentComponent implements OnInit, OnDestroy {
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true }) widgetContentContainer: ViewContainerRef;

  @Input() 
  get widget() {
    return this._widget;
  }
  set widget(data) {
    if (data) {
      this._widget = data;
      this.init();
    }
  }
  _widget: Widget;

  widgetInfo: any;
  widgetType: any;
  widgetTypeInstance: any;
  widgetContext: any = {};

  dynamicWidgetComponentRef: ComponentRef<any> | null;
  dynamicWidgetComponent: any;

  private cssParser = new cssjs();
  constructor(
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private customComponentService: CustomComponentService,
  ) {
    this.cssParser.testMode = false;
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.widgetTypeInstance && this.widgetTypeInstance.onDestroy();
  }

  init() {
    this.customComponentService.getWidgetInfo(this.widget).subscribe({
      next: (widgetInfo) => {
        console.log('widgetInfo >>:', widgetInfo);
        this.widgetInfo = widgetInfo;
        this.widgetContext = new WidgetContext(this.widgetInfo);
        this.loadFromWidgetInfo();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  private loadFromWidgetInfo() {
    this.widgetContext.widgetNamespace = `widget-type-${this.widget.id}`;
    const elem = this.elementRef.nativeElement;
    elem.classList.add('custom-widget');
    elem.classList.add(this.widgetContext.widgetNamespace);
    this.widgetType = this.widgetInfo.widgetTypeFunction;

    if (!this.widgetType) {
      this.widgetTypeInstance = {};
    } else {
      try {
        this.widgetTypeInstance = new this.widgetType(this.widgetContext);
      } catch (e) {
        this.widgetTypeInstance = {};
      }
    }
    console.log('this.widgetTypeInstance >>:', this.widgetTypeInstance);
    if (!this.widgetTypeInstance.onInit) {
      this.widgetTypeInstance.onInit = () => { };
    }
    if (!this.widgetTypeInstance.onDestroy) {
      this.widgetTypeInstance.onDestroy = () => { };
    }

    this.configureDynamicWidgetComponent();
    this.widgetTypeInstance.onInit();
  }

  private configureDynamicWidgetComponent() {
    this.widgetContentContainer.clear();
    const injector: Injector = Injector.create(
      {
        providers: [
          {
            provide: 'widgetContext',
            useValue: this.widgetContext
          },
        ],
        parent: this.injector
      }
    );

    this.widgetContext.$containerParent = this.elementRef.nativeElement.querySelector('#custom-widget-container');

    try {
      this.dynamicWidgetComponentRef = this.widgetContentContainer.createComponent(this.widgetInfo.componentFactory, 0, injector);
      this.cd.detectChanges();
    } catch (e) {
      console.error(e);
      if (this.dynamicWidgetComponentRef) {
        this.dynamicWidgetComponentRef.destroy();
        this.dynamicWidgetComponentRef = null;
      }
      this.widgetContentContainer.clear();
    }

    if (this.dynamicWidgetComponentRef) {
      this.dynamicWidgetComponent = this.dynamicWidgetComponentRef.instance;
      console.log("🚀 ~ this.dynamicWidgetComponent:", this.dynamicWidgetComponent)
      // this.widgetContext.$container = this.dynamicWidgetComponentRef.location.nativeElement;
      // this.widgetContext.ctx.$containerParent.css('display', 'block');
      // this.widgetContext.ctx.$containerParent.attr('id', 'container');
      // this.widgetContext.ctx.$containerParent.css('height', '100%');
      // this.widgetContext.ctx.$containerParent.css('width', '100%');
      this.parserCss();
    }
  }

  private parserCss() {
    const namespace = `${this.widgetInfo.widgetName}-${Math.random()}`;
    const customCss = this.widgetInfo.templateCss;
    this.cssParser.cssPreviewNamespace = namespace;
    // this.cssParser.createStyleElement(namespace, customCss, 'nonamespace');
  }


}
