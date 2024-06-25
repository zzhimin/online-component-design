/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions, NzDrawerOptionsOfComponent } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
import * as i0 from "@angular/core";
export declare class DrawerBuilderForService<T extends {}, R> {
    private overlay;
    private options;
    private drawerRef;
    private overlayRef;
    private unsubscribe$;
    constructor(overlay: Overlay, options: NzDrawerOptions);
    getInstance(): NzDrawerRef<T, R>;
    updateOptions(options: NzDrawerOptionsOfComponent): void;
}
export declare class NzDrawerService {
    private overlay;
    constructor(overlay: Overlay);
    create<T extends {} = NzSafeAny, D = undefined, R = NzSafeAny>(options: NzDrawerOptions<T, D extends undefined ? {} : D>): NzDrawerRef<T, R>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDrawerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzDrawerService>;
}
