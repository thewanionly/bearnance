import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';

const meta = {
  title: 'Mobile/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    platform: 'mobile',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Email',
    disabled: true,
  },
};
