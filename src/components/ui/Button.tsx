import { forwardRef, ComponentPropsWithoutRef, ElementRef } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  loading?: boolean;
}
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--theme-primary)] hover:brightness-110 text-white shadow-token-lg hover:shadow-token-xl',
  secondary:
    'bg-[var(--color-surface)] dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-[var(--color-text)] dark:text-white hover:border-[var(--theme-primary)]',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-token-lg hover:shadow-token-xl',
};
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};
const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      external,
      loading,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--theme-radius)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--theme-primary)] disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = [base, variantStyles[variant], sizeStyles[size], className]
      .filter(Boolean)
      .join(' ');
    if (href) {
      return (
        <Link
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={classes}
        >
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading && (
          <span
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
