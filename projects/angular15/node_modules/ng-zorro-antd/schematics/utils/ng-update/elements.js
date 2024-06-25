"use strict";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findElementWithClassName = exports.findElementWithTag = exports.findElementWithoutStructuralDirective = void 0;
const parse5_1 = require("parse5");
const hasClassName = (node, className) => {
    var _a, _b;
    return (_b = (_a = node.attrs) === null || _a === void 0 ? void 0 : _a.find) === null || _b === void 0 ? void 0 : _b.call(_a, attr => attr.name === 'class' && attr.value.indexOf(className) !== -1);
};
function findElementWithoutStructuralDirective(html, tagName, directiveName, attr) {
    const document = (0, parse5_1.parseFragment)(html, { sourceCodeLocationInfo: true });
    const elements = [];
    const visitNodes = (nodes) => {
        nodes.forEach(node => {
            var _a;
            if (node.childNodes && !(node.tagName === 'ng-template' && !!node.attrs.find(a => a.name.toLowerCase() === directiveName.toLowerCase()))) {
                visitNodes(node.childNodes);
            }
            if (((_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tagName.toLowerCase() && !!node.attrs.find(a => a.name.toLowerCase() === attr.toLowerCase()) && !node.attrs.find(a => a.name.toLowerCase() === `*${directiveName}`.toLowerCase())) {
                elements.push(node);
            }
        });
    };
    visitNodes(document.childNodes);
    return elements
        .filter(e => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.sourceCodeLocation) === null || _a === void 0 ? void 0 : _a.startTag; })
        .map(element => element.sourceCodeLocation.startTag.startOffset);
}
exports.findElementWithoutStructuralDirective = findElementWithoutStructuralDirective;
function findElementWithTag(html, tagName) {
    const document = (0, parse5_1.parseFragment)(html, { sourceCodeLocationInfo: true });
    const elements = [];
    const visitNodes = (nodes) => {
        nodes.forEach(node => {
            var _a;
            if (node.childNodes) {
                visitNodes(node.childNodes);
            }
            if (((_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tagName.toLowerCase()) {
                elements.push(node);
            }
        });
    };
    visitNodes(document.childNodes);
    return elements
        .filter(e => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.sourceCodeLocation) === null || _a === void 0 ? void 0 : _a.startTag; })
        .map(element => element.sourceCodeLocation.startTag.startOffset);
}
exports.findElementWithTag = findElementWithTag;
function findElementWithClassName(html, className, tagName) {
    const document = (0, parse5_1.parseFragment)(html, { sourceCodeLocationInfo: true });
    const elements = [];
    const visitNodes = (nodes) => {
        nodes.forEach(node => {
            var _a;
            if (node.childNodes) {
                visitNodes(node.childNodes);
            }
            if (hasClassName(node, className) && ((_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tagName.toLowerCase()) {
                elements.push(node);
            }
        });
    };
    visitNodes(document.childNodes);
    return elements
        .filter(e => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.sourceCodeLocation) === null || _a === void 0 ? void 0 : _a.startTag; })
        .map(element => element.sourceCodeLocation.attrs.class.startOffset);
}
exports.findElementWithClassName = findElementWithClassName;
//# sourceMappingURL=elements.js.map