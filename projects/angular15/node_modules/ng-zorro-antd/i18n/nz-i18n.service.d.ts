import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { DateLocale, NzI18nInterface } from './nz-i18n.interface';
import * as i0 from "@angular/core";
export declare class NzI18nService {
    private _locale;
    private _change;
    private dateLocale;
    get localeChange(): Observable<NzI18nInterface>;
    constructor(locale: NzI18nInterface, dateLocale: DateLocale);
    translate(path: string, data?: NzSafeAny): string;
    /**
     * Set/Change current locale globally throughout the WHOLE application
     * NOTE: If called at runtime, rendered interface may not change along with the locale change,
     * because this do not trigger another render schedule.
     *
     * @param locale The translating letters
     */
    setLocale(locale: NzI18nInterface): void;
    getLocale(): NzI18nInterface;
    getLocaleId(): string;
    setDateLocale(dateLocale: DateLocale): void;
    getDateLocale(): DateLocale;
    /**
     * Get locale data
     *
     * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
     * @param defaultValue default value if the result is not "truthy"
     */
    getLocaleData(path: string, defaultValue?: NzSafeAny): NzSafeAny;
    private _getObjectPath;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzI18nService, [{ optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzI18nService>;
}
