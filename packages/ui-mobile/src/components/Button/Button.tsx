import type { ReactNode } from 'react';

import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';

export type ButtonSize = 'default' | 'sm' | 'lg';

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
  size = 'default',
  style,
  textStyle,
  variant = 'default',
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

const buttonSizeStyles = StyleSheet.create<Record<ButtonSize, ViewStyle>>({
  default: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sm: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

const textSizeStyles = StyleSheet.create<Record<ButtonSize, TextStyle>>({
  default: {
    fontSize: 15,
    lineHeight: 20,
  },
  lg: {
    fontSize: 16,
    lineHeight: 22,
  },
  sm: {
    fontSize: 14,
    lineHeight: 18,
  },
});

const buttonVariantStyles = StyleSheet.create<Record<ButtonVariant, ViewStyle>>(
  {
    default: {
      backgroundColor: '#111827',
      borderColor: '#111827',
    },
    destructive: {
      backgroundColor: '#dc2626',
      borderColor: '#dc2626',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#d1d5db',
    },
    secondary: {
      backgroundColor: '#f3f4f6',
      borderColor: '#e5e7eb',
    },
  }
);

const textVariantStyles = StyleSheet.create<Record<ButtonVariant, TextStyle>>({
  default: {
    color: '#ffffff',
  },
  destructive: {
    color: '#ffffff',
  },
  ghost: {
    color: '#111827',
  },
  outline: {
    color: '#111827',
  },
  secondary: {
    color: '#111827',
  },
});
