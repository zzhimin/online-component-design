/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { Injector, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from './modal-ref';
import { ConfirmType, ModalOptions } from './modal-types';
import * as i0 from "@angular/core";
export declare class NzModalService implements OnDestroy {
    private overlay;
    private injector;
    private nzConfigService;
    private parentModal;
    private directionality;
    private openModalsAtThisLevel;
    private readonly afterAllClosedAtThisLevel;
    get openModals(): NzModalRef[];
    get _afterAllClosed(): Subject<void>;
    readonly afterAllClose: Observable<void>;
    constructor(overlay: Overlay, injector: Injector, nzConfigService: NzConfigService, parentModal: NzModalService, directionality: Directionality);
    create<T, D = NzSafeAny, R = NzSafeAny>(config: ModalOptions<T, D, R>): NzModalRef<T, R>;
    closeAll(): void;
    confirm<T>(options?: ModalOptions<T>, confirmType?: ConfirmType): NzModalRef<T>;
    info<T>(options?: ModalOptions<T>): NzModalRef<T>;
    success<T>(options?: ModalOptions<T>): NzModalRef<T>;
    error<T>(options?: ModalOptions<T>): NzModalRef<T>;
    warning<T>(options?: ModalOptions<T>): NzModalRef<T>;
    private open;
    private removeOpenModal;
    private closeModals;
    private createOverlay;
    private attachModalContainer;
    private attachModalContent;
    private createInjector;
    private confirmFactory;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzModalService, [null, null, null, { optional: true; skipSelf: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzModalService>;
}
