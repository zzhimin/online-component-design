"use strict";
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
const testing_1 = require("@angular-devkit/schematics/testing");
const schema_1 = require("@schematics/angular/component/schema");
const test_app_1 = require("../testing/test-app");
const appOptions = {
    name: 'ng-zorro',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: schema_1.Style.Less,
    skipTests: false,
    skipPackageJson: false
};
const defaultOptions = {
    name: 'test',
    inlineStyle: false,
    inlineTemplate: false,
    changeDetection: schema_1.ChangeDetection.Default,
    style: schema_1.Style.Less,
    skipTests: false,
    module: undefined,
    export: false,
    project: 'ng-zorro'
};
describe('ng-component schematic', () => {
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../collection.json'));
        appTree = yield (0, test_app_1.createTestApp)(runner, appOptions);
    }));
    it('should create a component', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const files = tree.files;
        expect(files).toEqual(jasmine.arrayContaining([
            '/projects/ng-zorro/src/app/test/test.component.less',
            '/projects/ng-zorro/src/app/test/test.component.html',
            '/projects/ng-zorro/src/app/test/test.component.spec.ts',
            '/projects/ng-zorro/src/app/test/test.component.ts'
        ]));
    }));
    it('should create a flat component', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { flat: true });
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const files = tree.files;
        expect(files).toEqual(jasmine.arrayContaining([
            '/projects/ng-zorro/src/app/test.component.less',
            '/projects/ng-zorro/src/app/test.component.html',
            '/projects/ng-zorro/src/app/test.component.spec.ts',
            '/projects/ng-zorro/src/app/test.component.ts'
        ]));
    }));
    it('should find the closest module', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign({}, defaultOptions);
        const closestModule = '/projects/ng-zorro/src/app/test/test.module.ts';
        appTree.create(closestModule, `
      import { NgModule } from '@angular/core';
      @NgModule({
        imports: [],
        declarations: []
      })
      export class ClosestModule { }
    `);
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const fooModuleContent = tree.readContent(closestModule);
        expect(fooModuleContent).toMatch(/import { TestComponent } from '.\/test.component'/);
    }));
    it('should set classname with the closest module', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { classnameWithModule: true });
        const testModule = '/projects/ng-zorro/src/app/test/test.module.ts';
        appTree.create(testModule, `
      import { NgModule } from '@angular/core';
      @NgModule({
        imports: [],
        declarations: []
      })
      export class TestModule { }
    `);
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const fooModuleContent = tree.readContent(testModule);
        expect(fooModuleContent).toMatch(/import { TestTestComponent } from '.\/test.component'/);
    }));
    it('should set classname with the specified module', () => __awaiter(void 0, void 0, void 0, function* () {
        const options = Object.assign(Object.assign({}, defaultOptions), { classnameWithModule: true, module: 'app.module.ts' });
        const tree = yield runner.runSchematicAsync('component', options, appTree).toPromise();
        const appModuleContent = tree.readContent('/projects/ng-zorro/src/app/app.module.ts');
        expect(appModuleContent).toMatch(/import { AppTestComponent } from '.\/test\/test.component'/);
    }));
});
//# sourceMappingURL=index.spec.js.map