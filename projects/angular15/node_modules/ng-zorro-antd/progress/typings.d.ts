/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
export declare type NzProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';
export declare type NzProgressStatusType = 'success' | 'exception' | 'active' | 'normal';
export declare type NzProgressTypeType = 'line' | 'circle' | 'dashboard';
export declare type NzProgressStrokeLinecapType = 'round' | 'square';
export interface NzProgressGradientProgress {
    [percent: string]: string;
}
export interface NzProgressGradientFromTo {
    from: string;
    to: string;
}
export declare type NzProgressColorGradient = {
    direction?: string;
} & (NzProgressGradientProgress | NzProgressGradientFromTo);
export declare type NzProgressStrokeColorType = string | NzProgressColorGradient;
export declare type NzProgressFormatter = ((percent: number) => string | null) | TemplateRef<{
    $implicit: number;
}>;
export interface NzProgressCirclePath {
    stroke: string | null;
    strokePathStyle: NgStyleInterface;
}
export interface NzProgressStepItem {
    backgroundColor: string;
    width: string;
    height: string;
}
