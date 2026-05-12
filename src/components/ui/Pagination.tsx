"use client";
import React from 'react';

const T = {
  inkPrimary:   '#0B0D11',
  inkSecondary: '#6B7280',
  border:       '#E4E4E0',
  surfaceRaised:  '#F9F7F5',
  surfaceOverlay: '#F2F2EE',
  borderHover:    '#9CA3AF',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', monospace";

function ArrowIcon({ dir }: { dir: 'left' | 'right' }): React.ReactElement {
  return dir === 'left' ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavArrow({ dir, hovered }: { dir: 'left' | 'right'; hovered: boolean }): React.ReactElement {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      backgroundColor: hovered ? T.surfaceOverlay : T.surfaceRaised,
      color: T.inkPrimary,
      border: `1px solid ${hovered ? T.borderHover : T.border}`,
      transition: 'background-color 0.12s ease, border-color 0.12s ease',
    }}>
      <ArrowIcon dir={dir} />
    </span>
  );
}

function PaginationLink({ href, title, dir }: { href: string; title: string; dir: 'left' | 'right' }): React.ReactElement {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={href}
      style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', opacity: 1, transition: 'opacity 0.12s ease', ...(dir === 'right' ? { textAlign: 'right' } : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {dir === 'left' && <NavArrow dir="left" hovered={hovered} />}
      <div>
        <p style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkSecondary, margin: '0 0 2px' }}>
          {dir === 'left' ? 'Previous' : 'Next'}
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary, margin: 0 }}>{title}</p>
      </div>
      {dir === 'right' && <NavArrow dir="right" hovered={hovered} />}
    </a>
  );
}

export function Pagination({ prev, next }: { prev?: { href: string; title: string }; next?: { href: string; title: string } }): React.ReactElement {
  return (
    <nav aria-label="Case navigation" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
      {prev ? <PaginationLink href={prev.href} title={prev.title} dir="left" /> : <div />}
      {next ? <PaginationLink href={next.href} title={next.title} dir="right" /> : <div />}
    </nav>
  );
}

export default Pagination;
