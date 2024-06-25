"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsOutputRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
class TabsOutputRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = false;
    }
    visitTemplate(template) {
        (0, schematics_1.findOutputsOnElementWithTag)(template.content, 'nzOnNextClick', ['nz-tabset'])
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated output '(nzOnNextClick)'. Please manually remove this output.`
            });
        });
        (0, schematics_1.findOutputsOnElementWithTag)(template.content, 'nzOnPrevClick', ['nz-tabset'])
            .forEach(offset => {
            this.failures.push({
                filePath: template.filePath,
                position: template.getCharacterAndLineOfPosition(offset),
                message: `Found deprecated output '(nzOnPrevClick)'. Please manually remove this output.`
            });
        });
    }
}
exports.TabsOutputRule = TabsOutputRule;
//# sourceMappingURL=tabs-output-rule.js.map