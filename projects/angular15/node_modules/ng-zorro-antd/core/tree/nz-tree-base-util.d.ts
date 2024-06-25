/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { FlattenNode, NzTreeNode, NzTreeNodeKey } from './nz-tree-base-node';
export declare function isCheckDisabled(node: NzTreeNode): boolean;
export declare function isInArray(needle: NzSafeAny, haystack: NzSafeAny[]): boolean;
export declare function getPosition(level: string | number, index: number): string;
export declare function getKey(key: NzTreeNodeKey, pos: string): NzTreeNodeKey;
/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 *
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * need expanded keys, provides `true` means all expanded (used in `rc-tree-select`).
 */
export declare function flattenTreeData(treeNodeList?: NzTreeNode[], expandedKeys?: NzTreeNodeKey[] | true): FlattenNode[];
