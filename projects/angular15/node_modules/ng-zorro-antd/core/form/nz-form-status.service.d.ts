import { ReplaySubject } from 'rxjs';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzFormStatusService {
    formStatusChanges: ReplaySubject<{
        status: NzValidateStatus;
        hasFeedback: boolean;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzFormStatusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzFormStatusService>;
}
