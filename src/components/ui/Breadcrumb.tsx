"use client";
import React from 'react';

const T = {
  inkPrimary:   '#0B0D11',
  inkSecondary: '#6B7280',
  inkMuted:     '#9CA3AF',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";

export interface BreadcrumbItem { label: string; href?: string }

function ChevronRight(): React.ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: T.inkMuted }}>
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }): React.ReactElement {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', alignItems: 'center', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <ChevronRight />}
            {i === items.length - 1 ? (
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary }}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href ?? '#'}
                style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, textDecoration: 'none', transition: 'color 0.12s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = T.inkPrimary; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = T.inkMuted; }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
