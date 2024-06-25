"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const elements_1 = require("../../../utils/ng-update/elements");
class TabsTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = false;
    }
    visitTemplate(template) {
        (0, elements_1.findElementWithoutStructuralDirective)(template.content, 'a', 'nzTabLink', 'nz-tab-link')
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated selector 'a[nz-tab-link]', please use 'ng-template[nzTabLink] > a[nz-tab-link]' instead.`
            });
        });
    }
}
exports.TabsTemplateRule = TabsTemplateRule;
//# sourceMappingURL=tabs-template-rule.js.map