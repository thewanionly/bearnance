export const viewportWidths = {
  desktop: 1440,
  mobile: 375,
  tablet: 768,
} as const;

export type ViewportWidthToken = keyof typeof viewportWidths;
