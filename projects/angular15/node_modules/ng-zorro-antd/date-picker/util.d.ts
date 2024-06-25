/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CandyDate } from 'ng-zorro-antd/core/time';
import { DisabledDateFn, DisabledTimeConfig, DisabledTimeFn } from './standard-types';
export declare const PREFIX_CLASS = "ant-picker";
export declare function getTimeConfig(value: CandyDate, disabledTime?: DisabledTimeFn): DisabledTimeConfig;
export declare function isTimeValidByConfig(value: CandyDate, disabledTimeConfig: DisabledTimeConfig): boolean;
export declare function isTimeValid(value: CandyDate, disabledTime: DisabledTimeFn): boolean;
export declare function isAllowedDate(value: CandyDate, disabledDate?: DisabledDateFn, disabledTime?: DisabledTimeFn): boolean;
