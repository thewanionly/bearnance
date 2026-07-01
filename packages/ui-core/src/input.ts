import type { ColorToken } from '@bearnance/design-tokens/colors';
import type { SpacingToken } from '@bearnance/design-tokens/spacing';
import type { TextPresetToken } from '@bearnance/design-tokens/typography';

export const inputStates = ['default', 'focus', 'error', 'disabled'] as const;

export type InputState = (typeof inputStates)[number];

type InputStateContract = {
  backgroundColor: ColorToken;
  borderColor: ColorToken;
  helperTextColor: ColorToken;
  labelColor: ColorToken;
  placeholderColor: ColorToken;
  textColor: ColorToken;
};

export const inputContract = {
  defaultState: 'default',
  field: {
    minHeight: 45,
    paddingX: '250',
    paddingY: '150',
    textPreset: 'textPreset4',
  },
  helperTextPreset: 'textPreset5',
  labelTextPreset: 'textPreset5Bold',
  states: {
    default: {
      backgroundColor: 'white',
      borderColor: 'beige500',
      helperTextColor: 'grey500',
      labelColor: 'grey500',
      placeholderColor: 'beige500',
      textColor: 'grey900',
    },
    disabled: {
      backgroundColor: 'beige100',
      borderColor: 'grey300',
      helperTextColor: 'grey300',
      labelColor: 'grey300',
      placeholderColor: 'grey300',
      textColor: 'grey500',
    },
    error: {
      backgroundColor: 'white',
      borderColor: 'red',
      helperTextColor: 'red',
      labelColor: 'grey500',
      placeholderColor: 'beige500',
      textColor: 'grey900',
    },
    focus: {
      backgroundColor: 'white',
      borderColor: 'grey900',
      helperTextColor: 'grey500',
      labelColor: 'grey500',
      placeholderColor: 'beige500',
      textColor: 'grey900',
    },
  },
} as const satisfies {
  defaultState: InputState;
  field: {
    minHeight: number;
    paddingX: SpacingToken;
    paddingY: SpacingToken;
    textPreset: TextPresetToken;
  };
  helperTextPreset: TextPresetToken;
  labelTextPreset: TextPresetToken;
  states: Record<InputState, InputStateContract>;
};
