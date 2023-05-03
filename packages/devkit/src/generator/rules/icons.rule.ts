import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { INgaoxRuleOptions } from '../../models/generator';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { iconsImportRule } from '../../utils/icons-import';

export function getIconsRule(
  tree: Tree,
  context: SchematicContext,
  options: INgaoxRuleOptions
): Rule {
  context.logger.info(`Setting up @ngaox/icons...`);
  context.addTask(
    new NodePackageInstallTask({
      packageName: `@ngaox/icons@^${options.NgaoxCurrentVersion}`
    })
  );
  return chain([
    iconsImportRule(context, options)
    // TODO: update ngaox.config.js, add import, dummy icon, etc.
  ]);
}
