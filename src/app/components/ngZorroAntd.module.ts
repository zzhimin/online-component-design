import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NzMessageService } from "ng-zorro-antd/message";

import { NzButtonModule } from "ng-zorro-antd/button";
import { IconDefinition } from "@ant-design/icons-angular";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from "ng-zorro-antd/grid";
import * as AllIcons from "@ant-design/icons-angular/icons";
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
export const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

const ngZorroAntdModule: any = [
  NzButtonModule,
  NzIconModule.forRoot(icons),
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzFormModule,
  NzGridModule,
  NzInputNumberModule,
  NzCardModule,
  NzMessageModule,
  NzEmptyModule,
  NzResizableModule,
];

@NgModule({
  providers: [NzMessageService],
  declarations: [],
  imports: [
    CommonModule,
    // @ts-ignore
    ...ngZorroAntdModule,
  ],
  exports: [...ngZorroAntdModule],
})
export class NgZorroAntdModule { }
