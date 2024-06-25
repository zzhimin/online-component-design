import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { JoinedEditorOptions } from './typings';
import * as i0 from "@angular/core";
export declare class NzCodeEditorService implements OnDestroy {
    private readonly nzConfigService;
    private document;
    private firstEditorInitialized;
    private option;
    private config;
    private subscription;
    option$: BehaviorSubject<JoinedEditorOptions>;
    constructor(nzConfigService: NzConfigService, _document: NzSafeAny);
    ngOnDestroy(): void;
    private _updateDefaultOption;
    requestToInit(): Observable<JoinedEditorOptions>;
    private loadMonacoScript;
    private onLoad;
    private onInit;
    private getLatestOption;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCodeEditorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzCodeEditorService>;
}
