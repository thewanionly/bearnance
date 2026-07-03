import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { colors } from '@bearnance/design-tokens/colors';

export type SeparatorProps = Omit<ViewProps, 'style'> & {
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
};

function Separator({
  orientation = 'horizontal',
  style,
  ...props
}: SeparatorProps) {
  return (
    <View
      accessibilityElementsHidden
      style={[
        styles.base,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.grey100,
  },
  horizontal: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
    width: StyleSheet.hairlineWidth,
  },
});

export { Separator };
