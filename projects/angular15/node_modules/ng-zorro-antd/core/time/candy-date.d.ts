/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { IndexableObject } from 'ng-zorro-antd/core/types';
export declare type CandyDateMode = 'decade' | 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export declare type NormalizedMode = 'decade' | 'year' | 'month';
export declare type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare type CandyDateType = CandyDate | Date | null;
export declare type SingleValue = CandyDate | null;
export declare type CompatibleValue = SingleValue | SingleValue[];
export declare function wrongSortOrder(rangeValue: SingleValue[]): boolean;
export declare function normalizeRangeValue(value: SingleValue[], hasTimePicker: boolean, type?: NormalizedMode, activePart?: 'left' | 'right'): CandyDate[];
export declare function cloneDate(value: CompatibleValue): CompatibleValue;
/**
 * Wrapping kind APIs for date operating and unify
 * NOTE: every new API return new CandyDate object without side effects to the former Date object
 * NOTE: most APIs are based on local time other than customized locale id (this needs tobe support in future)
 * TODO: support format() against to angular's core API
 */
export declare class CandyDate implements IndexableObject {
    nativeDate: Date;
    constructor(date?: Date | string | number);
    calendarStart(options?: {
        weekStartsOn: WeekDayIndex | undefined;
    }): CandyDate;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getTime(): number;
    getDate(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;
    clone(): CandyDate;
    setHms(hour: number, minute: number, second: number): CandyDate;
    setYear(year: number): CandyDate;
    addYears(amount: number): CandyDate;
    setMonth(month: number): CandyDate;
    addMonths(amount: number): CandyDate;
    setDay(day: number, options?: {
        weekStartsOn: WeekDayIndex;
    }): CandyDate;
    setDate(amount: number): CandyDate;
    addDays(amount: number): CandyDate;
    add(amount: number, mode: NormalizedMode): CandyDate;
    isSame(date: CandyDateType, grain?: CandyDateMode): boolean;
    isSameYear(date: CandyDateType): boolean;
    isSameMonth(date: CandyDateType): boolean;
    isSameDay(date: CandyDateType): boolean;
    isSameHour(date: CandyDateType): boolean;
    isSameMinute(date: CandyDateType): boolean;
    isSameSecond(date: CandyDateType): boolean;
    isBefore(date: CandyDateType, grain?: CandyDateMode): boolean;
    isBeforeYear(date: CandyDateType): boolean;
    isBeforeMonth(date: CandyDateType): boolean;
    isBeforeDay(date: CandyDateType): boolean;
    isToday(): boolean;
    isValid(): boolean;
    isFirstDayOfMonth(): boolean;
    isLastDayOfMonth(): boolean;
    private toNativeDate;
}
