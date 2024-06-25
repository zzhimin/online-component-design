/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare type NzTabPosition = 'top' | 'bottom' | 'left' | 'right';
export declare type NzTabType = 'line' | 'card' | 'editable-card';
export declare type NzTabsCanDeactivateFn = (fromIndex: number, toIndex: number) => Observable<boolean> | Promise<boolean> | boolean;
export declare type NzTabPositionMode = 'horizontal' | 'vertical';
export interface NzAnimatedInterface {
    inkBar: boolean;
    tabPane: boolean;
}
export declare class NzTabChangeEvent {
    index?: number;
    tab: NzSafeAny;
}
export interface NzTabScrollListOffset {
    x: number;
    y: number;
}
export declare type NzTabScrollListOffsetEvent = NzTabScrollListOffset & {
    event: Event;
};
interface NzTabWheelScrollEvent {
    type: 'wheel';
    event: WheelEvent;
}
interface NzTabTouchScrollEvent {
    type: 'touchstart' | 'touchmove' | 'touchend';
    event: TouchEvent;
}
export declare type NzTabScrollEvent = NzTabTouchScrollEvent | NzTabWheelScrollEvent;
export declare type NzTabScrollEventHandlerFun<T extends NzTabScrollEvent['event']> = (event: T) => void;
export interface TabTemplateContext {
    visible: boolean;
}
export {};
