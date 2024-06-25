/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { NzCarouselContentDirective } from '../../carousel-content.directive';
import { NzCarouselBaseStrategy } from '../base-strategy';
export declare class NzCarouselFlipStrategy extends NzCarouselBaseStrategy {
    withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void;
    switch(rawF: number, rawT: number): Observable<void>;
    dispose(): void;
}
