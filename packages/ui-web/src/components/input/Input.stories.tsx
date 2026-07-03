import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'Web/Input',
  component: Input,
  parameters: {
    layout: 'centered',
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

export const Invalid: Story = {
  args: {
    placeholder: 'name@example.com',
    'aria-invalid': true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'name@example.com',
    disabled: true,
  },
};
