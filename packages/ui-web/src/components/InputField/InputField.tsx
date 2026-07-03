import * as React from 'react';

import { Field, FieldDescription, FieldLabel } from '#components/Field';
import { Icon } from '#components/Icon';
import { Input } from '#components/Input';
import { cn } from '#lib/utils';

import type { IconName } from '@bearnance/ui-core/icon';

export type InputFieldProps = Omit<React.ComponentProps<'input'>, 'prefix'> & {
  /** Optional helper text rendered below the input, right-aligned. */
  helperText?: string;
  /** Optional icon rendered inside the input, right-aligned (e.g. search). */
  icon?: IconName;
  /** Label rendered above the input, left-aligned. */
  label: string;
  /** Optional content rendered inside the input, left-aligned (e.g. "$"). */
  prefix?: React.ReactNode;
};

function InputField({
  className,
  helperText,
  icon,
  id,
  label,
  prefix,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <Field data-slot="input-field">
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <div className="relative flex items-center">
        {prefix && (
          <span className="text-preset-4 text-grey-500 pointer-events-none absolute left-250">
            {prefix}
          </span>
        )}
        <Input
          id={inputId}
          className={cn(prefix && 'pl-400', icon && 'pr-400', className)}
          {...props}
        />
        {icon && (
          <Icon
            name={icon}
            size="sm"
            data-testid="input-field-icon"
            className="text-grey-500 pointer-events-none absolute right-250"
          />
        )}
      </div>
      {helperText && (
        <FieldDescription className="text-right">{helperText}</FieldDescription>
      )}
    </Field>
  );
}

export { InputField };
