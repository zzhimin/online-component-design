/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export declare type NzSkeletonParagraphWidth = number | string | Array<number | string>;
export declare type NzSkeletonButtonShape = 'circle' | 'round' | 'default';
export declare type NzSkeletonAvatarShape = 'square' | 'circle';
export declare type NzSkeletonInputSize = 'large' | 'small' | 'default';
export declare type NzSkeletonButtonSize = NzSkeletonInputSize;
export declare type NzSkeletonAvatarSize = NzSkeletonInputSize | number;
export interface NzSkeletonAvatar {
    size?: NzSkeletonAvatarSize;
    shape?: NzSkeletonAvatarShape;
}
export interface NzSkeletonTitle {
    width?: number | string;
}
export interface NzSkeletonParagraph {
    rows?: number;
    width?: NzSkeletonParagraphWidth;
}
