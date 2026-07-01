export const spacing = {
  '50': 4,
  '100': 8,
  '150': 12,
  '200': 16,
  '250': 20,
  '300': 24,
  '400': 32,
  '500': 40,
} as const;

export type SpacingToken = keyof typeof spacing;

export const figmaSpacingVariableNames = {
  '50': 'spacing/50',
  '100': 'spacing/100',
  '150': 'spacing/150',
  '200': 'spacing/200',
  '250': 'spacing/250',
  '300': 'spacing/300',
  '400': 'spacing/400',
  '500': 'spacing/500',
} as const satisfies Record<SpacingToken, string>;
