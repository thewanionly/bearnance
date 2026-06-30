import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Mobile/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    platform: 'mobile',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Start',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Start',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Start',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Start',
    variant: 'destructive',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Start',
    disabled: true,
  },
};
