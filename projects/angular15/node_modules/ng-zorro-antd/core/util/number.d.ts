/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare function getPercent(min: number, max: number, value: number): number;
export declare function getPrecision(num: number): number;
export declare function ensureNumberInRange(num: number, min: number, max: number): number;
export declare function isNumberFinite(value: NzSafeAny): boolean;
export declare function toDecimal(value: number, decimal: number): number;
export declare function sum(input: number[], initial?: number): number;
