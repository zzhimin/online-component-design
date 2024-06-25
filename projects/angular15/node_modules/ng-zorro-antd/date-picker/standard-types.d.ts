/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
export declare type DisabledDateFn = (d: Date) => boolean;
export declare type DisabledTimePartial = 'start' | 'end';
export declare type NzDateMode = 'decade' | 'year' | 'month' | 'week' | 'date' | 'time';
export declare type RangePartType = 'left' | 'right';
export declare type CompatibleDate = Date | Date[];
export declare type DisabledTimeFn = (current: Date | Date[], partial?: DisabledTimePartial) => DisabledTimeConfig | undefined;
export interface DisabledTimeConfig {
    nzDisabledHours(): number[];
    nzDisabledMinutes(hour: number): number[];
    nzDisabledSeconds(hour: number, minute: number): number[];
}
export interface SupportTimeOptions {
    nzFormat?: string;
    nzHourStep?: number;
    nzMinuteStep?: number;
    nzSecondStep?: number;
    nzDisabledHours?(): number[];
    nzDisabledMinutes?(hour: number): number[];
    nzDisabledSeconds?(hour: number, minute: number): number[];
    nzHideDisabledOptions?: boolean;
    nzDefaultOpenValue?: Date;
    nzAddOn?: TemplateRef<void>;
    nzUse12Hours?: boolean;
}
export interface PresetRanges {
    [key: string]: Date[] | (() => Date[]);
}
