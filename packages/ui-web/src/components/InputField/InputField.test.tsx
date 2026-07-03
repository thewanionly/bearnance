import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './InputField.stories';

const { Default, Disabled, Invalid, WithHelperText, WithIcon, WithPrefix } =
  composeStories(stories);

describe('InputField', () => {
  it('renders a label above the input, linked via htmlFor/id', () => {
    render(<Default />);

    const input = screen.getByLabelText('Email');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'name@example.com');
  });

  it('renders optional helper text', () => {
    render(<WithHelperText />);

    expect(
      screen.getByText('Must be at least 8 characters')
    ).toBeInTheDocument();
  });

  it('does not render helper text when omitted', () => {
    render(<Default />);

    expect(
      screen.queryByText('Must be at least 8 characters')
    ).not.toBeInTheDocument();
  });

  it('renders an optional prefix', () => {
    render(<WithPrefix />);

    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders an optional icon', () => {
    render(<WithIcon />);

    expect(screen.getByTestId('input-field-icon')).toBeInTheDocument();
  });

  it('applies the aria-invalid styling hook when invalid', () => {
    render(<Invalid />);

    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('disables the input', () => {
    render(<Disabled />);

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Default />);

    const input = screen.getByLabelText('Email');
    await user.type(input, 'hi@bearnance.app');

    expect(input).toHaveValue('hi@bearnance.app');
  });
});
