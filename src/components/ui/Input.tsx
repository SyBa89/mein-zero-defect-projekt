import { forwardRef, ComponentPropsWithoutRef, ElementRef } from 'react';
export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
}
const Input = forwardRef<ElementRef<'input'>, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={[
          'w-full px-4 py-2.5 rounded-[var(--theme-radius)] border',
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent outline-none transition',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
);
Input.displayName = 'Input';
export default Input;
