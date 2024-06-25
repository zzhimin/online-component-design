/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export declare const statusColors: readonly ["success", "processing", "error", "default", "warning"];
export declare const presetColors: readonly ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"];
export declare type NzPresetColor = typeof presetColors[number];
export declare type NzStatusColor = typeof statusColors[number];
export declare function isPresetColor(color: string): color is NzPresetColor;
export declare function isStatusColor(color: string): color is NzPresetColor;
