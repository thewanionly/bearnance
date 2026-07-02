import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const codeFileExtensions = 'cjs,js,jsx,mjs,ts,tsx';
const workspaceRoots = ['apps', 'packages'];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getLintableWorkspaces = () =>
  workspaceRoots.flatMap((workspaceRoot) => {
    const workspaceRootPath = path.join(repoRoot, workspaceRoot);

    if (!fs.existsSync(workspaceRootPath)) {
      return [];
    }

    return fs
      .readdirSync(workspaceRootPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))
      .flatMap((entry) => {
        const workspacePath = `${workspaceRoot}/${entry.name}`;
        const packageJsonPath = path.join(
          repoRoot,
          workspacePath,
          'package.json'
        );

        if (!fs.existsSync(packageJsonPath)) {
          return [];
        }

        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8')
        );

        if (!packageJson.name || !packageJson.scripts?.lint) {
          return [];
        }

        return [{ filter: packageJson.name, workspacePath }];
      });
  });

const lintableWorkspaces = getLintableWorkspaces();
const lintedCodeFilePattern =
  lintableWorkspaces.length > 0
    ? new RegExp(
        `^(?:${lintableWorkspaces
          .map(({ workspacePath }) => escapeRegExp(workspacePath))
          .join('|')})/.*\\.(?:${codeFileExtensions.replaceAll(',', '|')})$`
      )
    : /$^/;

const toAbsoluteFilePath = (file) =>
  path.isAbsolute(file) ? file : path.resolve(file);

const toRepoFilePath = (file) =>
  path.relative(repoRoot, toAbsoluteFilePath(file)).replaceAll(path.sep, '/');

const quote = (value) => `'${value.replaceAll("'", "'\\''")}'`;

const commands = (...tasks) => tasks.flat().filter(Boolean);

const formatFiles = (files) => {
  if (files.length === 0) {
    return null;
  }

  return `prettier --write --ignore-unknown ${files.map(toRepoFilePath).map(quote).join(' ')}`;
};

const lintWorkspace = (filter, workspacePath, files) => {
  if (files.length === 0) {
    return null;
  }

  const workspaceRoot = path.resolve(workspacePath);
  const workspaceFiles = files.map((file) => {
    const filePath = toAbsoluteFilePath(file);

    return quote(path.relative(workspaceRoot, filePath));
  });

  return `pnpm --filter ${filter} exec eslint --fix --max-warnings 0 --no-warn-ignored ${workspaceFiles.join(' ')}`;
};

const lintWorkspaceFiles = (filter, workspacePath) => (files) => [
  ...commands(lintWorkspace(filter, workspacePath, files), formatFiles(files)),
];

const workspaceTasks = Object.fromEntries(
  lintableWorkspaces.map(({ filter, workspacePath }) => [
    `${workspacePath}/**/*.{${codeFileExtensions}}`,
    lintWorkspaceFiles(filter, workspacePath),
  ])
);

export default {
  '*': (files) =>
    commands(
      formatFiles(
        files.filter(
          (file) => !lintedCodeFilePattern.test(toRepoFilePath(file))
        )
      )
    ),
  ...workspaceTasks,
};
