import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';

import { Button } from './Button';

describe('Button', () => {
  it('renders children', async () => {
    const { getByText } = await render(<Button>Start</Button>);

    expect(getByText('Start')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <Button onPress={onPress}>Start</Button>
    );

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(
      <Button disabled onPress={onPress}>
        Start
      </Button>
    );

    const button = getByRole('button');

    expect(button.props.onPress).toBeUndefined();
    button.props.onPress?.();

    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes disabled accessibility state', async () => {
    const { getByRole } = await render(<Button disabled>Start</Button>);

    expect(getByRole('button').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });
});
