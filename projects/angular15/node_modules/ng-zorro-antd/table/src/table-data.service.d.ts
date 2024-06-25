/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzTableFilterFn, NzTableFilterValue, NzTableQueryParams, NzTableSortFn, NzTableSortOrder } from './table.types';
import * as i0 from "@angular/core";
export declare class NzTableDataService<T> implements OnDestroy {
    private destroy$;
    private pageIndex$;
    private frontPagination$;
    private pageSize$;
    private listOfData$;
    pageIndexDistinct$: Observable<number>;
    pageSizeDistinct$: Observable<number>;
    listOfCalcOperator$: BehaviorSubject<{
        key?: string | undefined;
        sortFn: NzTableSortFn<T> | null | boolean;
        sortOrder: NzTableSortOrder;
        filterFn: NzTableFilterFn<T> | null | boolean;
        filterValue: NzTableFilterValue;
        sortPriority: number | boolean;
    }[]>;
    queryParams$: Observable<NzTableQueryParams>;
    private listOfDataAfterCalc$;
    private listOfFrontEndCurrentPageData$;
    listOfCurrentPageData$: Observable<T[]>;
    total$: Observable<number>;
    updatePageSize(size: number): void;
    updateFrontPagination(pagination: boolean): void;
    updatePageIndex(index: number): void;
    updateListOfData(list: readonly T[]): void;
    constructor();
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableDataService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzTableDataService<any>>;
}
