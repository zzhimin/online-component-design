import { BehaviorSubject } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTreeNode, NzTreeNodeKey } from './nz-tree-base-node';
import { NzFormatEmitEvent } from './nz-tree-base.definitions';
import * as i0 from "@angular/core";
export declare class NzTreeBaseService {
    DRAG_SIDE_RANGE: number;
    DRAG_MIN_GAP: number;
    isCheckStrictly: boolean;
    isMultiple: boolean;
    selectedNode: NzTreeNode;
    rootNodes: NzTreeNode[];
    flattenNodes$: BehaviorSubject<NzTreeNode[]>;
    selectedNodeList: NzTreeNode[];
    expandedNodeList: NzTreeNode[];
    checkedNodeList: NzTreeNode[];
    halfCheckedNodeList: NzTreeNode[];
    matchedNodeList: NzTreeNode[];
    /**
     * reset tree nodes will clear default node list
     */
    initTree(nzNodes: NzTreeNode[]): void;
    flattenTreeData(nzNodes: NzTreeNode[], expandedKeys?: NzTreeNodeKey[] | true): void;
    getSelectedNode(): NzTreeNode | null;
    /**
     * get some list
     */
    getSelectedNodeList(): NzTreeNode[];
    /**
     * return checked nodes
     */
    getCheckedNodeList(): NzTreeNode[];
    getHalfCheckedNodeList(): NzTreeNode[];
    /**
     * return expanded nodes
     */
    getExpandedNodeList(): NzTreeNode[];
    /**
     * return search matched nodes
     */
    getMatchedNodeList(): NzTreeNode[];
    isArrayOfNzTreeNode(value: NzSafeAny[]): boolean;
    /**
     * set drag node
     */
    setSelectedNode(node: NzTreeNode): void;
    /**
     * set node selected status
     */
    setNodeActive(node: NzTreeNode): void;
    /**
     * add or remove node to selectedNodeList
     */
    setSelectedNodeList(node: NzTreeNode, isMultiple?: boolean): void;
    /**
     * merge checked nodes
     */
    setHalfCheckedNodeList(node: NzTreeNode): void;
    setCheckedNodeList(node: NzTreeNode): void;
    /**
     * conduct checked/selected/expanded keys
     */
    conductNodeState(type?: string): NzTreeNode[];
    /**
     * set expanded nodes
     */
    setExpandedNodeList(node: NzTreeNode): void;
    setMatchedNodeList(node: NzTreeNode): void;
    /**
     * check state
     *
     * @param isCheckStrictly
     */
    refreshCheckState(isCheckStrictly?: boolean): void;
    conduct(node: NzTreeNode, isCheckStrictly?: boolean): void;
    /**
     * 1、children half checked
     * 2、children all checked, parent checked
     * 3、no children checked
     */
    conductUp(node: NzTreeNode): void;
    /**
     * reset child check state
     */
    conductDown(node: NzTreeNode, value: boolean): void;
    /**
     * flush after delete node
     */
    afterRemove(nodes: NzTreeNode[]): void;
    /**
     * drag event
     */
    refreshDragNode(node: NzTreeNode): void;
    resetNodeLevel(node: NzTreeNode): void;
    calcDropPosition(event: DragEvent): number;
    /**
     * drop
     * 0: inner -1: pre 1: next
     */
    dropAndApply(targetNode: NzTreeNode, dragPos?: number): void;
    /**
     * emit Structure
     * eventName
     * node
     * event: MouseEvent / DragEvent
     * dragNode
     */
    formatEvent(eventName: string, node: NzTreeNode | null, event: MouseEvent | DragEvent | null): NzFormatEmitEvent;
    /**
     * New functions for flatten nodes
     */
    getIndexOfArray(list: NzTreeNode[], key: string): number;
    /**
     * Render by nzCheckedKeys
     * When keys equals null, just render with checkStrictly
     *
     * @param keys
     * @param checkStrictly
     */
    conductCheck(keys: NzTreeNodeKey[] | null, checkStrictly: boolean): void;
    conductExpandedKeys(keys?: NzTreeNodeKey[] | true): void;
    conductSelectedKeys(keys: NzTreeNodeKey[], isMulti: boolean): void;
    /**
     * Expand parent nodes by child node
     *
     * @param node
     */
    expandNodeAllParentBySearch(node: NzTreeNode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTreeBaseService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzTreeBaseService>;
}
