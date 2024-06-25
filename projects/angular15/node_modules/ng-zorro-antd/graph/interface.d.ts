/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { HierarchyBaseEdgeInfo, HierarchyBaseNodeInfo, HierarchyGraphDef, HierarchyGraphEdgeDef, HierarchyGraphNodeDef, HierarchyGraphNodeInfo, HierarchyGraphOption, LayoutConfig } from 'dagre-compound';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare enum NzGraphEdgeType {
    LINE = "line",
    CURVE = "curve"
}
export interface NzGraphDataDef extends HierarchyGraphDef {
    nodes: NzGraphNodeDef[];
    edges: NzGraphEdgeDef[];
}
export interface NzGraphNodeDef extends HierarchyGraphNodeDef {
    label?: string;
}
export interface NzGraphEdgeDef extends HierarchyGraphEdgeDef {
    label?: string;
}
export interface NzGraphOption extends HierarchyGraphOption {
}
export declare type NzRankDirection = 'TB' | 'BT' | 'LR' | 'RL';
export interface NzGraphGroupNode extends HierarchyGraphNodeInfo {
    nodes: Array<NzGraphNode | NzGraphGroupNode>;
    edges: NzGraphEdge[];
    [key: string]: NzSafeAny;
}
export interface NzGraphNode extends HierarchyBaseNodeInfo {
    id: NzSafeAny;
    name: NzSafeAny;
    label?: string;
    [key: string]: NzSafeAny;
}
export interface NzGraphEdge extends HierarchyBaseEdgeInfo {
    id: NzSafeAny;
    v: NzSafeAny;
    w: NzSafeAny;
    label?: string;
}
export interface NzLayoutSetting extends LayoutConfig {
}
export interface NzGraphBaseLayout {
    layout: {
        nodeSep: number;
        rankSep: number;
        edgeSep: number;
    };
    subScene: {
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        labelHeight: number;
    };
    defaultCompoundNode: {
        width: number;
        height: number;
        maxLabelWidth: number;
    };
    defaultNode: {
        width: number;
        height: number;
        labelOffset: number;
        maxLabelWidth: number;
    };
    defaultEdge: {
        type: NzGraphEdgeType | string;
    };
}
export declare function nzTypeDefinition<T>(): (item: unknown) => T;
export declare type NzDeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<NzDeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<NzDeepPartial<U>> : NzDeepPartial<T[P]>;
};
export declare type NzGraphLayoutConfig = NzDeepPartial<NzGraphBaseLayout>;
export declare const NZ_GRAPH_LAYOUT_SETTING: NzLayoutSetting;
export interface NzZoomTransform {
    x: number;
    y: number;
    k: number;
}
export interface RelativePositionInfo {
    topLeft: {
        x: number;
        y: number;
    };
    bottomRight: {
        x: number;
        y: number;
    };
}
