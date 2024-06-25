import { BehaviorSubject, Subject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import * as i0 from "@angular/core";
export declare class MenuService {
    /** all descendant menu click **/
    descendantMenuItemClick$: Subject<any>;
    /** child menu item click **/
    childMenuItemClick$: Subject<any>;
    theme$: BehaviorSubject<NzMenuThemeType>;
    mode$: BehaviorSubject<NzMenuModeType>;
    inlineIndent$: BehaviorSubject<number>;
    isChildSubMenuOpen$: BehaviorSubject<boolean>;
    onDescendantMenuItemClick(menu: NzSafeAny): void;
    onChildMenuItemClick(menu: NzSafeAny): void;
    setMode(mode: NzMenuModeType): void;
    setTheme(theme: NzMenuThemeType): void;
    setInlineIndent(indent: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MenuService>;
}
