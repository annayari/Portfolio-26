import React from 'react';

const T = {
  surfaceRaised:  '#F9F7F5',
  surfaceOverlay: '#F2F2EE',
  inkPrimary:     '#1E2B3C',
  inkSecondary:   '#7A8694',
  border:         '#E2E8ED',
  borderHover:    '#9AA5B1',
} as const;

export type IconButtonVariant = 'ghost' | 'outlined';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ variant = 'ghost', disabled, children, onMouseEnter, onMouseLeave, style, ...rest }, ref) {
    const [hovered, setHovered] = React.useState(false);

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background-color 0.12s ease, border-color 0.12s ease, color 0.12s ease',
      outline: 'none',
      flexShrink: 0,
    };

    const variants: Record<IconButtonVariant, React.CSSProperties> = {
      ghost: {
        backgroundColor: hovered && !disabled ? T.surfaceOverlay : 'transparent',
        color:           hovered && !disabled ? T.inkPrimary : T.inkSecondary,
        border:          '1px solid transparent',
      },
      outlined: {
        backgroundColor: hovered && !disabled ? T.surfaceOverlay : T.surfaceRaised,
        color:           T.inkPrimary,
        border:          `1px solid ${hovered && !disabled ? T.borderHover : T.border}`,
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{ ...base, ...variants[variant], ...style }}
        onMouseEnter={e => { setHovered(true); onMouseEnter?.(e); }}
        onMouseLeave={e => { setHovered(false); onMouseLeave?.(e); }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
export default IconButton;
