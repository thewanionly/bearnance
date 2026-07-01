import type { ColorToken } from '@bearnance/design-tokens/colors';
import type { TextPresetToken } from '@bearnance/design-tokens/typography';

export const navigationItemStates = ['default', 'active', 'hover'] as const;

export type NavigationItemState = (typeof navigationItemStates)[number];

type NavigationItemStateContract = {
  backgroundColor: ColorToken;
  indicatorColor: ColorToken;
  labelColor: ColorToken;
};

export const sidebarNavigationContract = {
  defaultState: 'default',
  itemTextPreset: 'textPreset3',
  states: {
    active: {
      backgroundColor: 'beige100',
      indicatorColor: 'green',
      labelColor: 'grey900',
    },
    default: {
      backgroundColor: 'grey900',
      indicatorColor: 'grey900',
      labelColor: 'grey300',
    },
    hover: {
      backgroundColor: 'grey900',
      indicatorColor: 'grey900',
      labelColor: 'white',
    },
  },
} as const satisfies {
  defaultState: NavigationItemState;
  itemTextPreset: TextPresetToken;
  states: Record<NavigationItemState, NavigationItemStateContract>;
};
