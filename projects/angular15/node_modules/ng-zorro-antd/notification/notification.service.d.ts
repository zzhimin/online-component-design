/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMNService } from 'ng-zorro-antd/message';
import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationDataOptions, NzNotificationRef } from './typings';
import * as i0 from "@angular/core";
export declare class NzNotificationService extends NzMNService {
    protected container: NzNotificationContainerComponent;
    protected componentPrefix: string;
    constructor(nzSingletonService: NzSingletonService, overlay: Overlay, injector: Injector);
    success(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    error(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    info(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    warning(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    blank(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    create(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef;
    template(template: TemplateRef<{}>, options?: NzNotificationDataOptions): NzNotificationRef;
    protected generateMessageId(): string;
    private createInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzNotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzNotificationService>;
}
