import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import {
  Type as BudgetType,
  executeBrowserBuilder,
  BrowserBuilderOptions
} from '@angular-devkit/build-angular';
import { lastValueFrom } from 'rxjs';
import { IBuilderOptions } from '../src';
import * as path from 'path';
import * as deepmerge from 'deepmerge';

import { envVariablesPlugin } from './plugins/env-variables';
import { MdContentTask } from './tasks/md-content';
import {
  InlineStyleLanguage,
  OutputHashing
} from '@angular-devkit/build-angular/src/builders/browser/schema';

export default createBuilder(ngaoxBuild);

export async function ngaoxBuild(
  opts: IBuilderOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  const projectName = context.target && context.target.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  const workspaceRoot = context.workspaceRoot;
  const projectMetadata = await context.getProjectMetadata(projectName);
  const projectRoot = path.join(
    workspaceRoot,
    (projectMetadata.root as string | undefined) ?? ''
  );
  const sourceRoot = path.join(
    workspaceRoot,
    (projectMetadata.sourceRoot as string | undefined) ?? ''
  );

  const options: IBuilderOptions = await getBuildOptions(
    opts,
    workspaceRoot,
    projectRoot,
    sourceRoot
  );

  if (options.press) {
    await lastValueFrom(MdContentTask(options.press, context));
  }

  return (await executeBrowserBuilder(
    options.ngBuild as BrowserBuilderOptions,
    context,
    options.allowEnvVariables ? envVariablesPlugin() : undefined
  ).toPromise()) as BuilderOutput;
}

function getCleanRelativePath(from: string, to: string) {
  return path.relative(from, to).replace(/\\/g, '/').replace(/^\//, '');
}

async function getBuildOptions(
  opts: Partial<IBuilderOptions>,
  workspaceRoot: string,
  projectRoot: string,
  sourceRoot: string
): Promise<IBuilderOptions> {
  const clearSourceRoot = getCleanRelativePath(workspaceRoot, sourceRoot);
  const clearProjectRoot = getCleanRelativePath(workspaceRoot, projectRoot);
  let options: Partial<IBuilderOptions> = {
    ngBuild: {
      outputPath: `dist/${clearProjectRoot}`,
      index: `${clearSourceRoot}/index.html`,
      main: `${clearSourceRoot}/main.ts`,
      polyfills: `${clearSourceRoot}/polyfills.ts`,
      tsConfig: `${clearProjectRoot}/tsconfig.app.json`,
      inlineStyleLanguage: InlineStyleLanguage.Css
    },
    allowEnvVariables: false,
    configurations: {
      development: {
        ngBuild: {
          buildOptimizer: false,
          optimization: false,
          vendorChunk: true,
          extractLicenses: false,
          sourceMap: true,
          namedChunks: true
        }
      },
      production: {
        ngBuild: {
          budgets: [
            {
              type: BudgetType.Initial,
              maximumWarning: '500kb',
              maximumError: '1mb'
            },
            {
              type: BudgetType.AnyComponentStyle,
              maximumWarning: '2kb',
              maximumError: '4kb'
            }
          ],
          fileReplacements: [
            {
              replace: `${clearSourceRoot}/environments/environment.ts`,
              with: `${clearSourceRoot}/environments/environment.prod.ts`
            }
          ],
          outputHashing: OutputHashing.All
        }
      }
    }
  };

  try {
    options = deepmerge(
      options,
      await import(workspaceRoot + '/ngaox.config.js')
    );
  } catch (e) {
    /* Dont throw error */
  }

  try {
    options = deepmerge(
      options,
      await import(projectRoot + '/ngaox.config.js')
    );
  } catch (e) {
    /* Dont throw error */
  }

  const mergedOptions = deepmerge(options, JSON.parse(JSON.stringify(opts)));
  return {
    ...deepmerge(
      mergedOptions,
      mergedOptions.configurations[mergedOptions.config] ?? {}
    ),
    configurations: undefined
  };
}
