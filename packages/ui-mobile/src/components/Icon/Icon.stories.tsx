import { colors } from '@bearnance/design-tokens/colors';
import { iconNames } from '@bearnance/ui-core/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';

const meta = {
  title: 'Mobile/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    platform: 'mobile',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [...iconNames],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: Object.keys(colors),
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'wallet',
  },
};

export const Brand: Story = {
  args: {
    name: 'bearnance-pot',
  },
};

export const Colored: Story = {
  args: {
    name: 'trending-up',
    color: 'green',
  },
};
