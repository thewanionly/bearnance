<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Conventions

1. Prefer colocation. When creating a component or a function either that is reusable for several pages or just for the purpose of organization, prefer to store it as close to the files that uses it. For example, the `AuthCard` component used in `(auth)/login` and `(auth)/signup` are placed in `(auth)/_components` instead of `components` in the root of the `src` directory. For cases where a component or function is truly reusable across different pages, spanning across route groups, use the src root's `components` directory or `utils`, `lib`, `helpers`, `types`, or `constants`.
2. Prefix non-route folders inside `app` with `_`. Following Next.js [private folders](https://nextjs.org/docs/app/getting-started/project-structure#private-folders), prefix folders created within `app` with `_` (e.g. `_components`) to visually distinguish it from folders that are meant to be routes. This makes organizing files better.
