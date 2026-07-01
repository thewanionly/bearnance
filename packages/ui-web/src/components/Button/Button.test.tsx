import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Button.stories';

const { Default, Disabled, Outline } = composeStories(stories);

describe('Button', () => {
  it('renders children in a button element', () => {
    render(<Default />);

    const button = screen.getByRole('button', { name: 'Start' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-size', 'default');
  });

  it('merges variant, size, and custom classes', () => {
    render(<Outline className="custom-class" size="sm" />);

    const button = screen.getByRole('button', { name: 'Start' });

    expect(button).toHaveClass('border-border');
    expect(button).toHaveClass('h-7');
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Default onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Start' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Disabled onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Start' });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports rendering as a child element', () => {
    render(
      <Default asChild variant="link">
        <a href="/transactions">Transactions</a>
      </Default>
    );

    const link = screen.getByRole('link', { name: 'Transactions' });

    expect(link).toHaveAttribute('href', '/transactions');
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link).toHaveAttribute('data-variant', 'link');
    expect(link).toHaveClass('text-primary');
  });
});
