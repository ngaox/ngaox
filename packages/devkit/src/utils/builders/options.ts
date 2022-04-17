import {
  Target,
  BuilderContext,
  targetFromTargetString
} from '@angular-devkit/architect';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import {
  IBrowserBuilderOptions,
  IBuilderOptions,
  IOptionsObject
} from '../../builders';
import * as path from 'path';
import { fileExists } from '../filesystem';
import { cleanPath } from '../generators-options';

export async function getOptions(
  context: BuilderContext,
  browser: string | IBrowserBuilderOptions
): Promise<IOptionsObject> {
  const browserTarget =
    typeof browser === 'string'
      ? targetFromTargetString(browser)
      : context.target;

  const browserOptions =
    typeof browser === 'string'
      ? ((await context.getTargetOptions(
          browserTarget as Target
        )) as unknown as BrowserBuilderOptions)
      : browser;
  const builderOptions = await getProjectOptions(
    context,
    browserOptions['config-dir']
  );

  browserOptions.outputPath = builderOptions.outputPath =
    builderOptions.outputPath || browserOptions.outputPath;
  browserOptions.watch = builderOptions.watch =
    builderOptions.watch || browserOptions.watch;
  browserOptions['deleteOutputPath'] = false;

  return {
    browserTarget,
    browser: browserOptions,
    builder: builderOptions
  };
}

async function getProjectOptions(
  context: BuilderContext,
  configDir?: string
): Promise<IBuilderOptions> {
  const target = getTargetProject(context);
  const workspaceRoot = context.workspaceRoot;
  const projectMetadata = await context.getProjectMetadata(target.project);
  const projectRoot = cleanPath(
    (projectMetadata.root as string | undefined) ?? ''
  );
  const projectConfigPath = path.join(
    workspaceRoot,
    projectRoot,
    'ngaox.config.js'
  );
  const workspaceConfigPath = path.join(workspaceRoot, 'ngaox.config.js');

  let configPath: string;
  if (configDir) {
    configPath = path.join(workspaceRoot, configDir, 'ngaox.config.js');
  } else if (await fileExists(projectConfigPath)) {
    configPath = projectConfigPath;
  } else if (await fileExists(workspaceConfigPath)) {
    configPath = workspaceConfigPath;
  } else {
    throw new Error(
      `The project "${target.project}" doesn't have a ngaox.config.js file.`
    );
  }

  context.logger.info(
    `${colors.blueBright(
      colors.symbols.pointer
    )} Loading project config from: ${configPath}\n`
  );

  return await import(configPath);
}

function getTargetProject(context: BuilderContext): Target {
  const target = context.target;
  if (!target || !target.project) {
    throw new Error('The builder requires a target.');
  }
  return target;
}
