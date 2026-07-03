import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Field.stories';

const { Default, Grouped, WithError } = composeStories(stories);

describe('Field', () => {
  it('renders a group with a label wired to its control', () => {
    render(<Default />);

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'placeholder',
      'name@example.com'
    );
  });

  it('renders the description with the token-backed tone', () => {
    render(<Default />);

    const description = screen.getByText('We never share your email.');

    expect(description).toHaveClass('text-preset-5');
    expect(description).toHaveClass('text-grey-500');
  });

  it('renders errors as an alert with the error tone', () => {
    render(<WithError />);

    const error = screen.getByRole('alert');

    expect(error).toHaveTextContent('Password is too short');
    expect(error).toHaveClass('text-red');
  });

  it('renders grouped fields with a legend and separator', () => {
    render(<Grouped />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Nickname')).toBeInTheDocument();
  });
});
