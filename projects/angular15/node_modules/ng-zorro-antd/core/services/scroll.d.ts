import { NgZone } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare type EasyingFn = (t: number, b: number, c: number, d: number) => number;
export interface NzScrollToOptions {
    /** Scroll container, default as window */
    easing?: EasyingFn;
    /** Scroll end callback */
    callback?(): void;
    /** Animation duration, default as 450 */
    duration?: number;
}
export declare class NzScrollService {
    private ngZone;
    private doc;
    constructor(ngZone: NgZone, doc: NzSafeAny);
    /** Set the position of the scroll bar of `el`. */
    setScrollTop(el: Element | Window, topValue?: number): void;
    /** Get position of `el` against window. */
    getOffset(el: Element): {
        top: number;
        left: number;
    };
    /** Get the position of the scoll bar of `el`. */
    getScroll(target?: Element | HTMLElement | Window | Document | null, top?: boolean): number;
    isWindow(obj: NzSafeAny): boolean;
    /**
     * Scroll `el` to some position with animation.
     *
     * @param containerEl container, `window` by default
     * @param y Scroll to `top`, 0 by default
     */
    scrollTo(containerEl?: Element | HTMLElement | Window | Document | null, y?: number, options?: NzScrollToOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzScrollService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzScrollService>;
}
