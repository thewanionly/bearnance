import { Button } from '#components/Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

const meta = {
  title: 'Web/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button size="compact">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit budget</SheetTitle>
          <SheetDescription>
            Update the details of this budget.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button size="compact">Delete pot</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete this pot?</SheetTitle>
          <SheetDescription>
            This action cannot be reversed, and all the data inside it will be
            removed forever.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button variant="destructive" size="compact">
            Yes, confirm deletion
          </Button>
          <SheetClose asChild>
            <Button variant="secondary" size="compact">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button size="compact">Open filters</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine the transactions list.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
