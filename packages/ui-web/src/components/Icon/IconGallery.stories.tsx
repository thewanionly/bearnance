import type { CSSProperties, ReactElement } from 'react';

import { type IconName, brandIconNames } from '@bearnance/ui-core/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';

/**
 * A hand-picked subset of the curated Lucide system icons — the gallery
 * intentionally shows a representative sample, not the full set.
 */
const gallerySystemIcons = [
  'arrow-right',
  'bell',
  'check',
  'chevron-down',
  'credit-card',
  'plus',
  'search',
  'settings',
  'trending-up',
  'wallet',
] as const satisfies readonly IconName[];

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
  gap: 8,
  padding: 24,
  color: '#201f24',
};

const cellStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: '16px 8px',
  border: '1px solid #f2f2f2',
  borderRadius: 12,
  textAlign: 'center',
};

const captionStyle: CSSProperties = {
  fontSize: 12,
  color: '#696868',
  wordBreak: 'break-word',
};

function IconGrid({ names }: { names: readonly IconName[] }): ReactElement {
  return (
    <div style={gridStyle}>
      {names.map((name) => (
        <div key={name} style={cellStyle}>
          <Icon name={name} size="lg" />
          <span style={captionStyle}>{name}</span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/** Every brand / Figma-authored icon, sourced from `brandIconNames`. */
export const BrandIcons: Story = {
  render: () => <IconGrid names={brandIconNames} />,
};

/** A curated subset of the Lucide system icons. */
export const SystemIcons: Story = {
  render: () => <IconGrid names={gallerySystemIcons} />,
};
