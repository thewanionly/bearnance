import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Input.stories';

const { Default, Disabled, Invalid } = composeStories(stories);

describe('Input', () => {
  it('renders with the token-backed default styling', () => {
    render(<Default />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input).toHaveAttribute('data-slot', 'input');
    expect(input).toHaveClass('border-beige-500');
    expect(input).toHaveClass('rounded-[8px]');
    expect(input).toHaveClass('text-preset-4');
    expect(input).toHaveClass('placeholder:text-beige-500');
  });

  it('exposes the aria-invalid styling hook', () => {
    render(<Invalid />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('aria-invalid:border-red');
  });

  it('is disabled with the disabled tone classes', () => {
    render(<Disabled />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:border-grey-300');
    expect(input).toHaveClass('disabled:bg-beige-100');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Default />);

    const input = screen.getByPlaceholderText('name@example.com');
    await user.type(input, 'hi@bearnance.app');

    expect(input).toHaveValue('hi@bearnance.app');
  });
});
