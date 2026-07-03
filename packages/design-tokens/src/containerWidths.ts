export const containerWidths = {
  limit: 1440,
} as const;

export type ContainerWidthToken = keyof typeof containerWidths;
