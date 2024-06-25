import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { CodeEditorComponent } from "@app/components/code-editor/code-editor.component";
import { NzMessageService } from 'ng-zorro-antd/message';
import { Widget } from '@app/core/widget.model';
import { WidgetService } from '@app/core/widget.service';

@Component({
  selector: 'online-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.less']
})
export class OnlineDesignComponent implements OnInit {
  @ViewChild("htmlEditor", { static: true }) htmlEditor!: CodeEditorComponent;
  @ViewChild("javascriptEditor", { static: true }) javascriptEditor!: CodeEditorComponent;
  @ViewChild("cssEditor", { static: true }) cssEditor!: CodeEditorComponent;
  @ViewChild("jsonEditor", { static: true }) jsonEditor!: CodeEditorComponent;

  contentWidth = 980;
  caf = -1;

  contentLeftHeight = 300;
  contentRightHeight = 500;

  widget: Widget;
  constructor(private route: ActivatedRoute,
    private message: NzMessageService,
    private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        const widget = this.widgetService.getWidget(params['id']);
        if (widget) {
          console.log("🚀 ~ widget:", widget)
          this.widget = widget;
        }
      } else {
        const widgetId = new Date().getTime()
        this.widget = {
          id: widgetId,
          createTime: widgetId,
          htmlTemplate: '',
          cssTemplate: '',
          javascriptTemplate: '',
          settings: ''
        }
      }
    });
  }

  onContentResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.caf);
    this.caf = requestAnimationFrame(() => {
      this.contentWidth = width!;
    });
  }

  onContentLeftResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.caf);
    this.caf = requestAnimationFrame(() => {
      this.contentLeftHeight = height!;
    });
  }

  onContentRightResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.caf);
    this.caf = requestAnimationFrame(() => {
      this.contentRightHeight = height!;
    });
  }

  save() {
    this.widget = {
      ...this.widget,
      htmlTemplate: this.htmlEditor.inputValue,
      cssTemplate: this.cssEditor.inputValue,
      javascriptTemplate: this.javascriptEditor.inputValue,
      settings: this.jsonEditor.inputValue,
    }
    this.widgetService.saveWidget(this.widget);
    this.message.success('保存成功')
  }

  preview() {

  }
}
