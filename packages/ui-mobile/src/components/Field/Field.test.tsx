import { colors } from '@bearnance/design-tokens/colors';
import { describe, expect, it } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react-native';

import * as stories from './Field.stories';

const { Default, Disabled, ErrorState, WithDescription } =
  composeStories(stories);

describe('Field', () => {
  it('renders a label above the children', async () => {
    await render(<Default />);

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('name@example.com')).toBeTruthy();
  });

  it('renders optional description text', async () => {
    await render(<WithDescription />);

    expect(screen.getByText('Must be at least 8 characters')).toBeTruthy();
  });

  it('does not render description text when omitted', async () => {
    await render(<Default />);

    expect(screen.queryByText(/must be at least/i)).toBeNull();
  });

  it('applies the error tone to the description', async () => {
    await render(<ErrorState />);

    const description = screen.getByText('Enter a valid email address');

    expect(description.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: colors.red })])
    );
  });

  it('applies the disabled tone to the label', async () => {
    await render(<Disabled />);

    const label = screen.getByText('Email');

    expect(label.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: colors.grey300 }),
      ])
    );
  });
});
