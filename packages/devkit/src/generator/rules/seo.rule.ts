import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { addImportToNgModule } from '../../utils/generators';
import { INgaoxRuleOptions } from '../../models/generator';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function getSeoRule(
  tree: Tree,
  context: SchematicContext,
  options: INgaoxRuleOptions
): Rule {
  context.logger.info(`Setting up @ngaox/seo...`);
  context.addTask(
    new NodePackageInstallTask({
      packageName: `@ngaox/seo@^${options.NgaoxCurrentVersion}`
    })
  );

  const templateSource = apply(url('./files'), [
    applyTemplates({
      classify: strings.classify,
      dasherize: strings.dasherize,
      name: options.module.name
    }),
    move(normalize(options.module.dir as string))
  ]);
  return chain([
    mergeWith(templateSource),
    addImportToNgModule(
      options.module.path,
      `./${strings.dasherize(options.module.name)}.seo`,
      `${strings.classify(options.module.name)}SeoModule`
    )
  ]);
}
