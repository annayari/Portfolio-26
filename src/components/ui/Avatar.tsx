import React from 'react';

const T = {
  surfaceOverlay: '#F2F2EE',
  inkPrimary:     '#0B0D11',
  inkSecondary:   '#6B7280',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";

export type AvatarSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<AvatarSize, { wh: number; fontSize: number }> = {
  sm: { wh: 32, fontSize: 12 },
  md: { wh: 40, fontSize: 14 },
  lg: { wh: 56, fontSize: 16 },
};

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export function Avatar({ src, name, size = 'md' }: { src?: string; name: string; size?: AvatarSize }): React.ReactElement {
  const { wh, fontSize } = SIZE_MAP[size];
  const base: React.CSSProperties = { width: wh, height: wh, borderRadius: '50%', flexShrink: 0, overflow: 'hidden' };

  if (src) {
    return (
      <div style={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: T.surfaceOverlay, fontFamily: FONT_BODY, fontSize, fontWeight: 500, color: T.inkSecondary }}>
      {getInitials(name)}
    </div>
  );
}

export function AvatarRow({ src, name, role, size = 'md' }: { src?: string; name: string; role?: string; size?: AvatarSize }): React.ReactElement {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar src={src} name={name} size={size} />
      <div>
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary, margin: 0 }}>{name}</p>
        {role && <p style={{ fontFamily: FONT_BODY, fontSize: 12, color: T.inkSecondary, margin: 0 }}>{role}</p>}
      </div>
    </div>
  );
}

export default Avatar;
