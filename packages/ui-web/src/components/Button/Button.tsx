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
    'border-red bg-red text-white hover:border-red hover:bg-red hover:text-white hover:opacity-[0.86] focus-visible:ring-red/30',
  primary:
    'border-grey-900 bg-grey-900 text-white hover:border-grey-500 hover:bg-grey-500 hover:text-white focus-visible:ring-grey-900/30',
  secondary:
    'border-beige-100 bg-beige-100 text-grey-900 hover:border-beige-500 hover:bg-white hover:text-grey-900 focus-visible:ring-beige-500/30',
  tertiary:
    'border-white bg-white text-grey-500 hover:border-white hover:bg-white hover:text-grey-900 focus-visible:ring-grey-500/30',
} as const satisfies Record<ButtonVariant, string>;

const buttonSizeClasses = {
  compact: 'min-h-10 gap-100 px-200 py-100 text-preset-4',
  default: 'min-h-[53px] gap-100 px-200 py-200 text-preset-4',
} as const satisfies Record<ButtonSize, string>;

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border bg-clip-padding font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={style}
      {...props}
    />
  );
}

export { Button, buttonVariants };
