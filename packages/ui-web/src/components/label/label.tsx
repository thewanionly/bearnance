'use client';

import * as React from 'react';

import { cn } from '#lib/utils';
import { Label as LabelPrimitive } from 'radix-ui';

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-preset-5 text-grey-500 flex items-center gap-100 font-bold select-none',
        'group-data-[disabled=true]:text-grey-300 group-data-[disabled=true]:pointer-events-none',
        'peer-disabled:text-grey-300 peer-disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { Label };
