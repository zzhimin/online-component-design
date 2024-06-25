/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export interface SimpleRect {
    top: number;
    left: number;
    width?: number;
    height?: number;
    bottom?: number;
}
export declare function isTargetWindow(target: Element | Window): target is Window;
export declare function getTargetRect(target: Element | Window): SimpleRect;
