
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Widget } from './widget.model';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {


  constructor(
  ) { }

  saveWidget(widget: Widget | undefined) {
    if (!widget) return;
    const widgetsStr = localStorage.getItem('widgets');
    if (widgetsStr) {
      const widgets: Widget[] = JSON.parse(widgetsStr);
      const ids = widgets.findIndex((item: { id: any; }) => item.id == widget.id)
      if (ids > -1) {
        widgets.splice(ids, 1, widget);
      } else {
        widgets.push(widget)
      }
      localStorage.setItem('widgets', JSON.stringify(widgets))
    } else {
      localStorage.setItem('widgets', JSON.stringify([widget]))
    }

  }

  getWidget(id: number | string) {
    const widgetsStr = localStorage.getItem('widgets');
    if (widgetsStr) {
      const widgets: Array<Widget> = JSON.parse(widgetsStr);
      const widget = widgets.find(item => item.id == id)
      if (widget) {
        return widget;
      }
    }
  }

  getAll() {
    const widgetsStr = localStorage.getItem('widgets');
    if (widgetsStr) {
      const widgets: Array<Widget> = JSON.parse(widgetsStr);
      if (widgets) {
        return widgets;
      }
    } else {
      const defaultWidget = {
        "id": 1717648108067,
        "createTime": 1717648108067,
        "htmlTemplate": "<!--也可以进行内置组件的二次编辑开发-->\n<comp-temp></comp-temp>\n\n<div class=\"test\" (click)=\"handleClick()\">{{ test || '默认值' }}</div>\n",
        "cssTemplate": ".test {\n    color: red;\n    font-size: 18px;\n}",
        "javascriptTemplate": "function text(){\n    console.log(123)\n}\n\nself.onInit = function() {\n    console.log('组件上下文>>', self.ctx)\n    \n    self.ctx.$scope.handleClick = function() {\n        self.ctx.message.success('我被点击了')\n    }\n    \n    // 这里可以拿到settings的数据，用于组件在实例化时表现为不同的行为\n    const settings = self.ctx.settings;\n    // 将settings数据绑定到组件上供模板使用\n    self.ctx.$scope.test = settings.test;\n}",
        "settings": "{\n    \"name\": \"示例组件1\",\n    \"test\": \"修改此值可以让组件在实例化的过程中表现不同的行为~~\"\n}"
      }
      const widgets = [defaultWidget];
      localStorage.setItem('widgets', JSON.stringify(widgets))
      return [defaultWidget];
    }
  }

}