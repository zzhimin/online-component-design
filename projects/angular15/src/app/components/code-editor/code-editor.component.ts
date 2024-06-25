import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Ace } from 'ace-builds';
import { getAce } from "../../core/ace.models";


@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.less']
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  @ViewChild('codeEditInput', {static: true})
  codeEditInputElmRef!: ElementRef;

  editor!: Ace.Editor;

  @Input() content: any = '';

  @Input() mode: string = 'javascript';

  get inputValue() {
    return this.editor.getValue();
  }

  constructor() { }

  ngOnInit(): void {
    this.createEditor(this.codeEditInputElmRef, this.content);
  }
  ngOnDestroy(): void {
  }

  createEditor(editorElementRef: ElementRef, content: string | undefined): void {
    const editorElement = editorElementRef.nativeElement;
    let editorOptions: Partial<Ace.EditorOptions> = {
      mode: `ace/mode/${this.mode}`,
      // theme: 'ace/theme/github',
      fontSize: 16, // 编辑器内字体大小
      showGutter: true,
      showPrintMargin: false,
    };

    const advancedOptions = {
      enableSnippets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    };

    editorOptions = {...editorOptions, ...advancedOptions};
    getAce().subscribe(
      (ace) => {
        this.editor = ace.edit(editorElement, editorOptions);
        this.editor.session.setUseWrapMode(true);
        if(content) this.editor.setValue(content, -1);
      }
    );
  }
}
