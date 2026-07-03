import { colors } from '@bearnance/design-tokens/colors';
import { describe, expect, it } from '@jest/globals';
import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react-native';

import * as stories from './Separator.stories';

const { Horizontal, Vertical } = composeStories(stories);

describe('Separator', () => {
  it('renders horizontally with the token-backed color', async () => {
    await render(<Horizontal testID="separator" />);

    // The separator is decorative and hidden from accessibility, so queries
    // must opt in to hidden elements.
    const separator = screen.getByTestId('separator', {
      includeHiddenElements: true,
    });

    expect(separator.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: colors.grey100 }),
        expect.objectContaining({ width: '100%' }),
      ])
    );
  });

  it('renders vertically', async () => {
    await render(<Vertical testID="separator" />);

    expect(
      screen.getByTestId('separator', { includeHiddenElements: true }).props
        .style
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ alignSelf: 'stretch' }),
      ])
    );
  });
});
