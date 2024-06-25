/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FunctionProp, NzSafeAny } from 'ng-zorro-antd/core/types';
export declare function toBoolean(value: boolean | string): boolean;
export declare function toNumber(value: number | string): number;
export declare function toNumber<D>(value: number | string, fallback: D): number | D;
export declare function toCssPixel(value: number | string): string;
/**
 * Get the function-property type's value
 */
export declare function valueFunctionProp<T>(prop: FunctionProp<T> | T, ...args: NzSafeAny[]): T;
/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using @InputBoolean alone without @Input? AOT needs @Input to be visible
 *
 * @howToUse
 * ```
 * @Input() @InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // @Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
export declare function InputBoolean(): NzSafeAny;
export declare function InputCssPixel(): NzSafeAny;
export declare function InputNumber(fallbackValue?: NzSafeAny): NzSafeAny;
