# Contributing to the project

This file will describe different aspects (naming commits, creating PRs) on how to contribute to the project.

## Before committing

Install dependencies before making commits so Git hooks are available:

```sh
pnpm install
```

Commits use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
format. You can write commit messages yourself or use the guided prompt:

```sh
pnpm cz
```

Before each commit, staged files are formatted and linted. Commit messages are
checked automatically, including commits created from Cursor's Source Control
view.
