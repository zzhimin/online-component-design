import { ModuleWithProviders } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import * as i0 from "@angular/core";
import * as i1 from "./icon.directive";
import * as i2 from "@angular/cdk/platform";
export declare class NzIconModule {
    static forRoot(icons: IconDefinition[]): ModuleWithProviders<NzIconModule>;
    static forChild(icons: IconDefinition[]): ModuleWithProviders<NzIconModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzIconModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NzIconModule, [typeof i1.NzIconDirective], [typeof i2.PlatformModule], [typeof i1.NzIconDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NzIconModule>;
}
