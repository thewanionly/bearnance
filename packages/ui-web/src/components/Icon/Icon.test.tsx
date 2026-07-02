import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Icon.stories';

const { Brand, Default, Large } = composeStories(stories);

describe('Icon', () => {
  it('renders a curated Lucide system icon with the shared classes', () => {
    render(<Default data-testid="icon" />);

    const icon = screen.getByTestId('icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('shrink-0');
  });

  it('renders a brand icon from the generated registry', () => {
    render(<Brand data-testid="icon" />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies a named size token to the rendered svg', () => {
    render(<Large data-testid="icon" />);

    const icon = screen.getByTestId('icon');

    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });
});
