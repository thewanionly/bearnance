import { colors } from '@bearnance/design-tokens/colors';
import { describe, expect, it, jest } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { act, render, screen, userEvent } from '@testing-library/react-native';

import * as stories from './Input.stories';

const { Default, Disabled, ErrorState } = composeStories(stories);

describe('Input', () => {
  it('renders with a placeholder and the default border color', async () => {
    await render(<Default />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.beige500 }),
      ])
    );
  });

  it('applies the focus border color while focused', async () => {
    await render(<Default />);

    const input = screen.getByPlaceholderText('name@example.com');

    await act(async () => {
      input.props.onFocus();
    });

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.grey900 }),
      ])
    );

    await act(async () => {
      input.props.onBlur();
    });

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.beige500 }),
      ])
    );
  });

  it('applies the error border color', async () => {
    await render(<ErrorState />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.red }),
      ])
    );
  });

  it('applies the disabled border color and is not editable', async () => {
    await render(<Disabled />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input.props.editable).toBe(false);
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.grey300 }),
      ])
    );
  });

  it('calls onChangeText as the user types', async () => {
    const user = userEvent.setup();
    const onChangeText = jest.fn();
    await render(<Default onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText('name@example.com');
    await user.type(input, 'hi');

    expect(onChangeText).toHaveBeenCalled();
  });
});
