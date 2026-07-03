import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'Mobile/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    platform: 'mobile',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'name@example.com',
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'name@example.com',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'name@example.com',
    editable: false,
  },
};
