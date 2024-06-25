/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export interface TimeResult {
    hour: number | null;
    minute: number | null;
    second: number | null;
    period: number | null;
}
export declare class NgTimeParser {
    private format;
    private localeId;
    regex: RegExp;
    matchMap: {
        [key: string]: null | number;
    };
    constructor(format: string, localeId: string);
    toDate(str: string): Date;
    getTimeResult(str: string): TimeResult | null;
    genRegexp(): void;
}
