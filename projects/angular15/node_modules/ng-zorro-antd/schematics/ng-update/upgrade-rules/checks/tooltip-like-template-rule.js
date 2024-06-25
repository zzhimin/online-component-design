"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipLikeTemplateRule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const elements_1 = require("../../../utils/ng-update/elements");
class TooltipLikeTemplateRule extends schematics_1.Migration {
    constructor() {
        super(...arguments);
        this.enabled = true;
    }
    visitTemplate(template) {
        const deprecatedComponent = (deprecated, instead) => {
            (0, elements_1.findElementWithTag)(template.content, deprecated)
                .forEach(offset => {
                this.failures.push({
                    filePath: template.filePath,
                    position: template.getCharacterAndLineOfPosition(offset),
                    message: `Found deprecated "<${deprecated}>" component. Use "${instead}" to instead please.`
                });
            });
        };
        deprecatedComponent('nz-tooltip', '[nz-tooltip]');
        deprecatedComponent('nz-popover', '[nz-popover]');
        deprecatedComponent('nz-popconfirm', '[nz-popconfirm]');
    }
}
exports.TooltipLikeTemplateRule = TooltipLikeTemplateRule;
//# sourceMappingURL=tooltip-like-template-rule.js.map