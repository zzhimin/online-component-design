/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export interface MeasureResult {
    finished: boolean;
    node: Node | null;
}
export declare function pxToNumber(value: string | null): number;
export declare function measure(originEle: HTMLElement, rows: number, contentNodes: Node[], fixedContent: HTMLElement[], ellipsisStr: string, suffixStr?: string): {
    contentNodes: Node[];
    text: string;
    ellipsis: boolean;
};
