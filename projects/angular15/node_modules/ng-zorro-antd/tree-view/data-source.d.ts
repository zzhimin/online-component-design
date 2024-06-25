/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class NzTreeFlattener<T, F, K = F> {
    transformFunction: (node: T, level: number) => F;
    getLevel: (node: F) => number;
    isExpandable: (node: F) => boolean;
    getChildren: (node: T) => Observable<T[]> | T[] | undefined | null;
    constructor(transformFunction: (node: T, level: number) => F, getLevel: (node: F) => number, isExpandable: (node: F) => boolean, getChildren: (node: T) => Observable<T[]> | T[] | undefined | null);
    private flattenNode;
    private flattenChildren;
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData: T[]): F[];
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F, K>): F[];
}
export declare class NzTreeFlatDataSource<T, F, K = F> extends DataSource<F> {
    private _treeControl;
    private _treeFlattener;
    _flattenedData: BehaviorSubject<F[]>;
    _expandedData: BehaviorSubject<F[]>;
    _data: BehaviorSubject<T[]>;
    constructor(_treeControl: FlatTreeControl<F, K>, _treeFlattener: NzTreeFlattener<T, F, K>, initialData?: T[]);
    setData(value: T[]): void;
    getData(): T[];
    connect(collectionViewer: CollectionViewer): Observable<F[]>;
    disconnect(): void;
    private flatNodes;
}
