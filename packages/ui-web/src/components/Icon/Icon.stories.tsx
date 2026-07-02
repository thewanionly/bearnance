import { iconNames } from '@bearnance/ui-core/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';

const meta = {
  title: 'Web/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
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

export const Large: Story = {
  args: {
    name: 'settings',
    size: 'lg',
  },
};
