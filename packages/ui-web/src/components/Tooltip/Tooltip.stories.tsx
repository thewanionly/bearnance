import { Button } from '#components/Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Web/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args} open>
      <TooltipTrigger asChild>
        <Button size="compact">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent data-testid="tooltip-content">
        Add a transaction
      </TooltipContent>
    </Tooltip>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button size="compact">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add a transaction</TooltipContent>
    </Tooltip>
  ),
};
