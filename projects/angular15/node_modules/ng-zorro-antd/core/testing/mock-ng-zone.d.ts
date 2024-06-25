/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, NgZone } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 *
 * @docs-private
 */
export declare class MockNgZone extends NgZone {
    onStable: EventEmitter<NzSafeAny>;
    constructor();
    run(fn: Function): NzSafeAny;
    runOutsideAngular(fn: Function): NzSafeAny;
    simulateZoneExit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockNgZone, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockNgZone>;
}
