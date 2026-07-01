import type { ColorToken } from '@bearnance/design-tokens/colors';
import type { SpacingToken } from '@bearnance/design-tokens/spacing';

export const modalIntents = ['default', 'destructive'] as const;

export type ModalIntent = (typeof modalIntents)[number];

export const modalContract = {
  defaultIntent: 'default',
  intents: {
    default: {
      actionColor: 'grey900',
    },
    destructive: {
      actionColor: 'red',
    },
  },
  mobileWidth: 335,
  padding: '300',
} as const satisfies {
  defaultIntent: ModalIntent;
  intents: Record<
    ModalIntent,
    {
      actionColor: ColorToken;
    }
  >;
  mobileWidth: number;
  padding: SpacingToken;
};
