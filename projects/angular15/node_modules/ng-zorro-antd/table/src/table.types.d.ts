/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare type NzTableLayout = 'fixed' | 'auto';
export declare type NzTablePaginationPosition = 'top' | 'bottom' | 'both';
export declare type NzTablePaginationType = 'default' | 'small';
export declare type NzTableSize = 'middle' | 'default' | 'small';
export declare type NzTableFilterList = Array<{
    text: string;
    value: NzSafeAny;
    byDefault?: boolean;
}>;
export declare type NzTableSortOrder = string | 'ascend' | 'descend' | null;
export declare type NzTableSortFn<T = unknown> = (a: T, b: T, sortOrder?: NzTableSortOrder) => number;
export declare type NzTableFilterValue = NzSafeAny[] | NzSafeAny;
export declare type NzTableFilterFn<T = unknown> = (value: NzTableFilterValue, data: T) => boolean;
export interface NzTableQueryParams {
    pageIndex: number;
    pageSize: number;
    sort: Array<{
        key: string;
        value: NzTableSortOrder;
    }>;
    filter: Array<{
        key: string;
        value: NzTableFilterValue;
    }>;
}
