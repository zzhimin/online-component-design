/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface Point {
    x: number;
    y: number;
}
declare type Delta = Point;
/**
 * This module provide a global dragging service to other components.
 */
export declare class NzDragService {
    private draggingThreshold;
    private currentDraggingSequence;
    private currentStartingPoint;
    private handleRegistry;
    private renderer;
    constructor(rendererFactory2: RendererFactory2);
    requestDraggingSequence(event: MouseEvent | TouchEvent): Observable<Delta>;
    private registerDraggingHandler;
    private teardownDraggingSequence;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDragService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzDragService>;
}
export {};
