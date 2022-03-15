import {
  Rule,
  Tree,
  SchematicContext,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { version as NgaoxCurrentVersion } from '../../package.json';

import { strings, normalize } from '@angular-devkit/core';

import { SetupSchema } from './schema';
import {
  addImportToNgModule,
  getModuleInfo,
  getProject
} from '../../src/utils/generators-helpers';

export default function (options: SetupSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      `Installing @ngaox/seo v${NgaoxCurrentVersion}... (same version as other @ngaox/** packages)`
    );
    context.addTask(
      new NodePackageInstallTask({
        packageName: `@ngaox/seo@${NgaoxCurrentVersion}`
      })
    );
    const project = await getProject(tree, options.project);

    const projectType =
      project.extensions.projectType === 'application' ? 'app' : 'lib';
    const [moduleName, moduleDir, moduleFilePath] = getModuleInfo(
      tree,
      `${project.sourceRoot}/${projectType}/${options.module}`
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: moduleName
      }),
      move(normalize(moduleDir as string))
    ]);

    return chain([
      mergeWith(templateSource),
      addImportToNgModule(
        moduleFilePath,
        `./${strings.dasherize(moduleName)}.seo`,
        `${moduleName}SeoModule`
      )
    ]);
  };
}
