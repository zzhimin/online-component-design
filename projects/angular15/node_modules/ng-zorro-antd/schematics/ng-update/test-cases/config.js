"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicsTestNGConfig = exports.SchematicsTestTsConfig = void 0;
exports.SchematicsTestTsConfig = {
    compilerOptions: {
        experimentalDecorators: true,
        lib: ['es2015']
    }
};
exports.SchematicsTestNGConfig = {
    version: 1,
    projects: { t: { root: '', architect: { build: { options: { tsConfig: './tsconfig.json' } } } } }
};
//# sourceMappingURL=config.js.map