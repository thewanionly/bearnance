import type { ReactNode } from 'react';

import type { StyleProp, TextInputProps, TextStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';
import { spacing } from '@bearnance/design-tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from '@bearnance/design-tokens/typography';
import { type IconName } from '@bearnance/ui-core/icon';
import { inputContract } from '@bearnance/ui-core/input';

import { Field } from '../Field/Field';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';

export type InputFieldProps = Omit<TextInputProps, 'style'> & {
  /** Renders the error tone (e.g. failed validation). */
  error?: boolean;
  /** Optional helper text rendered below the input, right-aligned. */
  helperText?: string;
  /** Optional icon rendered inside the input, right-aligned (e.g. search). */
  icon?: IconName;
  /** Label rendered above the input, left-aligned. */
  label: string;
  /** Optional content rendered inside the input, left-aligned (e.g. "$"). */
  prefix?: ReactNode;
  style?: StyleProp<TextStyle>;
};

function InputField({
  editable = true,
  error = false,
  helperText,
  icon,
  label,
  prefix,
  style,
  ...props
}: InputFieldProps) {
  const disabled = !editable;

  return (
    <Field
      label={label}
      description={helperText}
      error={error}
      disabled={disabled}
    >
      <View style={styles.inputWrapper}>
        {prefix && (
          <View style={styles.prefixContainer} pointerEvents="none">
            {typeof prefix === 'string' ? (
              <Text style={styles.prefixText}>{prefix}</Text>
            ) : (
              prefix
            )}
          </View>
        )}
        <Input
          editable={editable}
          error={error}
          style={[
            prefix ? styles.inputWithPrefix : undefined,
            icon ? styles.inputWithIcon : undefined,
            style,
          ]}
          {...props}
        />
        {icon && (
          <View
            style={styles.iconContainer}
            pointerEvents="none"
            testID="input-field-icon"
          >
            <Icon name={icon} size="sm" color="grey500" />
          </View>
        )}
      </View>
    </Field>
  );
}

const prefixPreset = textPresets[inputContract.field.textPreset];

const styles = StyleSheet.create({
  iconContainer: {
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: spacing['250'],
    top: 0,
  },
  inputWithIcon: {
    paddingRight: spacing['400'],
  },
  inputWithPrefix: {
    paddingLeft: spacing['400'],
  },
  inputWrapper: {
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  prefixContainer: {
    bottom: 0,
    justifyContent: 'center',
    left: spacing['250'],
    position: 'absolute',
    top: 0,
  },
  prefixText: {
    color: colors.grey500,
    fontFamily: fontFamilies[prefixPreset.fontFamily],
    fontSize: fontSizes[prefixPreset.fontSize],
    fontWeight:
      `${fontWeights[prefixPreset.fontWeight]}` as TextStyle['fontWeight'],
  },
});

export { InputField };
