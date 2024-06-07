import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { AnchorComponent } from "./anchor/anchor.component";
import { CodeEditorComponent } from "./code-editor/code-editor.component";

import { DynamicComponentComponent } from "./dynamic-component/dynamic-component.component";

const components: any = [
  AnchorComponent,
  CodeEditorComponent,
  DynamicComponentComponent,
];

@NgModule({
  providers: [
    DatePipe,
  ],
  declarations: components,
  imports: [
    CommonModule,
  ],
  exports: components,
})
export class ComponentsModule {}
