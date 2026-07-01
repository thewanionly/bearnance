export const shadows = {
  dropShadow: {
    blur: 24,
    color: 'rgba(0, 0, 0, 0.25)',
    offsetX: 0,
    offsetY: 4,
    spread: 0,
  },
} as const;

export type ShadowToken = keyof typeof shadows;

export const figmaEffectStyleNames = {
  dropShadow: 'drop-shadow',
} as const satisfies Record<ShadowToken, string>;
