import React from 'react';

const T = {
  surfaceSubtle: '#E8E8E4',
  inkPrimary:    '#0B0D11',
  inkSecondary:  '#6B7280',
  yellow:        '#E8C840',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', monospace";

export function ProgressBar({ value, label, accent = false }: { value: number; label?: string; accent?: boolean }): React.ReactElement {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkPrimary }}>{label}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkSecondary }}>{clamped}%</span>
        </div>
      )}
      <div style={{ width: '100%', height: 6, backgroundColor: T.surfaceSubtle, borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${clamped}%`,
          backgroundColor: accent ? T.yellow : T.inkPrimary,
          borderRadius: 9999,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
}

export default ProgressBar;
