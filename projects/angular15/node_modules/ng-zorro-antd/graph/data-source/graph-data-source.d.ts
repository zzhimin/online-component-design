/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { NzGraphDataDef } from '../interface';
import { NzGraphBaseSource } from './base-graph-source';
export declare class NzGraphData implements NzGraphBaseSource<NzGraphDataDef, string> {
    private _data;
    dataSource: NzGraphDataDef;
    /** A selection model with multi-selection to track expansion status. */
    expansionModel: SelectionModel<string>;
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(nodeName: string): void;
    /** Expands one single data node. */
    expand(nodeName: string): void;
    /** Collapses one single data node. */
    collapse(nodeName: string): void;
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(nodeName: string): boolean;
    /** Collapse all dataNodes in the tree. */
    collapseAll(): void;
    expandAll(): void;
    setData(data: NzGraphDataDef): void;
    constructor(source?: NzGraphDataDef);
    connect(): Observable<NzGraphDataDef>;
    disconnect(): void;
    private findParents;
    private findChildren;
}
