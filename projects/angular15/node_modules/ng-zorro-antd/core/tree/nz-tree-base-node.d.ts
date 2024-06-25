/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTreeNodeBaseComponent } from './nz-tree-base.definitions';
import { NzTreeBaseService } from './nz-tree-base.service';
export declare type NzTreeNodeKey = string | number;
export interface FlattenNode {
    parent: FlattenNode | null;
    children: FlattenNode[];
    pos: string;
    data: NzTreeNode;
    isStart: boolean[];
    isEnd: boolean[];
}
export interface NzTreeNodeOptions {
    title: string;
    key: string;
    icon?: string;
    isLeaf?: boolean;
    checked?: boolean;
    selected?: boolean;
    selectable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    expanded?: boolean;
    children?: NzTreeNodeOptions[];
    [key: string]: NzSafeAny;
}
export declare class NzTreeNode {
    private _title;
    key: string;
    level: number;
    origin: NzTreeNodeOptions;
    parentNode: NzTreeNode | null;
    private _icon;
    private _children;
    private _isLeaf;
    private _isChecked;
    private _isSelectable;
    private _isDisabled;
    private _isDisableCheckbox;
    private _isExpanded;
    private _isHalfChecked;
    private _isSelected;
    private _isLoading;
    canHide: boolean;
    isMatched: boolean;
    service: NzTreeBaseService | null;
    component: NzTreeNodeBaseComponent;
    /** New added in Tree for easy data access */
    isStart?: boolean[];
    isEnd?: boolean[];
    get treeService(): NzTreeBaseService | null;
    /**
     * Init nzTreeNode
     *
     * @param option: user's input
     * @param parent
     * @param service: base nzTreeService
     */
    constructor(option: NzTreeNodeOptions | NzTreeNode, parent?: NzTreeNode | null, service?: NzTreeBaseService | null);
    /**
     * auto generate
     * get
     * set
     */
    get title(): string;
    set title(value: string);
    get icon(): string;
    set icon(value: string);
    get children(): NzTreeNode[];
    set children(value: NzTreeNode[]);
    get isLeaf(): boolean;
    set isLeaf(value: boolean);
    get isChecked(): boolean;
    set isChecked(value: boolean);
    get isHalfChecked(): boolean;
    set isHalfChecked(value: boolean);
    get isSelectable(): boolean;
    set isSelectable(value: boolean);
    get isDisabled(): boolean;
    set isDisabled(value: boolean);
    get isDisableCheckbox(): boolean;
    set isDisableCheckbox(value: boolean);
    get isExpanded(): boolean;
    set isExpanded(value: boolean);
    get isSelected(): boolean;
    set isSelected(value: boolean);
    get isLoading(): boolean;
    set isLoading(value: boolean);
    setSyncChecked(checked?: boolean, halfChecked?: boolean): void;
    setChecked(checked?: boolean, halfChecked?: boolean): void;
    setExpanded(value: boolean): void;
    getParentNode(): NzTreeNode | null;
    getChildren(): NzTreeNode[];
    /**
     * Support appending child nodes by position. Leaf node cannot be appended.
     */
    addChildren(children: NzSafeAny[], childPos?: number): void;
    clearChildren(): void;
    remove(): void;
    afterValueChange(key: string): void;
    update(): void;
}
