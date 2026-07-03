import { type ReactNode, createElement, forwardRef } from 'react';

type PressableState = {
  focused: boolean;
  hovered: boolean;
  pressed: boolean;
};

type MockComponentProps = {
  children?: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: unknown;
};

const pressableState: PressableState = {
  focused: false,
  hovered: false,
  pressed: false,
};

export function Pressable({
  children,
  disabled,
  onPress,
  style,
  ...props
}: MockComponentProps) {
  return createElement(
    'Pressable',
    {
      ...props,
      disabled,
      onPress: disabled ? undefined : onPress,
      style: typeof style === 'function' ? style(pressableState) : style,
    },
    children
  );
}

export function Text({ children, ...props }: MockComponentProps) {
  return createElement('Text', props, children);
}

export function View({ children, ...props }: MockComponentProps) {
  return createElement('View', props, children);
}

export const TextInput = forwardRef<unknown, Record<string, unknown>>(
  function TextInput(props, ref) {
    return createElement('TextInput', { ...props, ref });
  }
);

export const StyleSheet = {
  create<T>(styles: T) {
    return styles;
  },
  flatten(style: unknown) {
    return style;
  },
  hairlineWidth: 1,
};
