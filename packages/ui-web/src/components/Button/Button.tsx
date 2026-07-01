import * as React from 'react';

import { cn } from '#lib/utils';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import {
  type ButtonSize,
  type ButtonVariant,
  buttonContract,
} from '@bearnance/ui-core/button';

const buttonVariantClasses = {
  destructive:
    'border-[var(--bearnance-color-red)] bg-[var(--bearnance-color-red)] text-[var(--bearnance-color-white)] hover:bg-[color-mix(in_oklab,var(--bearnance-color-red),var(--bearnance-color-grey-900)_12%)] focus-visible:border-[var(--bearnance-color-red)] focus-visible:ring-[color-mix(in_oklab,var(--bearnance-color-red),transparent_70%)]',
  primary:
    'border-[var(--bearnance-color-grey-900)] bg-[var(--bearnance-color-grey-900)] text-[var(--bearnance-color-white)] hover:bg-[color-mix(in_oklab,var(--bearnance-color-grey-900),var(--bearnance-color-white)_12%)] focus-visible:border-[var(--bearnance-color-grey-900)] focus-visible:ring-[color-mix(in_oklab,var(--bearnance-color-grey-900),transparent_70%)]',
  secondary:
    'border-[var(--bearnance-color-beige-100)] bg-[var(--bearnance-color-beige-100)] text-[var(--bearnance-color-grey-900)] hover:bg-[color-mix(in_oklab,var(--bearnance-color-beige-100),var(--bearnance-color-grey-900)_8%)] focus-visible:border-[var(--bearnance-color-grey-900)] focus-visible:ring-[color-mix(in_oklab,var(--bearnance-color-grey-900),transparent_70%)]',
  tertiary:
    'border-[var(--bearnance-color-white)] bg-[var(--bearnance-color-white)] text-[var(--bearnance-color-grey-500)] hover:text-[var(--bearnance-color-grey-900)] focus-visible:border-[var(--bearnance-color-grey-900)] focus-visible:ring-[color-mix(in_oklab,var(--bearnance-color-grey-900),transparent_70%)]',
} as const satisfies Record<ButtonVariant, string>;

const buttonSizeClasses = {
  compact:
    'min-h-10 gap-[var(--bearnance-spacing-100)] px-[var(--bearnance-spacing-200)] py-[var(--bearnance-spacing-100)] text-[length:var(--bearnance-font-size-text-preset-4)] leading-[var(--bearnance-line-height-text-preset-4)]',
  default:
    'min-h-[53px] gap-[var(--bearnance-spacing-100)] px-[var(--bearnance-spacing-200)] py-[var(--bearnance-spacing-200)] text-[length:var(--bearnance-font-size-text-preset-4)] leading-[var(--bearnance-line-height-text-preset-4)]',
} as const satisfies Record<ButtonSize, string>;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: buttonSizeClasses,
      variant: buttonVariantClasses,
    },
    defaultVariants: {
      size: buttonContract.defaultSize,
      variant: buttonContract.defaultVariant,
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

function Button({
  className,
  variant = buttonContract.defaultVariant,
  size = buttonContract.defaultSize,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
