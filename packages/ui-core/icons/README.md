# Brand icons

Canonical, platform-neutral source of truth for **brand / designer-authored
icons** (glyphs that don't exist in Lucide). Generic UI icons come from Lucide
and are **not** kept here.

## Adding a brand icon (from Figma)

1. In Figma, export the icon as **SVG** — single color, drawn on a square frame
   (a `0 0 24 24` viewBox is ideal).
2. Save it into [`svg/`](./svg) with a **kebab-case** filename. The filename is
   the icon's public name, e.g. `bearnance-pot.svg` → `<Icon name="bearnance-pot" />`.
3. Run the codegen:

   ```sh
   pnpm --filter @bearnance/ui-core gen:icons
   ```

4. Commit the new `.svg` **and** the generated output:
   - `packages/ui-core/src/brand-icons.generated.ts` (name manifest)
   - `packages/ui-web/src/components/icons/generated/*` (web `<svg>` components)
   - `packages/ui-mobile/src/components/icons/generated/*` (`react-native-svg`)

The icon is then usable as `<Icon name="…" />` on both web and mobile, fully typed.

## Notes

- Colors are normalized to `currentColor` during codegen, so brand icons inherit
  the surrounding text color (web) / the `color` prop (mobile). Author them as a
  single solid color; multi-color artwork will be flattened.
- Generated files are committed and checked for staleness in CI via
  `pnpm --filter @bearnance/ui-core check:icons`. Do not edit them by hand.
- The seed icons (`bearnance-pot`, `bearnance-coin`) are placeholders — replace
  them with real exports.
