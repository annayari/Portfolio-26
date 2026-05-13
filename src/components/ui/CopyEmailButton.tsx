'use client';
import { useState } from 'react';

const EMAIL = 'annayarigina7@gmail.com';

const FONT_BODY = "'Geist', -apple-system, sans-serif";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {/* Tooltip above */}
      <span style={{
        position: 'absolute',
        bottom: 'calc(100% + 6px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${copied ? 0 : 4}px)`,
        fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500,
        color: '#0B0D11',
        whiteSpace: 'nowrap',
        opacity: copied ? 1 : 0,
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        pointerEvents: 'none',
      }}>
        Copied!
      </span>

      <button
        onClick={handleClick}
        className="hero-btn hero-btn-primary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500,
          padding: '11px 26px', borderRadius: 9999,
          backgroundColor: '#D8D2FF',
          border: '1px solid rgba(109,40,217,0.2)',
          color: '#0B0D11',
          cursor: 'none',
          transition: 'all 0.15s ease',
        }}
      >
        Email
      </button>
    </div>
  );
}
