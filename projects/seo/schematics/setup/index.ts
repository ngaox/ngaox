import {
    Rule, Tree, SchematicsException,
    apply, url, applyTemplates, move,
    chain, mergeWith
} from '@angular-devkit/schematics';
import * as ts from 'typescript';

import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

import { strings, normalize, virtualFs, workspaces } from '@angular-devkit/core';

import { SetupSchema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
        async readFile(path: string): Promise<string> {
            const data = tree.read(path);
            if (!data) {
                throw new SchematicsException('File not found.');
            }
            return virtualFs.fileBufferToString(data);
        },
        async writeFile(path: string, data: string): Promise<void> {
            return tree.overwrite(path, data);
        },
        async isDirectory(path: string): Promise<boolean> {
            return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
        },
        async isFile(path: string): Promise<boolean> {
            return tree.exists(path);
        },
    };
}

export function setup(options: SetupSchema): Rule {
    return async (tree: Tree) => {
        const host = createHost(tree);
        const { workspace } = await workspaces.readWorkspace('/', host);
        
        if (!options.project) {
            options.project = workspace.extensions.defaultProject?.toString() || "";
        }
        const project = workspace.projects.get(options.project);

        if (!project) {
            throw new SchematicsException(`Invalid project name: ${options.project}`);
        }

        const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

        if (!options.name) {
            options.name = projectType;
        }
        const isInline = (options.inline == true) ? true : false;
        const directory = ((!isInline) ? `/${strings.dasherize(options.name)}-seo` : "");
        const WorkingDirectory = `${project.sourceRoot}/${projectType}`;
        const path = WorkingDirectory + directory;
        const modulePath = `.${directory}/${strings.dasherize(options.name)}-seo.module`;

        const templateSource = apply(url('./files' + ((isInline) ? "/inline" : "/default")), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                name: options.name
            }),
            move(normalize(path as string))
        ]);

        return chain([
            mergeWith(templateSource),
            addImportToNgModule(options,modulePath,WorkingDirectory)
        ]);
    };
}

function addImportToNgModule(options: SetupSchema,relativePath:string,WorkingDirectory:string): Rule {
    return (tree: Tree) => {
        if (!options.module) {
            if (tree.read(WorkingDirectory + '/app.module.ts') === null) {
                return tree;
            } else {
                options.module = 'app.module.ts';
            }
        }
        const modulePath = `${WorkingDirectory}/${options.module}`;
        const text = tree.read(modulePath);
        if (text === null) {
            throw new SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString();
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

        const changes = addImportToModule(
            source,
            modulePath,
            strings.classify(`${options.name}SeoModule`),
            relativePath,
        );

        const recorder = tree.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        tree.commitUpdate(recorder);

        return tree;
    };
}
