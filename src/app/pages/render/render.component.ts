import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Settings, Widget } from '@app/core/widget.model';
import { CodeEditorComponent } from "@app/components/code-editor/code-editor.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { WidgetService } from '@app/core/widget.service';

@Component({
  selector: 'online-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.less']
})
export class OnlineRenderComponent implements OnInit {
  @ViewChild("jsonEditor") jsonEditor!: CodeEditorComponent;
  widgets: Array<Widget> = [];

  isVisible = false;
  isVisible2 = false;

  widget: Widget;
  constructor(private router: Router,
    private widgetService: WidgetService,
    private message: NzMessageService) {

  }

  ngOnInit(): void {
    const widgets = this.widgetService.getAll();
    if (widgets) this.widgets = widgets;
  }
  getName(widget: Widget) {
    const settings = JSON.parse(widget.settings) as Settings;
    return settings.name;
  }

  setting(widget: Widget) {
    this.widget = widget;
    this.isVisible = true;
  }

  edit(widget: Widget) {
    this.router.navigate(['/design'], {
      queryParams: { id: widget.id }
    });
  }

  preview(widget: Widget) {
    this.widget = widget;
    this.isVisible2 = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.widget = {
      ...this.widget,
      settings: this.jsonEditor.inputValue as any
    }
    this.widgetService.saveWidget(this.widget);
    const widgets = this.widgetService.getAll();
    if (widgets) this.widgets = widgets;
    this.message.success('修改成功');
  }
  handleOk2(): void {
    this.isVisible2 = false;
  }
}
