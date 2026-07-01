export const avatarSizes = ['entityList'] as const;

export type AvatarSize = (typeof avatarSizes)[number];

export const avatarContract = {
  defaultSize: 'entityList',
  sizes: {
    entityList: {
      height: 40,
      width: 40,
    },
  },
} as const satisfies {
  defaultSize: AvatarSize;
  sizes: Record<
    AvatarSize,
    {
      height: number;
      width: number;
    }
  >;
};
