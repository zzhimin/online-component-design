"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequiredModules = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const workspace_1 = require("@schematics/angular/utility/workspace");
const chalk_1 = require("chalk");
const modulesMap = {
    FormsModule: '@angular/forms',
    HttpClientModule: '@angular/common/http'
};
function addRequiredModules(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const appModulePath = (0, ng_ast_utils_1.getAppModulePath)(host, (0, schematics_1.getProjectMainFile)(project));
        for (const module in modulesMap) {
            if (modulesMap.hasOwnProperty(module)) {
                addModuleImportToApptModule(host, module, modulesMap[module], project, appModulePath, options);
            }
        }
        return;
    });
}
exports.addRequiredModules = addRequiredModules;
function addModuleImportToApptModule(host, moduleName, src, project, appModulePath, options) {
    if ((0, schematics_1.hasNgModuleImport)(host, appModulePath, moduleName)) {
        console.log((0, chalk_1.yellow)(`Could not set up "${(0, chalk_1.blue)(moduleName)}" ` +
            `because "${(0, chalk_1.blue)(moduleName)}" is already imported. Please manually ` +
            `check "${(0, chalk_1.blue)(appModulePath)}" file.`));
        return;
    }
    (0, schematics_1.addModuleImportToRootModule)(host, moduleName, src, project);
}
//# sourceMappingURL=add-required-modules.js.map