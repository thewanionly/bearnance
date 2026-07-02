import { brandIconNames } from './brand-icons.generated';

/**
 * Curated set of Lucide system icons the design system exposes. Keep this list
 * intentionally small — each name here must have an explicit `lucide-react` /
 * `lucide-react-native` import in the platform `Icon` renderers, which keeps the
 * icon bundles tree-shakeable. Add a name here (and to both renderers' maps)
 * when the team standardizes on a new system icon.
 */
export const systemIconNames = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'bell',
  'check',
  'chevron-down',
  'chevron-right',
  'credit-card',
  'log-out',
  'menu',
  'plus',
  'search',
  'settings',
  'trending-up',
  'user',
  'wallet',
  'x',
] as const;

export type SystemIconName = (typeof systemIconNames)[number];

/**
 * Brand / designer-authored icon names, generated from the SVG files in
 * `packages/ui-core/icons/svg`. Re-exported here so consumers have a single
 * import site for every icon name.
 */
export { brandIconNames };

export type BrandIconName = (typeof brandIconNames)[number];

/** Every valid `<Icon name>` value: system (Lucide) plus brand (Figma) icons. */
export const iconNames = [...systemIconNames, ...brandIconNames] as const;

export type IconName = SystemIconName | BrandIconName;

/** Named icon sizes (px). `<Icon>` also accepts a raw number. */
export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
} as const satisfies Record<string, number>;

export type IconSize = keyof typeof iconSizes;
