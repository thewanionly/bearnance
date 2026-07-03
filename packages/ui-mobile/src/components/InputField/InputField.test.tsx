import { colors } from '@bearnance/design-tokens/colors';
import { describe, expect, it, jest } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { act, render, screen, userEvent } from '@testing-library/react-native';

import * as stories from './InputField.stories';

// `lucide-react-native` pulls in `react-native-svg`, which reaches into
// native RN internals (Touchable, PanResponder) this package's minimal RN
// jest mock doesn't provide. Stub the icon renderer so importing InputField
// doesn't load that chain — matches ui-mobile's Icon component itself having
// no test suite for the same reason.
jest.mock('../Icon/Icon', () => ({
  Icon: () => null,
}));

const { Default, Disabled, ErrorState, WithHelperText, WithIcon, WithPrefix } =
  composeStories(stories);

describe('InputField', () => {
  it('renders a label above the input', async () => {
    await render(<Default />);

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('name@example.com')).toBeTruthy();
  });

  it('renders optional helper text', async () => {
    await render(<WithHelperText />);

    expect(screen.getByText('Must be at least 8 characters')).toBeTruthy();
  });

  it('renders an optional prefix', async () => {
    await render(<WithPrefix />);

    expect(screen.getByText('$')).toBeTruthy();
  });

  it('renders an optional icon', async () => {
    await render(<WithIcon />);

    expect(screen.getByTestId('input-field-icon')).toBeTruthy();
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

  it('renders the error tone on the input border and helper text', async () => {
    await render(<ErrorState />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.red }),
      ])
    );

    const helperText = screen.getByText('Enter a valid email address');

    expect(helperText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: colors.red })])
    );
  });

  it('disables the input and applies the disabled tone', async () => {
    await render(<Disabled />);

    const input = screen.getByPlaceholderText('name@example.com');

    expect(input.props.editable).toBe(false);
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: colors.grey300 }),
      ])
    );

    const label = screen.getByText('Email');

    expect(label.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: colors.grey300 }),
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
