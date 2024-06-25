/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzProgressColorGradient, NzProgressGradientProgress } from './typings';
export declare const sortGradient: (gradients: NzProgressGradientProgress) => Array<{
    key: number;
    value: string;
}>;
export declare const handleCircleGradient: (strokeColor: NzProgressGradientProgress) => Array<{
    offset: string;
    color: string;
}>;
export declare const handleLinearGradient: (strokeColor: NzProgressColorGradient) => string;
