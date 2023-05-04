import {
  Rule,
  Tree,
  SchematicContext,
  chain,
  SchematicsException
} from '@angular-devkit/schematics';
import { version as NgaoxCurrentVersion } from '../../package.json';

import { SetupSchema } from './schema/schema';
import {
  getModuleInfo,
  getProject,
  getSetupFeatures
} from '../utils/generators';
import { getSeoRule } from './rules/seo.rule';
import { getDevkitRule } from './rules/devkit.rule';
import { getIconsRule } from './rules/icons.rule';

export default function (setupOptions: SetupSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const features = await getSetupFeatures(setupOptions);
    const project = await getProject(tree, setupOptions.project);
    if (project.extensions.projectType !== 'application') {
      throw new SchematicsException(
        `@ngaox/devkit requires an Angular project type of "application"`
      );
    }
    const [moduleName, moduleDir, moduleFilePath] = getModuleInfo(
      tree,
      `${project.sourceRoot}/app/${setupOptions.module ?? 'app'}`
    );
    const options = {
      project,
      raw: setupOptions,
      NgaoxCurrentVersion,
      module: {
        name: moduleName,
        path: moduleFilePath,
        dir: moduleDir
      }
    };
    context.logger.info(
      `Setting up Ngaox v${NgaoxCurrentVersion} for ${setupOptions.project}${
        features.length > 0 ? ` with ${features.join(', ')}` : ''
      }...`
    );
    const rules = [await getDevkitRule(tree, context, options)];
    if (features.includes('seo')) {
      rules.push(getSeoRule(tree, context, options));
    }
    if (features.includes('icons')) {
      rules.push(getIconsRule(tree, context, options));
    }
    return chain(rules);
  };
}
