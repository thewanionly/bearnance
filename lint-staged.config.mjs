import path from 'node:path';

const repoRoot = process.cwd();
const lintedCodeFilePattern =
  /^(apps\/api|apps\/docs-test|packages\/ui-test)\/.*\.(cjs|js|jsx|mjs|ts|tsx)$/;

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

  return `pnpm --filter ${filter} exec eslint --fix --max-warnings 0 ${workspaceFiles.join(' ')}`;
};

export default {
  '*': (files) =>
    commands(
      formatFiles(
        files.filter(
          (file) => !lintedCodeFilePattern.test(toRepoFilePath(file))
        )
      )
    ),
  'apps/api/**/*.{cjs,js,jsx,mjs,ts,tsx}': (files) => [
    ...commands(lintWorkspace('api', 'apps/api', files), formatFiles(files)),
  ],
  'apps/docs-test/**/*.{cjs,js,jsx,mjs,ts,tsx}': (files) => [
    ...commands(
      lintWorkspace('docs-test', 'apps/docs-test', files),
      formatFiles(files)
    ),
  ],
  'packages/ui-test/**/*.{cjs,js,jsx,mjs,ts,tsx}': (files) => [
    ...commands(
      lintWorkspace('@bearnance/ui-test', 'packages/ui-test', files),
      formatFiles(files)
    ),
  ],
};
