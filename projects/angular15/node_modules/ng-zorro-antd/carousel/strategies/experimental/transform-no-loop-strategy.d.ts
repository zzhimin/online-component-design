/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { NzCarouselContentDirective } from '../../carousel-content.directive';
import { NzCarouselComponentAsSource, PointerVector } from '../../typings';
import { NzCarouselBaseStrategy } from '../base-strategy';
interface NzCarouselTransformOnLoopStrategyOptions {
    direction: 'left' | 'right';
}
/**
 * this strategy is very much like NzCarouselTransformStrategy, but it doesn't loop between the first and the last one
 */
export declare class NzCarouselTransformNoLoopStrategy extends NzCarouselBaseStrategy<NzCarouselTransformOnLoopStrategyOptions> {
    private isTransitioning;
    private get vertical();
    constructor(carouselComponent: NzCarouselComponentAsSource, cdr: ChangeDetectorRef, renderer: Renderer2, platform: Platform, options?: NzCarouselTransformOnLoopStrategyOptions);
    dispose(): void;
    withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void;
    switch(_f: number, _t: number): Observable<void>;
    dragging(vector: PointerVector): void;
}
export {};
