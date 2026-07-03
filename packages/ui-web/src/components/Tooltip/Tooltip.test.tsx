import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Tooltip.stories';

const { Default, Interactive } = composeStories(stories);

describe('Tooltip', () => {
  it('renders token-backed content when open', () => {
    render(<Default />);

    const tooltip = screen.getByTestId('tooltip-content');

    expect(tooltip).toHaveClass('bg-grey-900');
    expect(tooltip).toHaveClass('text-white');
    expect(tooltip).toHaveTextContent('Add a transaction');
  });

  it('shows the tooltip content on hover', async () => {
    const user = userEvent.setup();
    render(<Interactive />);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByRole('button', { name: 'Hover me' }));

    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Add a transaction'
    );
  });
});
