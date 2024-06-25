/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NzDestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDestroyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzDestroyService>;
}
