/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzZoomTransform } from '../interface';
/**
 * Calculate position and scale
 *
 * @param containerEle
 * @param targetEle
 * @param scale: if scale is set, skip calculate scale value
 */
export declare const calculateTransform: (containerEle: SVGSVGElement, targetEle: SVGGElement, scale?: number) => NzZoomTransform | null;
