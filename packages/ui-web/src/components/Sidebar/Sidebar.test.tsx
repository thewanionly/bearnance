import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Sidebar.stories';

const { Default, Collapsed, WithLinks } = composeStories(stories);

describe('Sidebar', () => {
  it('renders expanded by default', () => {
    render(<Default />);

    expect(screen.getByRole('complementary')).toHaveAttribute(
      'data-state',
      'expanded'
    );
    expect(
      screen.getByRole('button', { name: 'Overview' })
    ).toBeInTheDocument();
  });

  it('marks the active nav item with data-active', () => {
    render(<Default />);

    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'data-active',
      'true'
    );
    expect(
      screen.getByRole('button', { name: 'Transactions' })
    ).toHaveAttribute('data-active', 'false');
  });

  it('toggles between expanded and collapsed via the in-sidebar toggle', async () => {
    const user = userEvent.setup();
    render(<Default />);

    const sidebar = screen.getByRole('complementary');
    const toggle = screen.getByRole('button', { name: /minimize menu/i });

    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);

    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates the toggle label so it always describes the next action', async () => {
    const user = userEvent.setup();
    render(<Default />);

    const toggle = screen.getByRole('button', { name: /minimize menu/i });
    await user.click(toggle);

    expect(
      screen.getByRole('button', { name: /maximize menu/i })
    ).toBeInTheDocument();
  });

  it('keeps nav rows at stable sizes and icon offsets', async () => {
    const user = userEvent.setup();
    render(<Default />);

    const overview = screen.getByRole('button', { name: 'Overview' });
    const toggle = screen.getByRole('button', { name: /minimize menu/i });

    expect(overview).toHaveClass('min-h-[56px]', 'px-400');
    expect(overview).toHaveClass(
      '[&>span:last-child]:[text-box:trim-both_cap_alphabetic]'
    );
    expect(overview).not.toHaveClass(
      'group-data-[state=collapsed]/sidebar:justify-center',
      'group-data-[state=collapsed]/sidebar:px-250'
    );
    expect(toggle).toHaveClass('min-h-[56px]', 'px-400');
    expect(toggle).not.toHaveClass(
      'group-data-[state=collapsed]/sidebar:justify-center',
      'group-data-[state=collapsed]/sidebar:px-250'
    );

    await user.click(toggle);

    const collapsedOverview = screen.getByRole('button', { name: 'Overview' });
    const collapsedToggle = screen.getByRole('button', {
      name: /maximize menu/i,
    });

    expect(collapsedOverview).toHaveClass('min-h-[56px]', 'px-400');
    expect(collapsedOverview).not.toHaveClass(
      'group-data-[state=collapsed]/sidebar:justify-center',
      'group-data-[state=collapsed]/sidebar:px-250'
    );
    expect(collapsedToggle).toHaveClass('min-h-[56px]', 'px-400');
    expect(collapsedToggle).not.toHaveClass(
      'group-data-[state=collapsed]/sidebar:justify-center',
      'group-data-[state=collapsed]/sidebar:px-250'
    );
  });

  it('keeps nav buttons accessible by name once collapsed', () => {
    render(<Collapsed />);

    expect(
      screen.getByRole('button', { name: 'Overview' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /maximize menu/i })
    ).toBeInTheDocument();
  });

  it('honors a collapsed default state', () => {
    render(<Collapsed />);

    expect(screen.getByRole('complementary')).toHaveAttribute(
      'data-state',
      'collapsed'
    );
  });

  it('supports rendering menu buttons as links via asChild', () => {
    render(<WithLinks />);

    const link = screen.getByRole('link', { name: 'Overview' });

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('data-slot', 'sidebar-menu-button');
    expect(link).toHaveAttribute('data-active', 'true');
  });
});
