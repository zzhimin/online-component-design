/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { NzCarouselContentDirective } from '../carousel-content.directive';
import { NzCarouselComponentAsSource, PointerVector } from '../typings';
import { NzCarouselBaseStrategy } from './base-strategy';
interface NzCarouselTransformStrategyOptions {
    direction: 'left' | 'right';
}
export declare class NzCarouselTransformStrategy extends NzCarouselBaseStrategy<NzCarouselTransformStrategyOptions> {
    private isDragging;
    private isTransitioning;
    private get vertical();
    constructor(carouselComponent: NzCarouselComponentAsSource, cdr: ChangeDetectorRef, renderer: Renderer2, platform: Platform, options?: NzCarouselTransformStrategyOptions);
    dispose(): void;
    withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void;
    switch(_f: number, _t: number): Observable<void>;
    dragging(_vector: PointerVector): void;
    private verticalTransform;
    private horizontalTransform;
    private prepareVerticalContext;
    private prepareHorizontalContext;
}
export {};
