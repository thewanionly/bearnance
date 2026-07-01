import * as React from 'react';

import { cn } from '#lib/utils';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cssColorVariable } from '@bearnance/design-tokens/css';
import {
  type ButtonSize,
  type ButtonVariant,
  buttonContract,
} from '@bearnance/ui-core/button';

const buttonVariantClasses = {
  destructive: '',
  primary: '',
  secondary: '',
  tertiary: '',
} as const satisfies Record<ButtonVariant, string>;

const buttonToneClasses =
  'border-[var(--bearnance-button-border)] bg-[var(--bearnance-button-background)] text-[var(--bearnance-button-foreground)] hover:border-[var(--bearnance-button-hover-border)] hover:bg-[var(--bearnance-button-hover-background)] hover:text-[var(--bearnance-button-hover-foreground)] hover:opacity-[var(--bearnance-button-hover-opacity)] focus-visible:border-[var(--bearnance-button-border)] focus-visible:ring-[color-mix(in_oklab,var(--bearnance-button-border),transparent_70%)]';

const buttonSizeClasses = {
  compact:
    'min-h-10 gap-[var(--bearnance-spacing-100)] px-[var(--bearnance-spacing-200)] py-[var(--bearnance-spacing-100)] text-[length:var(--bearnance-font-size-text-preset-4)] leading-[var(--bearnance-line-height-text-preset-4)]',
  default:
    'min-h-[53px] gap-[var(--bearnance-spacing-100)] px-[var(--bearnance-spacing-200)] py-[var(--bearnance-spacing-200)] text-[length:var(--bearnance-font-size-text-preset-4)] leading-[var(--bearnance-line-height-text-preset-4)]',
} as const satisfies Record<ButtonSize, string>;

type ButtonCSSProperties = React.CSSProperties & {
  '--bearnance-button-background': string;
  '--bearnance-button-border': string;
  '--bearnance-button-foreground': string;
  '--bearnance-button-hover-background': string;
  '--bearnance-button-hover-border': string;
  '--bearnance-button-hover-foreground': string;
  '--bearnance-button-hover-opacity': number;
};

const getButtonStyle = (
  variant: ButtonVariant,
  style: React.CSSProperties | undefined
): ButtonCSSProperties => {
  const variantStates = buttonContract.variants[variant].states;

  return {
    '--bearnance-button-background': cssColorVariable(
      variantStates.default.backgroundColor
    ),
    '--bearnance-button-border': cssColorVariable(
      variantStates.default.borderColor
    ),
    '--bearnance-button-foreground': cssColorVariable(
      variantStates.default.foregroundColor
    ),
    '--bearnance-button-hover-background': cssColorVariable(
      variantStates.hover.backgroundColor
    ),
    '--bearnance-button-hover-border': cssColorVariable(
      variantStates.hover.borderColor
    ),
    '--bearnance-button-hover-foreground': cssColorVariable(
      variantStates.hover.foregroundColor
    ),
    '--bearnance-button-hover-opacity': variantStates.hover.opacity,
    ...style,
  };
};

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border bg-clip-padding font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    buttonToneClasses
  ),
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
      style={getButtonStyle(variant, style)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
