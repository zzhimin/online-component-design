/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewComponent } from './image-preview.component';
export declare class NzImagePreviewRef {
    previewInstance: NzImagePreviewComponent;
    private config;
    private overlayRef;
    private destroy$;
    constructor(previewInstance: NzImagePreviewComponent, config: NzImagePreviewOptions, overlayRef: OverlayRef);
    switchTo(index: number): void;
    next(): void;
    prev(): void;
    close(): void;
    private dispose;
}
