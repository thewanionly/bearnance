import * as React from 'react';

import { cn } from '#lib/utils';

export type SkeletonProps = React.ComponentProps<'div'>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-grey-100 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
