"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleUpgradeData = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const data_1 = require("./data");
/** Upgrade data that will be used for the NG-ZORRO ng-update schematic. */
exports.ruleUpgradeData = {
    attributeSelectors: data_1.attributeSelectors,
    classNames: data_1.classNames,
    constructorChecks: data_1.constructorChecks,
    cssSelectors: data_1.cssSelectors,
    elementSelectors: data_1.elementSelectors,
    inputNames: data_1.inputNames,
    methodCallChecks: data_1.methodCallChecks,
    outputNames: data_1.outputNames,
    propertyNames: data_1.propertyNames,
    symbolRemoval: schematics_1.symbolRemoval
};
//# sourceMappingURL=upgrade-data.js.map