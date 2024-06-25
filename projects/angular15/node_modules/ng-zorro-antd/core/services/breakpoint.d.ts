/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NzResizeService } from './resize';
import * as i0 from "@angular/core";
export declare enum NzBreakpointEnum {
    xxl = "xxl",
    xl = "xl",
    lg = "lg",
    md = "md",
    sm = "sm",
    xs = "xs"
}
export declare type BreakpointMap = {
    [key in NzBreakpointEnum]: string;
};
export declare type BreakpointBooleanMap = {
    [key in NzBreakpointEnum]: boolean;
};
export declare type NzBreakpointKey = keyof typeof NzBreakpointEnum;
export declare const gridResponsiveMap: BreakpointMap;
export declare const siderResponsiveMap: BreakpointMap;
export declare class NzBreakpointService implements OnDestroy {
    private resizeService;
    private mediaMatcher;
    private destroy$;
    constructor(resizeService: NzResizeService, mediaMatcher: MediaMatcher);
    ngOnDestroy(): void;
    subscribe(breakpointMap: BreakpointMap): Observable<NzBreakpointEnum>;
    subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
    private matchMedia;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzBreakpointService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzBreakpointService>;
}
