/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzThMeasureDirective } from './cell/th-measure.directive';
import * as i0 from "@angular/core";
export declare class NzTableStyleService {
    theadTemplate$: ReplaySubject<TemplateRef<any>>;
    hasFixLeft$: ReplaySubject<boolean>;
    hasFixRight$: ReplaySubject<boolean>;
    hostWidth$: ReplaySubject<number>;
    columnCount$: ReplaySubject<number>;
    showEmpty$: ReplaySubject<boolean>;
    noResult$: ReplaySubject<string | TemplateRef<any> | undefined>;
    private listOfThWidthConfigPx$;
    private tableWidthConfigPx$;
    manualWidthConfigPx$: import("rxjs").Observable<readonly (string | null)[]>;
    private listOfAutoWidthPx$;
    listOfListOfThWidthPx$: import("rxjs").Observable<readonly (string | null)[]>;
    listOfMeasureColumn$: ReplaySubject<readonly string[]>;
    listOfListOfThWidth$: import("rxjs").Observable<number[]>;
    enableAutoMeasure$: ReplaySubject<boolean>;
    setTheadTemplate(template: TemplateRef<NzSafeAny>): void;
    setHasFixLeft(hasFixLeft: boolean): void;
    setHasFixRight(hasFixRight: boolean): void;
    setTableWidthConfig(widthConfig: ReadonlyArray<string | null>): void;
    setListOfTh(listOfTh: readonly NzThMeasureDirective[]): void;
    setListOfMeasureColumn(listOfTh: readonly NzThMeasureDirective[]): void;
    setListOfAutoWidth(listOfAutoWidth: number[]): void;
    setShowEmpty(showEmpty: boolean): void;
    setNoResult(noResult: string | TemplateRef<NzSafeAny> | undefined): void;
    setScroll(scrollX: string | null, scrollY: string | null): void;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableStyleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzTableStyleService>;
}
