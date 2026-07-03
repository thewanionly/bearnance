import { iconNames } from '@bearnance/ui-core/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputField } from './InputField';

const meta = {
  title: 'Mobile/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    platform: 'mobile',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    prefix: '$',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search transactions',
    icon: 'search',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    error: true,
    helperText: 'Enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    editable: false,
  },
};
