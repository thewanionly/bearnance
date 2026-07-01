import { Component, type ReactNode } from 'react';

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

type ButtonState = {
  isPressed: boolean;
};

export class Button extends Component<ButtonProps, ButtonState> {
  state: ButtonState = {
    isPressed: false,
  };

  render() {
    const {
      accessibilityState,
      children,
      disabled = false,
      onPress,
      onPressIn,
      onPressOut,
      size = buttonContract.defaultSize,
      style,
      textStyle,
      variant = buttonContract.defaultVariant,
      ...props
    } = this.props;
    const isDisabled = disabled === true;
    const isShowingInteractionState = this.state.isPressed && !isDisabled;
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
        onPressIn={(event) => {
          if (!isDisabled) {
            this.setState({ isPressed: true });
          }

          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          if (!isDisabled) {
            this.setState({ isPressed: false });
          }

          onPressOut?.(event);
        }}
        style={[
          styles.base,
          buttonSizeStyles[size],
          buttonVariantStyles[variant],
          isShowingInteractionState ? buttonVariantHoverStyles[variant] : null,
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
            isShowingInteractionState ? textVariantHoverStyles[variant] : null,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
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
      const defaultState = variantContract.states.default;

      return [
        variant,
        {
          backgroundColor: colors[defaultState.backgroundColor],
          borderColor: colors[defaultState.borderColor],
          opacity: defaultState.opacity,
        },
      ];
    })
  ) as Record<ButtonVariant, ViewStyle>;

const createButtonVariantHoverStyles = () =>
  Object.fromEntries(
    buttonVariants.map((variant) => {
      const variantContract = buttonContract.variants[variant];
      const hoverState = variantContract.states.hover;

      return [
        variant,
        {
          backgroundColor: colors[hoverState.backgroundColor],
          borderColor: colors[hoverState.borderColor],
          opacity: hoverState.opacity,
        },
      ];
    })
  ) as Record<ButtonVariant, ViewStyle>;

const createTextVariantStyles = () =>
  Object.fromEntries(
    buttonVariants.map((variant) => {
      const variantContract = buttonContract.variants[variant];
      const defaultState = variantContract.states.default;

      return [
        variant,
        {
          color: colors[defaultState.foregroundColor],
        },
      ];
    })
  ) as Record<ButtonVariant, TextStyle>;

const createTextVariantHoverStyles = () =>
  Object.fromEntries(
    buttonVariants.map((variant) => {
      const variantContract = buttonContract.variants[variant];
      const hoverState = variantContract.states.hover;

      return [
        variant,
        {
          color: colors[hoverState.foregroundColor],
        },
      ];
    })
  ) as Record<ButtonVariant, TextStyle>;

const buttonSizeStyles = StyleSheet.create(createButtonSizeStyles());
const textSizeStyles = StyleSheet.create(createTextSizeStyles());
const buttonVariantStyles = StyleSheet.create(createButtonVariantStyles());
const buttonVariantHoverStyles = StyleSheet.create(
  createButtonVariantHoverStyles()
);
const textVariantStyles = StyleSheet.create(createTextVariantStyles());
const textVariantHoverStyles = StyleSheet.create(
  createTextVariantHoverStyles()
);
