import { Input } from '#components/Input';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './Field';

const meta = {
  title: 'Web/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-[320px]">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" placeholder="name@example.com" />
      <FieldDescription>We never share your email.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="w-[320px]" data-invalid>
      <FieldLabel htmlFor="field-password">Password</FieldLabel>
      <Input id="field-password" type="password" aria-invalid />
      <FieldError errors={[{ message: 'Password is too short' }]} />
    </Field>
  ),
};

export const Grouped: Story = {
  render: () => (
    <FieldGroup className="w-[320px]">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Jane Doe" />
        </Field>
      </FieldSet>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="field-nickname">Nickname</FieldLabel>
        <Input id="field-nickname" placeholder="jdoe" />
      </Field>
    </FieldGroup>
  ),
};
