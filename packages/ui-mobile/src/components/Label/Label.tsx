import type { ReactNode } from 'react';

import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from '@bearnance/design-tokens/typography';

export type LabelProps = {
  children: ReactNode;
  /** Renders the disabled tone. */
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
};

function Label({ children, disabled = false, style }: LabelProps) {
  return (
    <Text style={[styles.base, disabled ? styles.disabled : null, style]}>
      {children}
    </Text>
  );
}

const labelPreset = textPresets.textPreset5Bold;

const styles = StyleSheet.create({
  base: {
    color: colors.grey500,
    fontFamily: fontFamilies[labelPreset.fontFamily],
    fontSize: fontSizes[labelPreset.fontSize],
    fontWeight:
      `${fontWeights[labelPreset.fontWeight]}` as TextStyle['fontWeight'],
    lineHeight: labelPreset.lineHeight,
    textAlign: 'left',
  },
  disabled: {
    color: colors.grey300,
  },
});

export { Label };
