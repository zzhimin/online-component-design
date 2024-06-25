"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNgZorroExportDeclaration = exports.isNgZorroImportDeclaration = exports.ngZorroModuleSpecifier = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.ngZorroModuleSpecifier = 'ng-zorro-antd';
function isNgZorroImportDeclaration(node) {
    return isNgZorroDeclaration((0, schematics_1.getImportDeclaration)(node));
}
exports.isNgZorroImportDeclaration = isNgZorroImportDeclaration;
function isNgZorroExportDeclaration(node) {
    return isNgZorroDeclaration((0, schematics_1.getExportDeclaration)(node));
}
exports.isNgZorroExportDeclaration = isNgZorroExportDeclaration;
function isNgZorroDeclaration(declaration) {
    if (!declaration.moduleSpecifier) {
        return false;
    }
    const moduleSpecifier = declaration.moduleSpecifier.getText();
    return moduleSpecifier.indexOf(exports.ngZorroModuleSpecifier) !== -1;
}
//# sourceMappingURL=module-specifiers.js.map