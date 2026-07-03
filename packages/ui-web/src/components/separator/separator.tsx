'use client';

import * as React from 'react';

import { cn } from '#lib/utils';
import { Separator as SeparatorPrimitive } from 'radix-ui';

export type SeparatorProps = React.ComponentProps<
  typeof SeparatorPrimitive.Root
>;

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-grey-100 shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
