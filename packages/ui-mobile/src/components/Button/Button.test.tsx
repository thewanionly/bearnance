import { describe, expect, it, jest } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { render, screen, userEvent } from '@testing-library/react-native';

import * as stories from './Button.stories';

const { Default, Disabled } = composeStories(stories);

describe('Button', () => {
  it('renders children', async () => {
    await render(<Default />);

    expect(screen.getByText('Start')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<Default onPress={onPress} />);

    await user.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<Disabled onPress={onPress} />);

    const button = screen.getByRole('button');

    expect(button.props.onPress).toBeUndefined();

    await user.press(button);

    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes disabled accessibility state', async () => {
    await render(<Disabled />);

    expect(screen.getByRole('button').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });
});
