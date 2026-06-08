"use client";
import { Badge } from "@/components/ui/Badge";

const T = {
  inkSecondary: '#6B7280',
  inkMuted:     '#9CA3AF',
  border:       '#E4E4E0',
} as const;

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const FONT_BODY    = "'Geist', -apple-system, sans-serif";

const experiments = [
  { color: '#D4B896', aspect: '1/1' },
  { color: '#9B8FC0', aspect: '3/4' },
  { color: '#8AB4C0', aspect: '4/3' },
  { color: '#C0A08A', aspect: '1/1' },
  { color: '#A0B88A', aspect: '3/4' },
  { color: '#B8A4D0', aspect: '4/3' },
  { color: '#C8B48A', aspect: '1/1' },
  { color: '#8AC0A0', aspect: '4/3' },
  { color: '#C0888A', aspect: '3/4' },
  { color: '#A4B8C8', aspect: '1/1' },
  { color: '#D0C0A0', aspect: '4/3' },
  { color: '#A8C0B0', aspect: '1/1' },
];

export default function PlaygroundPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 40, fontWeight: 500, color: '#0B0D11', marginBottom: 12 }}>
          Playground
        </h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.inkSecondary, maxWidth: 440, margin: 0 }}>
          Random UI experiments, visual explorations, and things I made for fun.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}>
        {experiments.map((exp, i) => (
          <div
            key={i}
            style={{
              aspectRatio: exp.aspect,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: exp.color,
              cursor: 'pointer',
              border: `1px solid transparent`,
              transition: 'transform 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'scale(1.02)';
              el.style.borderColor = T.inkMuted;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'scale(1)';
              el.style.borderColor = 'transparent';
            }}
          />
        ))}
      </div>
    </div>
  );
}
