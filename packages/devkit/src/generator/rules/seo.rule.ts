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
import { addImportToNgModule } from '../../utils/generators-options';

export function getSeoRule(
  tree: Tree,
  context: SchematicContext,
  options
): Rule {
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
      `${options.module.name}SeoModule`
    )
  ]);
}
