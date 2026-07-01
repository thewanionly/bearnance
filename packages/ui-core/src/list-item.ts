import type { SpacingToken } from '@bearnance/design-tokens/spacing';
import type { TextPresetToken } from '@bearnance/design-tokens/typography';

import type { AvatarSize } from './avatar';

export const entityListItemKinds = ['person', 'company'] as const;

export type EntityListItemKind = (typeof entityListItemKinds)[number];

export const entityListItemContract = {
  avatarSize: 'entityList',
  contentGap: '200',
  kinds: {
    company: {
      titleTextPreset: 'textPreset4Bold',
    },
    person: {
      titleTextPreset: 'textPreset4Bold',
    },
  },
  metadataTextPreset: 'textPreset5',
  minHeight: 40,
} as const satisfies {
  avatarSize: AvatarSize;
  contentGap: SpacingToken;
  kinds: Record<
    EntityListItemKind,
    {
      titleTextPreset: TextPresetToken;
    }
  >;
  metadataTextPreset: TextPresetToken;
  minHeight: number;
};
