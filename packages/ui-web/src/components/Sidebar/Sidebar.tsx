'use client';

import * as React from 'react';

import { Icon } from '#components/Icon';
import { cn } from '#lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

type SidebarState = 'expanded' | 'collapsed';

type SidebarContextValue = {
  state: SidebarState;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.use(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export type SidebarProviderProps = {
  children: React.ReactNode;
  /** Uncontrolled initial expanded state. Defaults to `true`. */
  defaultExpanded?: boolean;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Called whenever the expanded state should change. */
  onExpandedChange?: (expanded: boolean) => void;
};

function SidebarProvider({
  children,
  defaultExpanded = true,
  expanded: expandedProp,
  onExpandedChange,
}: SidebarProviderProps) {
  const [internalExpanded, setInternalExpanded] =
    React.useState(defaultExpanded);
  const expanded = expandedProp ?? internalExpanded;

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (expandedProp === undefined) {
        setInternalExpanded(next);
      }
      onExpandedChange?.(next);
    },
    [expandedProp, onExpandedChange]
  );

  const toggle = React.useCallback(
    () => setExpanded(!expanded),
    [expanded, setExpanded]
  );

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state: expanded ? 'expanded' : 'collapsed',
      expanded,
      setExpanded,
      toggle,
    }),
    [expanded, setExpanded, toggle]
  );

  return <SidebarContext value={value}>{children}</SidebarContext>;
}

export type SidebarProps = React.ComponentProps<'aside'>;

/**
 * The dark, left-anchored navigation rail. It expands to the right and
 * collapses to an icon-only width, staying pinned to the left edge. Hidden
 * below the `lg` breakpoint, where the app uses the mobile bottom nav instead.
 */
function Sidebar({ className, children, ...props }: SidebarProps) {
  const { state } = useSidebar();

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      className={cn(
        'group/sidebar bg-grey-900 text-grey-300 hidden h-svh shrink-0 flex-col overflow-hidden rounded-tr-[16px] rounded-br-[16px] transition-[width] duration-300 ease-in-out lg:flex',
        'data-[state=collapsed]:w-[88px] data-[state=expanded]:w-[300px]',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export type SidebarHeaderProps = React.ComponentProps<'div'> & {
  /** Full wordmark, shown when the sidebar is expanded. */
  logo?: React.ReactNode;
  /** Compact mark, shown when the sidebar is collapsed. */
  logoMark?: React.ReactNode;
};

function SidebarHeader({
  className,
  logo,
  logoMark,
  children,
  ...props
}: SidebarHeaderProps) {
  const hasLogoSlots = logo !== undefined || logoMark !== undefined;

  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        'flex h-[101px] shrink-0 items-center overflow-hidden px-400',
        className
      )}
      {...props}
    >
      {hasLogoSlots ? (
        <>
          {logo && (
            <span
              data-slot="sidebar-logo"
              className="flex h-8 shrink-0 items-center group-data-[state=collapsed]/sidebar:hidden"
            >
              {logo}
            </span>
          )}
          {logoMark && (
            <span
              data-slot="sidebar-logo-mark"
              className="hidden h-8 shrink-0 items-center group-data-[state=collapsed]/sidebar:flex"
            >
              {logoMark}
            </span>
          )}
        </>
      ) : (
        children
      )}
    </div>
  );
}

export type SidebarContentProps = React.ComponentProps<'div'>;

function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'no-scrollbar flex min-h-0 flex-1 flex-col gap-50 overflow-y-auto pr-250 group-data-[state=collapsed]/sidebar:pr-150',
        className
      )}
      {...props}
    />
  );
}

export type SidebarMenuProps = React.ComponentProps<'ul'>;

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex w-full flex-col gap-50', className)}
      {...props}
    />
  );
}

export type SidebarMenuItemProps = React.ComponentProps<'li'>;

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn('w-full', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'flex min-h-[56px] w-full items-center gap-200 overflow-hidden rounded-r-xl border-l-4 px-400 py-200 text-preset-3 font-bold whitespace-nowrap outline-none transition-colors focus-visible:ring-3 focus-visible:ring-white/30 group-data-[state=collapsed]/sidebar:[&>span:last-child]:sr-only [&>span:last-child]:[text-box:trim-both_cap_alphabetic] [&_svg]:shrink-0',
  {
    variants: {
      isActive: {
        true: 'border-l-green bg-beige-100 text-grey-900 [&_svg]:text-green',
        false: 'border-l-transparent text-grey-300 hover:text-grey-100',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export type SidebarMenuButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
} & VariantProps<typeof sidebarMenuButtonVariants>;

function SidebarMenuButton({
  className,
  asChild = false,
  isActive = false,
  type,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ isActive }), className)}
      {...(asChild ? {} : { type: type ?? 'button' })}
      {...props}
    />
  );
}

export type SidebarFooterProps = React.ComponentProps<'div'>;

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        'flex shrink-0 flex-col gap-50 py-300 pr-250 group-data-[state=collapsed]/sidebar:pr-150',
        className
      )}
      {...props}
    />
  );
}

export type SidebarToggleProps = React.ComponentProps<'button'>;

/**
 * The minimize/maximize control. Lives inside the sidebar (typically the
 * footer) and points its arrow toward the collapse direction, rotating when
 * the sidebar is collapsed.
 */
function SidebarToggle({
  className,
  children,
  onClick,
  ...props
}: SidebarToggleProps) {
  const { state, toggle } = useSidebar();
  const label =
    children ?? (state === 'expanded' ? 'Minimize Menu' : 'Maximize Menu');

  return (
    <button
      type="button"
      data-slot="sidebar-toggle"
      aria-expanded={state === 'expanded'}
      onClick={(event) => {
        onClick?.(event);
        toggle();
      }}
      className={cn(
        'text-preset-3 text-grey-300 flex min-h-[56px] w-full items-center gap-200 overflow-hidden rounded-r-xl border-l-4 border-l-transparent px-400 py-200 font-bold whitespace-nowrap transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-white/30 [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      <Icon
        name="bearnance-arrow-fat-lines-left"
        className="transition-transform duration-300 group-data-[state=collapsed]/sidebar:rotate-180"
      />
      <span className="[text-box:trim-both_cap_alphabetic] group-data-[state=collapsed]/sidebar:sr-only">
        {label}
      </span>
    </button>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarToggle,
  sidebarMenuButtonVariants,
  useSidebar,
};
