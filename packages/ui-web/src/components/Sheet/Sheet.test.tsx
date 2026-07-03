import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Sheet.stories';

const { Default, WithActions, Left } = composeStories(stories);

describe('Sheet', () => {
  it('opens the sheet content when the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Default />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open sheet' }));

    const dialog = await screen.findByRole('dialog');

    expect(dialog).toHaveAttribute('data-slot', 'sheet-content');
    expect(dialog).toHaveAttribute('data-side', 'right');
    expect(
      screen.getByRole('heading', { name: 'Edit budget' })
    ).toBeInTheDocument();
  });

  it('closes the sheet when the built-in close button is activated', async () => {
    const user = userEvent.setup();
    render(<Default />);

    await user.click(screen.getByRole('button', { name: 'Open sheet' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the sheet from a footer action rendered via SheetClose', async () => {
    const user = userEvent.setup();
    render(<WithActions />);

    await user.click(screen.getByRole('button', { name: 'Delete pot' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports rendering from the left side', async () => {
    const user = userEvent.setup();
    render(<Left />);

    await user.click(screen.getByRole('button', { name: 'Open filters' }));

    expect(await screen.findByRole('dialog')).toHaveAttribute(
      'data-side',
      'left'
    );
  });
});
