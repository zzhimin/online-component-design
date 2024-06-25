/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export declare const getParent: <T>(nodes: T[], node: T, getLevel: (dataNode: T) => number) => T | null;
export declare const getNextSibling: <T>(nodes: T[], node: T, getLevel: (dataNode: T) => number, _index?: number) => T | null;
