import * as React from 'react';

import { cn } from '#lib/utils';

export type InputProps = React.ComponentProps<'input'>;

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-beige-500 text-preset-4 text-grey-900 min-h-[45px] w-full min-w-0 rounded-[8px] border bg-white px-250 py-150 transition-colors outline-none',
        'placeholder:text-beige-500',
        'focus-visible:border-grey-900',
        'aria-invalid:border-red',
        'disabled:border-grey-300 disabled:bg-beige-100 disabled:text-grey-500 disabled:placeholder:text-grey-300 disabled:pointer-events-none disabled:cursor-not-allowed',
        'file:text-grey-900 file:inline-flex file:border-0 file:bg-transparent file:font-bold',
        className
      )}
      {...props}
    />
  );
}

export { Input };
