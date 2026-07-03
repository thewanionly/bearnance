import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Separator.stories';

const { Horizontal, Vertical } = composeStories(stories);

describe('Separator', () => {
  it('renders horizontally with the token-backed color', () => {
    render(<Horizontal data-testid="separator" />);

    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-slot', 'separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('bg-grey-100');
  });

  it('renders vertically', () => {
    render(<Vertical data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveAttribute(
      'data-orientation',
      'vertical'
    );
  });
});
