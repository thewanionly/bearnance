# AGENTS.md

Bearnance is a personal finance app that lets users manage their finances.

## Coding Conventions

- Do not write barrel files

## Creating components

When creating a new component in `@bearnance/ui-web` and `@bearnance/ui-mobile`, place it in `src/components`. Create a folder with the componetn name as name in pascal case (e.g. ComponentName). Inside the folder, it should contain at least the ff files:

- ComponentName.tsx (where the actual React component lives)
- ComponentName.test.tsx (Unit/Component testing using Jest and React Testing Library)
- ComponentName.stories.tsx (Storybook stories.)

It can contain other files such as ComponentName.utils.ts or ComponentName.constants.ts to colocate utils, constants, helpers, etc. within the component. The most important thing is don't creata a barrel file.

When writing components, make sure that they are reusable, strongly typed, scalable, accessible, and performant.

### Adding components from shadcn (ui-web)

When pulling a component with the shadcn CLI (`npx shadcn add <name>`), never keep the raw CLI output as-is:

- Restyle it with bearnance design tokens (color/spacing/typography classes from `@bearnance/design-tokens`, contracts from `@bearnance/ui-core` where one exists). No stock shadcn theme classes (e.g. `text-muted-foreground`, `bg-input`, `text-destructive`, `dark:*`) should remain.
- Move it out of the CLI's flat output file into its own PascalCase folder under `src/components` (e.g. `Input/Input.tsx`), following the component rules above — including tests and stories.
- Create the React Native equivalent in `@bearnance/ui-mobile` with the same folder structure, tests, and stories, so both packages expose the same set of components.

When writing tests in ComponentName.test.tsx, follow the ff guidelines:

- Use `userEvent` from `@testing-library/user-event`, not `fireEvent`
- Use `screen` from `@testing-library/react` when accessing the query functions like getByRole, not through the return of `render` method.
- Use `composeStories` to render the components created from the stories in the tests

## Commit Messages

- When asked to write a commit message, follow the conventions in Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/).
