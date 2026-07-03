import type { Ref } from 'react';
import { useState } from 'react';

import type { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';
import { spacing } from '@bearnance/design-tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from '@bearnance/design-tokens/typography';
import { type InputState, inputContract } from '@bearnance/ui-core/input';

export type InputProps = Omit<TextInputProps, 'style'> & {
  /** Renders the error tone (e.g. failed validation). */
  error?: boolean;
  ref?: Ref<TextInput>;
  style?: StyleProp<TextStyle>;
};

function Input({
  editable = true,
  error = false,
  onBlur,
  onFocus,
  ref,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = !editable;
  const state: InputState = isDisabled
    ? 'disabled'
    : error
      ? 'error'
      : isFocused
        ? 'focus'
        : 'default';
  const stateContract = inputContract.states[state];

  return (
    <TextInput
      ref={ref}
      editable={editable}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      placeholderTextColor={colors[stateContract.placeholderColor]}
      style={[
        styles.base,
        {
          backgroundColor: colors[stateContract.backgroundColor],
          borderColor: colors[stateContract.borderColor],
          color: colors[stateContract.textColor],
        },
        style,
      ]}
      {...props}
    />
  );
}

const textPreset = textPresets[inputContract.field.textPreset];

const styles = StyleSheet.create({
  base: {
    borderCurve: 'continuous',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    fontFamily: fontFamilies[textPreset.fontFamily],
    fontSize: fontSizes[textPreset.fontSize],
    fontWeight:
      `${fontWeights[textPreset.fontWeight]}` as TextStyle['fontWeight'],
    minHeight: inputContract.field.minHeight,
    paddingHorizontal: spacing[inputContract.field.paddingX],
    paddingVertical: spacing[inputContract.field.paddingY],
    width: '100%',
  },
});

export { Input };
