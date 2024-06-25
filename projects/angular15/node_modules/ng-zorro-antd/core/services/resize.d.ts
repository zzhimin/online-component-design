/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgZone, OnDestroy, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NzResizeService implements OnDestroy {
    private ngZone;
    private rendererFactory2;
    private readonly resizeSource$;
    private listeners;
    private renderer;
    private disposeHandle;
    private handler;
    constructor(ngZone: NgZone, rendererFactory2: RendererFactory2);
    ngOnDestroy(): void;
    subscribe(): Observable<void>;
    unsubscribe(): void;
    private registerListener;
    private unregisterListener;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzResizeService>;
}
