/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Observable } from 'rxjs';
export declare class TimeHolder {
    selected12Hours: string | undefined;
    private _value;
    private _use12Hours;
    private _defaultOpenValue;
    private _changes;
    setMinutes(value: number, disabled: boolean): this;
    setHours(value: number, disabled: boolean): this;
    setSeconds(value: number, disabled: boolean): this;
    setUse12Hours(value: boolean): this;
    get changes(): Observable<Date>;
    setValue(value: Date | undefined, use12Hours?: boolean): this;
    initValue(): void;
    clear(): void;
    get isEmpty(): boolean;
    private _clear;
    private update;
    changed(): void;
    /**
     * @description
     * UI view hours
     * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
     */
    get viewHours(): number | undefined;
    setSelected12Hours(value: string | undefined): void;
    get value(): Date;
    get hours(): number | undefined;
    get minutes(): number | undefined;
    get seconds(): number | undefined;
    setDefaultOpenValue(value: Date): this;
    constructor();
    private calculateViewHour;
}
