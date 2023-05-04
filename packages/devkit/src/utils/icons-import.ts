import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { INgaoxRuleOptions } from '../models/generator';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function iconsImportRule(
  context: SchematicContext,
  options: INgaoxRuleOptions
): Rule {
  return (tree: Tree) => {
    const { module } = options;

    // Get the content of the module file
    const moduleContent = tree.read(module.path)?.toString('utf-8');

    if (!moduleContent) {
      throw new Error(`Could not read the content of '${module.path}' file.`);
    }
    const isHttpModuleImported = moduleContent.includes('HttpClientModule');
    if (moduleContent.includes('IconsModule.forRoot')) {
      context.logger.warn(
        `IconsModule is already imported in '${module.path}' file.`
      );
      return;
    }

    // Add import statement for HttpClientModule and IconsModule
    const recorder = tree.beginUpdate(module.path);

    recorder.insertLeft(
      moduleContent.length,
      `\n${
        !isHttpModuleImported
          ? `import { HttpClientModule } from '@angular/common/http';\n`
          : ''
      }import { IconsModule } from '@ngaox/icons';\n`
    );

    // Add HttpClientModule to the module imports
    const moduleSource = ts.createSourceFile(
      module.path,
      moduleContent,
      ts.ScriptTarget.Latest,
      true
    );
    const changes = [
      ...addImportToModule(
        moduleSource,
        module.path,
        'IconsModule.forRoot()',
        '@ngaox/icons'
      ),
      ...(!isHttpModuleImported
        ? addImportToModule(
            moduleSource,
            module.path,
            'HttpClientModule',
            '@angular/common/http'
          )
        : [])
    ];

    // Apply changes
    changes.forEach(change => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    tree.commitUpdate(recorder);

    return tree;
  };
}
