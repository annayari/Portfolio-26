import React from 'react';

const T = {
  inkPrimary:   '#1E2B3C',
  inkSecondary: '#7A8694',
  border:       '#E2E8ED',
} as const;

const FONT = "'Geist', -apple-system, sans-serif";

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', disabled, children, style, onMouseEnter, onMouseLeave, ...rest }, ref) {
    const [hovered, setHovered] = React.useState(false);

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: FONT,
      fontWeight: 500,
      borderRadius: 9999,
      border: '1px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
      outline: 'none',
      whiteSpace: 'nowrap',
    };

    const sizes: Record<ButtonSize, React.CSSProperties> = {
      sm: { fontSize: 12, padding: '6px 12px' },
      md: { fontSize: 14, padding: '8px 20px' },
    };

    const variants: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: hovered && !disabled ? '#E8EF7A' : '#F3F4A9',
        borderColor: 'rgba(160, 161, 47, 0.30)',
        color: T.inkPrimary,
      },
      secondary: {
        backgroundColor: '#FFFFFF',
        borderColor: T.border,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        color: T.inkPrimary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: hovered && !disabled ? T.inkPrimary : T.inkSecondary,
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
        onMouseEnter={e => { setHovered(true); onMouseEnter?.(e); }}
        onMouseLeave={e => { setHovered(false); onMouseLeave?.(e); }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
