/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseModalContainerComponent } from './modal-container.directive';
import { NzModalLegacyAPI } from './modal-legacy-api';
import { ModalOptions } from './modal-types';
export declare const enum NzModalState {
    OPEN = 0,
    CLOSING = 1,
    CLOSED = 2
}
export declare const enum NzTriggerAction {
    CANCEL = "cancel",
    OK = "ok"
}
export declare class NzModalRef<T = NzSafeAny, R = NzSafeAny> implements NzModalLegacyAPI<T, R> {
    private overlayRef;
    private config;
    containerInstance: BaseModalContainerComponent;
    componentInstance: T | null;
    result?: R;
    state: NzModalState;
    afterClose: Subject<R>;
    afterOpen: Subject<void>;
    private closeTimeout?;
    private destroy$;
    constructor(overlayRef: OverlayRef, config: ModalOptions, containerInstance: BaseModalContainerComponent);
    getContentComponent(): T;
    getElement(): HTMLElement;
    destroy(result?: R): void;
    triggerOk(): Promise<void>;
    triggerCancel(): Promise<void>;
    close(result?: R): void;
    updateConfig(config: ModalOptions): void;
    getState(): NzModalState;
    getConfig(): ModalOptions;
    getBackdropElement(): HTMLElement | null;
    private trigger;
    private closeWhitResult;
    _finishDialogClose(): void;
}
