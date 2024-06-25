"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFnsCompatibleRule = void 0;
const injection_token_rule_1 = require("./injection-token-rule");
class DateFnsCompatibleRule extends injection_token_rule_1.InjectionTokenRule {
    constructor() {
        super(...arguments);
        this.enabled = false;
        this.tokens = ['NZ_DATE_FNS_COMPATIBLE'];
    }
    getFailure(token) {
        return `Found deprecated symbol "${token}" which has been removed. Please migrate to date-fns v2 manually.`;
    }
}
exports.DateFnsCompatibleRule = DateFnsCompatibleRule;
//# sourceMappingURL=date-fns-compatible-rule.js.map