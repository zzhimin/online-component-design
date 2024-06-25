/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzImageSrcLoader } from './typings';
export declare const defaultImageSrcLoader: NzImageSrcLoader;
/**
 * AliObjectsLoader return format
 * {domain}/{src}?x-oss-process=image/resize,w_{width}
 */
export declare function createAliObjectsLoader(domain: string): NzImageSrcLoader;
/**
 * ImgixLoader return format
 * {domain}/{src}?format=auto&fit=max&w={width}
 */
export declare function createImgixLoader(domain: string): NzImageSrcLoader;
/**
 * CloudinaryLoader return format
 * {domain}/c_limit,q_auto,w_{width}/{src}
 */
export declare function createCloudinaryLoader(domain: string): NzImageSrcLoader;
