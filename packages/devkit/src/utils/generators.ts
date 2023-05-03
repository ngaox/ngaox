import { Rule, Tree } from '@angular-devkit/schematics';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import * as path from 'path';

import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { InsertChange } from '@schematics/angular/utility/change';

import { strings, virtualFs, workspaces } from '@angular-devkit/core';
import { SetupSchema } from '../generator/schema/schema';
import { FEATURE_OPTIONS, NGAOX_FEATURES } from '../models/generator';

import inquirer = require('inquirer');

export async function getSetupFeatures(options: SetupSchema) {
  const features = options.features
    .split(',')
    .map(feature => feature.trim())
    .filter(feature => feature !== '');
  const invalidFeatures = features.filter(
    feature => !NGAOX_FEATURES.includes(feature)
  );
  if (invalidFeatures.length > 0) {
    throw new Error(
      `Invalid features: ${invalidFeatures.join(
        ','
      )}.\nOnly support: ${NGAOX_FEATURES.join(',')}`
    );
  }
  if (features.length === 0) {
    const promptConfig: inquirer.DistinctQuestion<inquirer.Answers> = {
      type: 'checkbox',
      name: 'features',
      message: 'Select features to set up:',
      choices: FEATURE_OPTIONS
    };
    features.push(
      ...((await inquirer.prompt(promptConfig as unknown))['features'] ?? [])
    );
  }
  return features;
}

export function getCleanRelative(filePath: string, dir: string): string {
  return cleanPath(path.relative(dir, filePath));
}

export function cleanPath(str: string) {
  return str.replace(/\\/g, '/').replace(/^\//, '');
}

export async function getProject(tree: Tree, projectName?: string) {
  const host = createHost(tree);
  const { workspace } = await workspaces.readWorkspace('/', host);
  if (!projectName) {
    projectName = workspace.extensions.defaultProject?.toString() || '';
  }
  const project = workspace.projects.get(projectName);
  if (!project) {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }
  return project;
}

export function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new Error('File not found.');
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
    }
  };
}

export function addImportToNgModule(
  modulePath: string,
  relativePath: string,
  importName: string
): Rule {
  return (tree: Tree) => {
    const text = tree.read(modulePath);
    if (text === null) {
      throw new Error(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString();
    const source = ts.createSourceFile(
      modulePath,
      sourceText,
      ts.ScriptTarget.Latest,
      true
    );

    const changes = addImportToModule(
      source,
      modulePath,
      `${strings.classify(importName)}`,
      relativePath
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

export function getModuleInfo(tree: Tree, module: string): string[] {
  const moduleName = module.replace(/\/$/g, '').split('/').pop();
  const modulePath = findModuleFromOptions(tree, {
    name: moduleName,
    path: module.split('/').slice(0, -1).join('/')
  });
  const moduleDir = modulePath.split('/').slice(0, -1).join('/');
  return [moduleName, moduleDir, modulePath];
}
