import type { ReactNode } from 'react';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';
import { spacing } from '@bearnance/design-tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from '@bearnance/design-tokens/typography';
import { inputContract } from '@bearnance/ui-core/input';

import { Label } from '../Label/Label';

export type FieldProps = {
  children: ReactNode;
  /** Optional text rendered below `children`, right-aligned. */
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  /** Renders the label and description in their disabled tone. */
  disabled?: boolean;
  /** Renders the description in its error tone. */
  error?: boolean;
  /** Label rendered above `children`, left-aligned. */
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

function Field({
  children,
  description,
  descriptionStyle,
  disabled = false,
  error = false,
  label,
  labelStyle,
  style,
}: FieldProps) {
  const descriptionColor = disabled
    ? colors[inputContract.states.disabled.helperTextColor]
    : error
      ? colors[inputContract.states.error.helperTextColor]
      : colors[inputContract.states.default.helperTextColor];

  return (
    <View style={[styles.container, style]}>
      <Label disabled={disabled} style={labelStyle}>
        {label}
      </Label>
      {children}
      {description && (
        <Text
          style={[
            styles.description,
            { color: descriptionColor },
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      )}
    </View>
  );
}

const descriptionPreset = textPresets[inputContract.helperTextPreset];

const styles = StyleSheet.create({
  container: {
    gap: spacing['100'],
    width: '100%',
  },
  description: {
    fontFamily: fontFamilies[descriptionPreset.fontFamily],
    fontSize: fontSizes[descriptionPreset.fontSize],
    fontWeight:
      `${fontWeights[descriptionPreset.fontWeight]}` as TextStyle['fontWeight'],
    textAlign: 'right',
  },
});

export { Field };
