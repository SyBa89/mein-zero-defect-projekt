import { forwardRef, ComponentPropsWithoutRef, ElementRef } from 'react';
export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
const paddingMap = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' } as const;
const Card = forwardRef<ElementRef<'div'>, CardProps>(
  ({ padding = 'md', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'bg-white dark:bg-gray-800 rounded-[var(--theme-radius)] shadow-token-md border border-gray-100 dark:border-gray-700',
        paddingMap[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';
export default Card;
