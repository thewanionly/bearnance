import { type ColorToken, colors } from './colors';
import { shadows } from './effects';
import { spacing } from './spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from './typography';

const toRem = (px: number) => `${px / 16}rem`;

export const cssVariables = {
  '--bearnance-color-army-green': colors.armyGreen,
  '--bearnance-color-beige-100': colors.beige100,
  '--bearnance-color-beige-500': colors.beige500,
  '--bearnance-color-blue': colors.blue,
  '--bearnance-color-brown': colors.brown,
  '--bearnance-color-cyan': colors.cyan,
  '--bearnance-color-gold': colors.gold,
  '--bearnance-color-green': colors.green,
  '--bearnance-color-grey-100': colors.grey100,
  '--bearnance-color-grey-300': colors.grey300,
  '--bearnance-color-grey-500': colors.grey500,
  '--bearnance-color-grey-900': colors.grey900,
  '--bearnance-color-magenta': colors.magenta,
  '--bearnance-color-navy': colors.navy,
  '--bearnance-color-navy-grey': colors.navyGrey,
  '--bearnance-color-orange': colors.orange,
  '--bearnance-color-pink': colors.pink,
  '--bearnance-color-purple': colors.purple,
  '--bearnance-color-red': colors.red,
  '--bearnance-color-turquoise': colors.turquoise,
  '--bearnance-color-white': colors.white,
  '--bearnance-color-yellow': colors.yellow,
  '--bearnance-font-family-sans': `"${fontFamilies.sans}", sans-serif`,
  '--bearnance-font-size-text-preset-1': toRem(fontSizes.textPreset1),
  '--bearnance-font-size-text-preset-2': toRem(fontSizes.textPreset2),
  '--bearnance-font-size-text-preset-3': toRem(fontSizes.textPreset3),
  '--bearnance-font-size-text-preset-4': toRem(fontSizes.textPreset4),
  '--bearnance-font-size-text-preset-5': toRem(fontSizes.textPreset5),
  '--bearnance-font-weight-bold': String(fontWeights.bold),
  '--bearnance-font-weight-regular': String(fontWeights.regular),
  '--bearnance-line-height-text-preset-1': toRem(
    textPresets.textPreset1.lineHeight
  ),
  '--bearnance-line-height-text-preset-2': toRem(
    textPresets.textPreset2.lineHeight
  ),
  '--bearnance-line-height-text-preset-3': toRem(
    textPresets.textPreset3.lineHeight
  ),
  '--bearnance-line-height-text-preset-4': toRem(
    textPresets.textPreset4.lineHeight
  ),
  '--bearnance-line-height-text-preset-5': toRem(
    textPresets.textPreset5.lineHeight
  ),
  '--bearnance-shadow-drop': `${shadows.dropShadow.offsetX}px ${shadows.dropShadow.offsetY}px ${shadows.dropShadow.blur}px ${shadows.dropShadow.spread}px ${shadows.dropShadow.color}`,
  '--bearnance-spacing-50': toRem(spacing['50']),
  '--bearnance-spacing-100': toRem(spacing['100']),
  '--bearnance-spacing-150': toRem(spacing['150']),
  '--bearnance-spacing-200': toRem(spacing['200']),
  '--bearnance-spacing-250': toRem(spacing['250']),
  '--bearnance-spacing-300': toRem(spacing['300']),
  '--bearnance-spacing-400': toRem(spacing['400']),
  '--bearnance-spacing-500': toRem(spacing['500']),
} as const;

export type CSSVariableName = keyof typeof cssVariables;

export const cssVariable = (name: CSSVariableName) => `var(${name})`;

export const colorCssVariables = {
  armyGreen: '--bearnance-color-army-green',
  beige100: '--bearnance-color-beige-100',
  beige500: '--bearnance-color-beige-500',
  blue: '--bearnance-color-blue',
  brown: '--bearnance-color-brown',
  cyan: '--bearnance-color-cyan',
  gold: '--bearnance-color-gold',
  green: '--bearnance-color-green',
  grey100: '--bearnance-color-grey-100',
  grey300: '--bearnance-color-grey-300',
  grey500: '--bearnance-color-grey-500',
  grey900: '--bearnance-color-grey-900',
  magenta: '--bearnance-color-magenta',
  navy: '--bearnance-color-navy',
  navyGrey: '--bearnance-color-navy-grey',
  orange: '--bearnance-color-orange',
  pink: '--bearnance-color-pink',
  purple: '--bearnance-color-purple',
  red: '--bearnance-color-red',
  turquoise: '--bearnance-color-turquoise',
  white: '--bearnance-color-white',
  yellow: '--bearnance-color-yellow',
} as const satisfies Record<ColorToken, CSSVariableName>;

export const cssColorVariable = (name: ColorToken) =>
  cssVariable(colorCssVariables[name]);
