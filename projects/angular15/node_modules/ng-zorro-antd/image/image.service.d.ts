/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import * as i0 from "@angular/core";
export interface NzImageService {
    preview(images: NzImage[], option?: NzImagePreviewOptions): NzImagePreviewRef;
}
export declare class NzImageService {
    private overlay;
    private injector;
    private nzConfigService;
    private directionality;
    constructor(overlay: Overlay, injector: Injector, nzConfigService: NzConfigService, directionality: Directionality);
    private display;
    private attachPreviewComponent;
    private createOverlay;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzImageService, [null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzImageService>;
}
