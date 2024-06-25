/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgZone } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare class NzWaveRenderer {
    private triggerElement;
    private ngZone;
    private insertExtraNode;
    private platformId;
    private waveTransitionDuration;
    private styleForPseudo;
    private extraNode;
    private lastTime;
    private platform;
    clickHandler: (event: MouseEvent) => void;
    get waveAttributeName(): string;
    constructor(triggerElement: HTMLElement, ngZone: NgZone, insertExtraNode: boolean, platformId: NzSafeAny);
    onClick: (event: MouseEvent) => void;
    bindTriggerEvent(): void;
    removeTriggerEvent(): void;
    removeStyleAndExtraNode(): void;
    destroy(): void;
    private fadeOutWave;
    private isValidColor;
    private isNotGrey;
    private getWaveColor;
    private runTimeoutOutsideZone;
}
