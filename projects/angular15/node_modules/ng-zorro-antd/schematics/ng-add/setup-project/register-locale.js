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
exports.registerLocale = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const change_1 = require("@schematics/angular/utility/change");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const workspace_1 = require("@schematics/angular/utility/workspace");
const chalk_1 = require("chalk");
const ts = require("typescript");
function registerLocale(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_1.getProjectFromWorkspace)(workspace, options.project);
        const appModulePath = (0, ng_ast_utils_1.getAppModulePath)(host, (0, schematics_1.getProjectMainFile)(project));
        const moduleSource = (0, schematics_1.parseSourceFile)(host, appModulePath);
        const locale = options.locale || 'en_US';
        const localePrefix = locale.split('_')[0];
        const recorder = host.beginUpdate(appModulePath);
        const changes = [
            (0, schematics_1.insertImport)(moduleSource, appModulePath, 'NZ_I18N', 'ng-zorro-antd/i18n'),
            (0, schematics_1.insertImport)(moduleSource, appModulePath, locale, 'ng-zorro-antd/i18n'),
            (0, schematics_1.insertImport)(moduleSource, appModulePath, 'registerLocaleData', '@angular/common'),
            (0, schematics_1.insertImport)(moduleSource, appModulePath, localePrefix, `@angular/common/locales/${localePrefix}`, true),
            registerLocaleData(moduleSource, appModulePath, localePrefix),
            ...insertI18nTokenProvide(moduleSource, appModulePath, locale)
        ];
        changes.forEach((change) => {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        });
        host.commitUpdate(recorder);
        return;
    });
}
exports.registerLocale = registerLocale;
function registerLocaleData(moduleSource, modulePath, locale) {
    const allImports = (0, schematics_1.findNodes)(moduleSource, ts.SyntaxKind.ImportDeclaration);
    const allFun = (0, schematics_1.findNodes)(moduleSource, ts.SyntaxKind.ExpressionStatement);
    const registerLocaleDataFun = allFun.filter(node => {
        var _a;
        const fun = node.getChildren();
        return ((_a = fun[0].getChildren()[0]) === null || _a === void 0 ? void 0 : _a.getText()) === 'registerLocaleData';
    });
    if (registerLocaleDataFun.length === 0) {
        return (0, schematics_1.insertAfterLastOccurrence)(allImports, `\n\nregisterLocaleData(${locale});`, modulePath, 0);
    }
    else {
        console.log();
        console.log((0, chalk_1.yellow)(`Could not add the registerLocaleData to your app.module file (${(0, chalk_1.blue)(modulePath)}).` +
            `because there is already a registerLocaleData function.`));
        console.log((0, chalk_1.yellow)(`Please manually add the following code to your app.module:`));
        console.log((0, chalk_1.cyan)(`registerLocaleData(${locale});`));
        return new change_1.NoopChange();
    }
}
function insertI18nTokenProvide(moduleSource, modulePath, locale) {
    const metadataField = 'providers';
    const nodes = (0, schematics_1.getDecoratorMetadata)(moduleSource, 'NgModule', '@angular/core');
    const addProvide = (0, schematics_1.addSymbolToNgModuleMetadata)(moduleSource, modulePath, 'providers', `{ provide: NZ_I18N, useValue: ${locale} }`, null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node = nodes[0];
    if (!node) {
        return [];
    }
    const matchingProperties = node.properties
        .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
        .filter((prop) => {
        const name = prop.name;
        switch (name.kind) {
            case ts.SyntaxKind.Identifier:
                return name.getText(moduleSource) === metadataField;
            case ts.SyntaxKind.StringLiteral:
                return name.text === metadataField;
        }
        return false;
    });
    if (!matchingProperties) {
        return [];
    }
    if (matchingProperties.length) {
        const assignment = matchingProperties[0];
        if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return [];
        }
        const arrLiteral = assignment.initializer;
        if (arrLiteral.elements.length === 0) {
            return addProvide;
        }
        else {
            node = arrLiteral.elements.filter(e => { var _a; return (_a = e.getText) === null || _a === void 0 ? void 0 : _a.call(e).includes('NZ_I18N'); });
            if (node.length === 0) {
                return addProvide;
            }
            else {
                console.log();
                console.log((0, chalk_1.yellow)(`Could not provide the locale token to your app.module file (${(0, chalk_1.blue)(modulePath)}).` +
                    `because there is already a locale token in provides.`));
                console.log((0, chalk_1.yellow)(`Please manually add the following code to your provides:`));
                console.log((0, chalk_1.cyan)(`{ provide: NZ_I18N, useValue: ${locale} }`));
                return [];
            }
        }
    }
    else {
        return addProvide;
    }
}
//# sourceMappingURL=register-locale.js.map