"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const elements_1 = require("../../../utils/ng-update/elements");
class SpaceTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = false;
    }
    visitTemplate(template) {
        (0, elements_1.findElementWithTag)(template.content, 'nz-space-item')
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated component 'nz-space-item', please use 'ng-template[nzSpaceItem] instead.`
            });
        });
    }
}
exports.SpaceTemplateRule = SpaceTemplateRule;
//# sourceMappingURL=space-template-rule.js.map