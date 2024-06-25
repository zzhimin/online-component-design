/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { MarkStyleCanvasType } from './typings';
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export declare function getPixelRatio(): number;
export declare function toLowercaseSeparator(key: keyof MarkStyleCanvasType): string;
export declare function getStyleStr(style: MarkStyleCanvasType): string;
/** Whether to re-render the watermark */
export declare function reRendering(mutation: MutationRecord, watermarkElement?: HTMLElement): boolean;
/** Rotate with the watermark as the center point */
export declare function rotateWatermark(ctx: CanvasRenderingContext2D, rotateX: number, rotateY: number, rotate: number): void;
