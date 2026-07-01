import type { ViewportWidthToken } from '@bearnance/design-tokens/breakpoints';
import type { SpacingToken } from '@bearnance/design-tokens/spacing';

export const appShellViewports = ['mobile', 'tablet', 'desktop'] as const;

export type AppShellViewport = (typeof appShellViewports)[number];

export const appShellContract = {
  contentPadding: {
    desktop: '400',
    mobile: '200',
    tablet: '400',
  },
  viewportOrder: ['mobile', 'tablet', 'desktop'],
} as const satisfies {
  contentPadding: Record<ViewportWidthToken, SpacingToken>;
  viewportOrder: readonly AppShellViewport[];
};
