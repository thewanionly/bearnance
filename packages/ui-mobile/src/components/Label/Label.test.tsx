import { colors } from '@bearnance/design-tokens/colors';
import { describe, expect, it } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react-native';

import * as stories from './Label.stories';

const { Default, Disabled } = composeStories(stories);

describe('Label', () => {
  it('renders its children with the default tone', async () => {
    await render(<Default />);

    const label = screen.getByText('Email');

    expect(label.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: colors.grey500 }),
      ])
    );
  });

  it('applies the disabled tone', async () => {
    await render(<Disabled />);

    const label = screen.getByText('Email');

    expect(label.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: colors.grey300 }),
      ])
    );
  });
});
