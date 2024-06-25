/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Observable } from 'rxjs';
export declare function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T>;
