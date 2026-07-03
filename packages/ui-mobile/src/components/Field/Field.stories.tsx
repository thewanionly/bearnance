import { Text } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from './Field';

const meta = {
  title: 'Mobile/Field',
  component: Field,
  parameters: {
    layout: 'centered',
    platform: 'mobile',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    children: <Text>name@example.com</Text>,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Password',
    description: 'Must be at least 8 characters',
    children: <Text>••••••••</Text>,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    description: 'Enter a valid email address',
    error: true,
    children: <Text>not-an-email</Text>,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    children: <Text>name@example.com</Text>,
  },
};
