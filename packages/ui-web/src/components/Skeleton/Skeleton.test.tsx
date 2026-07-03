import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Skeleton.stories';

const { Default, Circle } = composeStories(stories);

describe('Skeleton', () => {
  it('renders a pulsing placeholder with the token-backed color', () => {
    render(<Default data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
    expect(skeleton).toHaveClass('bg-grey-100');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('merges custom classes', () => {
    render(<Circle data-testid="skeleton" />);

    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });
});
