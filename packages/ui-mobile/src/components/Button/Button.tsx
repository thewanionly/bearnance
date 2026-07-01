import type { ReactNode } from 'react';

import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';
import { spacing } from '@bearnance/design-tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textPresets,
} from '@bearnance/design-tokens/typography';
import {
  type ButtonSize,
  type ButtonVariant,
  buttonContract,
  buttonSizes,
  buttonVariants,
} from '@bearnance/ui-core/button';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
};

export function Button({
  accessibilityState,
  children,
  disabled = false,
  onPress,
  size = buttonContract.defaultSize,
  style,
  textStyle,
  variant = buttonContract.defaultVariant,
  ...props
}: ButtonProps) {
  const isDisabled = disabled === true;
  const resolvedAccessibilityState: AccessibilityState = {
    ...accessibilityState,
    disabled: isDisabled,
  };

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityState={resolvedAccessibilityState}
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        buttonSizeStyles[size],
        buttonVariantStyles[variant],
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
      {...props}
    >
      <Text
        maxFontSizeMultiplier={1.2}
        style={[
          styles.label,
          textSizeStyles[size],
          textVariantStyles[variant],
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.82,
  },
});

const createButtonSizeStyles = () =>
  Object.fromEntries(
    buttonSizes.map((size) => {
      const sizeContract = buttonContract.sizes[size];

      return [
        size,
        {
          minHeight: sizeContract.minHeight,
          paddingHorizontal: spacing[sizeContract.paddingX],
          paddingVertical: spacing[sizeContract.paddingY],
        },
      ];
    })
  ) as Record<ButtonSize, ViewStyle>;

const createTextSizeStyles = () =>
  Object.fromEntries(
    buttonSizes.map((size) => {
      const sizeContract = buttonContract.sizes[size];
      const textPreset = textPresets[sizeContract.textPreset];

      return [
        size,
        {
          fontFamily: fontFamilies[textPreset.fontFamily],
          fontSize: fontSizes[textPreset.fontSize],
          fontWeight:
            `${fontWeights[textPreset.fontWeight]}` as TextStyle['fontWeight'],
          letterSpacing: textPreset.letterSpacing,
          lineHeight: textPreset.lineHeight,
        },
      ];
    })
  ) as Record<ButtonSize, TextStyle>;

const createButtonVariantStyles = () =>
  Object.fromEntries(
    buttonVariants.map((variant) => {
      const variantContract = buttonContract.variants[variant];

      return [
        variant,
        {
          backgroundColor: colors[variantContract.backgroundColor],
          borderColor: colors[variantContract.borderColor],
        },
      ];
    })
  ) as Record<ButtonVariant, ViewStyle>;

const createTextVariantStyles = () =>
  Object.fromEntries(
    buttonVariants.map((variant) => {
      const variantContract = buttonContract.variants[variant];

      return [
        variant,
        {
          color: colors[variantContract.foregroundColor],
        },
      ];
    })
  ) as Record<ButtonVariant, TextStyle>;

const buttonSizeStyles = StyleSheet.create(createButtonSizeStyles());
const textSizeStyles = StyleSheet.create(createTextSizeStyles());
const buttonVariantStyles = StyleSheet.create(createButtonVariantStyles());
const textVariantStyles = StyleSheet.create(createTextVariantStyles());
