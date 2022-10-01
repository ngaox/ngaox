import {
  Target,
  BuilderContext,
  targetFromTargetString
} from '@angular-devkit/architect';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import {
  IBuilderOptions,
  IOptionsObject,
  IBrowserBuilderOptions,
  IBuilderTaskOptions
} from '../../models/builder';
import * as path from 'path';
import * as fs from 'fs-extra';
import { fileExists } from '../../utils/filesystem';
import { cleanPath } from '../../utils/generators-options';
import { contentBuilderPresets } from './presets';

export async function setupAndGetOptions(
  context: BuilderContext,
  browser: IBrowserBuilderOptions
): Promise<IOptionsObject & { builder: IBuilderOptions }> {
  const browserTarget = targetFromTargetString(browser.browserTarget);
  const browserOptions = (await context.getTargetOptions(
    browserTarget as Target
  )) as unknown as BrowserBuilderOptions;
  const builderOptions = await getProjectOptions(context, browser.configDir);
  browserOptions.outputPath =
    browserOptions.outputPath || `dist/${await getProjectRoot(context)}`;
  browserOptions.watch = builderOptions.watch =
    builderOptions.watch || browserOptions.watch;
  browserOptions.deleteOutputPath = false;

  await fs.emptyDir(browserOptions.outputPath);
  await fs.ensureDir(browserOptions.outputPath);

  process.env.APP_BASE_HREF = browserOptions.baseHref;

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

  const rawOptions = await import(configPath);
  const content: {
    [name: string]: IBuilderTaskOptions;
  } = {};
  for (const [name, rawTaskOptions] of Object.entries<any>(
    rawOptions.content ?? {}
  )) {
    const taskOption: Partial<IBuilderTaskOptions> =
      contentBuilderPresets[name] ?? {};
    try {
      if (typeof rawTaskOptions === 'string') {
        taskOption['dir'] = rawTaskOptions;
      } else if (typeof rawTaskOptions === 'object') {
        Object.assign(taskOption, rawTaskOptions);
      } else {
        throw new Error();
      }
      if (
        !taskOption.dir ||
        !taskOption.glob ||
        !taskOption.parser ||
        !taskOption.builder
      ) {
        throw new Error();
      }
    } catch (error) {
      throw new Error(
        `The "content.${name}" in the config file "${configPath}" is not valid.`
      );
    }
    content[name] = taskOption as IBuilderTaskOptions;
  }

  return {
    watch: rawOptions.watch,
    content: content
  };
}

function getTargetProject(context: BuilderContext): Target {
  const target = context.target;
  if (!target || !target.project) {
    throw new Error('The builder requires a target.');
  }
  return target;
}

async function getProjectRoot(context: BuilderContext) {
  const target = getTargetProject(context);
  const projectMetadata = await context.getProjectMetadata(target.project);
  const projectRoot = cleanPath(
    (projectMetadata.root as string | undefined) ?? ''
  );
  return projectRoot;
}
