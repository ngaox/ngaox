import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { INgaoxRuleOptions } from '../../models/generator';
import { WorkspaceProject, getWorkspace } from '../../utils/workspace';
import { getConfigPath } from '../../builder/helpers/prepare';
import path = require('path');

export async function getDevkitRule(
  tree: Tree,
  context: SchematicContext,
  options: INgaoxRuleOptions
): Promise<Rule> {
  const { path: workspacePath, workspace } = getWorkspace(tree);

  if (!options.project) {
    throw new SchematicsException('No Angular project found in the workspace');
  }

  const project: WorkspaceProject = workspace.projects[options.raw.project];
  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace'
    );
  }

  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `@ngaox/devkit requires an Angular project type of "application" in angular.json`
    );
  }

  const configPath = await getConfigPath(
    project?.architect?.build?.options?.configDir,
    path.dirname(options.project.root),
    path.dirname(tree.root.path)
  );

  return (tree: Tree) => {
    writeBuilder(project, 'build', '@ngaox/devkit:builder', true);
    writeBuilder(project, 'serve', '@ngaox/devkit:dev-server', true);
    writeBuilder(project, 'extract-i18n', '@ngaox/devkit:extract-i18n');
    writeBuilder(project, 'server', '@ngaox/devkit:server');

    if (!tree.exists(configPath)) {
      tree.create(configPath, getNgaoxConfigJsContent());
    }

    // get project and workspace root path
    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    return tree;
  };
}

function writeBuilder(
  project: WorkspaceProject,
  target: string,
  builder: string,
  mandatory = false
) {
  if (!project?.architect?.[target]) {
    if (mandatory) {
      throw new SchematicsException(
        `Cannot read the output path(architect.build.serve.builder) in angular.json`
      );
    }
    return;
  }
  project.architect[target] = {
    ...project.architect[target],
    builder
  };
}

function getNgaoxConfigJsContent() {
  return `
/**
 * @type {import('@ngaox/devkit').IBuilderOptions}
 */
module.exports = {
}
`;
}
