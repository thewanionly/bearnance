# Bearnance UI Docs

Storybook documentation for Bearnance shared UI components.

## Stack

- Storybook 10 with React Vite
- React 19
- React Native Web for rendering mobile components in Storybook
- Tailwind CSS 4 for web component styles
- Shared Bearnance ESLint, Prettier, and TypeScript configs

## Getting Started

Install dependencies from the repository root:

```sh
pnpm install
```

Start Storybook from the repository root:

```sh
pnpm --filter ui-docs dev
```

You can also run the local package script from this directory:

```sh
pnpm dev
```

Storybook runs at [http://localhost:6006](http://localhost:6006).

## Scripts

Run these from the repository root unless noted otherwise.

| Command                                 | Description                            |
| --------------------------------------- | -------------------------------------- |
| `pnpm --filter ui-docs dev`             | Start Storybook on port 6006.          |
| `pnpm --filter ui-docs build:storybook` | Build static Storybook output.         |
| `pnpm --filter ui-docs lint`            | Run ESLint with zero warnings allowed. |
| `pnpm --filter ui-docs check-types`     | Run `tsc --noEmit`.                    |
| `pnpm --filter ui-docs format:check`    | Check formatting for this app.         |
| `pnpm --filter ui-docs format:fix`      | Format this app.                       |

## Project Layout

```text
apps/ui-docs
|-- .storybook/main.ts
|-- .storybook/preview.tsx
|-- eslint.config.mjs
|-- prettier.config.mjs
|-- tsconfig.json
|-- turbo.json
`-- vite.config.ts
```

## Development Notes

- Stories are discovered from `packages/ui-web/src/**/*.stories.*` and
  `packages/ui-mobile/src/**/*.stories.*`.
- Keep stories beside the component they document. For example, the web button
  story lives at `packages/ui-web/src/components/Button/Button.stories.tsx`.
- Mobile stories should set `parameters.platform` to `mobile` to render inside
  the phone-sized preview frame.
- `@bearnance/ui-web/globals.css` is loaded globally in `.storybook/preview.tsx`.
- `react-native` resolves to `react-native-web` in Storybook through
  `.storybook/main.ts`.
- Static builds are written to `storybook-static`, which is ignored by Git.
- Do not add barrel files.
