/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMNService } from './base';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageDataOptions, NzMessageRef } from './typings';
import * as i0 from "@angular/core";
export declare class NzMessageService extends NzMNService {
    protected container?: NzMessageContainerComponent;
    protected componentPrefix: string;
    constructor(nzSingletonService: NzSingletonService, overlay: Overlay, injector: Injector);
    success(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    error(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    info(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    warning(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    loading(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    create(type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string, content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageRef;
    private createInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzMessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzMessageService>;
}
