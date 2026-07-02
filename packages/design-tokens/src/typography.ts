export const fontFamilies = {
  sans: 'Public Sans Variable',
} as const;

export type FontFamilyToken = keyof typeof fontFamilies;

export const fontWeights = {
  bold: 700,
  regular: 400,
} as const;

export type FontWeightToken = keyof typeof fontWeights;

export const fontSizes = {
  textPreset1: 32,
  textPreset2: 20,
  textPreset3: 16,
  textPreset4: 14,
  textPreset5: 12,
} as const;

export type FontSizeToken = keyof typeof fontSizes;

export const textPresets = {
  textPreset1: {
    figmaName: 'text-preset-1',
    fontFamily: 'sans',
    fontSize: 'textPreset1',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 38.4,
    lineHeightRatio: 1.2,
  },
  textPreset2: {
    figmaName: 'text-preset-2',
    fontFamily: 'sans',
    fontSize: 'textPreset2',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 24,
    lineHeightRatio: 1.2,
  },
  textPreset3: {
    figmaName: 'text-preset-3',
    fontFamily: 'sans',
    fontSize: 'textPreset3',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 24,
    lineHeightRatio: 1.5,
  },
  textPreset4: {
    figmaName: 'text-preset-4',
    fontFamily: 'sans',
    fontSize: 'textPreset4',
    fontWeight: 'regular',
    letterSpacing: 0,
    lineHeight: 21,
    lineHeightRatio: 1.5,
  },
  textPreset4Bold: {
    figmaName: 'text-preset-4-bold',
    fontFamily: 'sans',
    fontSize: 'textPreset4',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 21,
    lineHeightRatio: 1.5,
  },
  textPreset5: {
    figmaName: 'text-preset-5',
    fontFamily: 'sans',
    fontSize: 'textPreset5',
    fontWeight: 'regular',
    letterSpacing: 0,
    lineHeight: 18,
    lineHeightRatio: 1.5,
  },
  textPreset5Bold: {
    figmaName: 'text-preset-5-bold',
    fontFamily: 'sans',
    fontSize: 'textPreset5',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 18,
    lineHeightRatio: 1.5,
  },
} as const satisfies Record<
  string,
  {
    figmaName: string;
    fontFamily: FontFamilyToken;
    fontSize: FontSizeToken;
    fontWeight: FontWeightToken;
    letterSpacing: number;
    lineHeight: number;
    lineHeightRatio: number;
  }
>;

export type TextPresetToken = keyof typeof textPresets;
