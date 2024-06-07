
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
    }
  }

}