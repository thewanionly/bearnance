import type { ColorToken } from '@bearnance/design-tokens/colors';
import type { SpacingToken } from '@bearnance/design-tokens/spacing';
import type { TextPresetToken } from '@bearnance/design-tokens/typography';

export const buttonVariants = [
  'primary',
  'secondary',
  'tertiary',
  'destructive',
] as const;

export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ['default', 'compact'] as const;

export type ButtonSize = (typeof buttonSizes)[number];

export const buttonStates = ['default', 'hover', 'focus', 'disabled'] as const;

export type ButtonState = (typeof buttonStates)[number];

type ButtonTone = {
  backgroundColor: ColorToken;
  borderColor: ColorToken;
  foregroundColor: ColorToken;
};

type ButtonSizeContract = {
  minHeight: number;
  paddingX: SpacingToken;
  paddingY: SpacingToken;
  textPreset: TextPresetToken;
};

export const buttonContract = {
  defaultSize: 'default',
  defaultVariant: 'primary',
  sizes: {
    compact: {
      minHeight: 40,
      paddingX: '200',
      paddingY: '100',
      textPreset: 'textPreset4Bold',
    },
    default: {
      minHeight: 53,
      paddingX: '200',
      paddingY: '200',
      textPreset: 'textPreset4Bold',
    },
  },
  variants: {
    destructive: {
      backgroundColor: 'red',
      borderColor: 'red',
      foregroundColor: 'white',
    },
    primary: {
      backgroundColor: 'grey900',
      borderColor: 'grey900',
      foregroundColor: 'white',
    },
    secondary: {
      backgroundColor: 'beige100',
      borderColor: 'beige100',
      foregroundColor: 'grey900',
    },
    tertiary: {
      backgroundColor: 'white',
      borderColor: 'white',
      foregroundColor: 'grey500',
    },
  },
} as const satisfies {
  defaultSize: ButtonSize;
  defaultVariant: ButtonVariant;
  sizes: Record<ButtonSize, ButtonSizeContract>;
  variants: Record<ButtonVariant, ButtonTone>;
};
