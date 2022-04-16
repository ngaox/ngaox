import {
  Rule,
  Tree,
  SchematicContext,
  chain
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { version as NgaoxCurrentVersion } from '../../package.json';

import { SetupSchema } from './schema/schema';
import { getModuleInfo, getProject } from '../utils/generators-options';
import { getSeoRule } from './rules/seo.rule';

export default function (setupOptions: SetupSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Schematics/Generators coming soon...`);
    context.logger.info(
      `Checkout the docs for manual setup: https://ngaox-lab.web.app/`
    );
    return tree;
    // const project = await getProject(tree, setupOptions.project);
    // const projectType =
    //   project.extensions.projectType === 'application' ? 'app' : 'lib';
    // const [moduleName, moduleDir, moduleFilePath] = getModuleInfo(
    //   tree,
    //   `${project.sourceRoot}/${projectType}/${setupOptions.module}`
    // );
    // const options = {
    //   module: {
    //     name: moduleName,
    //     path: moduleFilePath,
    //     dir: moduleDir
    //   }
    // };
    // context.logger.info(
    //   `Installing @ngaox/seo v${NgaoxCurrentVersion}... (same version as other @ngaox/** packages)`
    // );
    // context.addTask(
    //   new NodePackageInstallTask({
    //     packageName: `@ngaox/seo@${NgaoxCurrentVersion}`
    //   })
    // );

    // return chain([getSeoRule(tree, context, options)]);
  };
}
