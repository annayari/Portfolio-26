import React from 'react';

const T = {
  surfaceOverlay: '#F2F2EE',
  inkSecondary:   '#6B7280',
} as const;

const FONT_MONO = "'Geist Mono', monospace";

export type BadgeVariant = 'label' | 'chip';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge({ variant = 'label', children, style }: BadgeProps): React.ReactElement {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: FONT_MONO,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: T.inkSecondary,
  };

  if (variant === 'chip') {
    return (
      <span style={{ ...base, backgroundColor: T.surfaceOverlay, borderRadius: 9999, padding: '4px 12px', ...style }}>
        {children}
      </span>
    );
  }

  return <span style={{ ...base, ...style }}>{children}</span>;
}

export default Badge;
