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
const schematics_1 = require("@angular/cdk/schematics");
const schematics_2 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const workspace_1 = require("@schematics/angular/utility/workspace");
const package_config_1 = require("../utils/package-config");
const project_style_1 = require("../utils/project-style");
const version_names_1 = require("../utils/version-names");
function default_1(options) {
    return (0, schematics_2.chain)([
        (host) => {
            if (!options.skipPackageJson) {
                (0, package_config_1.addPackageToPackageJson)(host, 'ng-zorro-antd', version_names_1.zorroVersion);
                if (options.gestures) {
                    (0, package_config_1.addPackageToPackageJson)(host, 'hammerjs', version_names_1.hammerjsVersion);
                }
            }
        },
        (0, schematics_2.schematic)('ng-add-setup-project', options),
        (host) => __awaiter(this, void 0, void 0, function* () {
            if (options.template) {
                const workspace = yield (0, workspace_1.getWorkspace)(host);
                const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
                const style = (0, project_style_1.getProjectStyle)(project);
                return (0, schematics_2.schematic)(options.template, Object.assign(Object.assign({}, options), { style }));
            }
        }),
        (_, context) => {
            if (options.skipInstall) {
                return;
            }
            context.addTask(new tasks_1.NodePackageInstallTask());
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map