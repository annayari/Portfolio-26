'use client';
import { useState } from 'react';

const EMAIL = 'annayarigina7@gmail.com';

const T = {
  inkSecondary: '#6B7280',
  inkMuted:     '#9CA3AF',
  border:       '#E4E4E0',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', monospace";

const linkStyle: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: 14,
  color: T.inkSecondary,
  textDecoration: 'none',
  transition: 'color 0.12s ease',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

function FooterEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
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
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span style={{
        position: 'absolute', bottom: 'calc(100% + 4px)', left: '50%',
        transform: `translateX(-50%) translateY(${copied ? 0 : 4}px)`,
        fontFamily: FONT_BODY, fontSize: 11, color: T.inkMuted,
        whiteSpace: 'nowrap', opacity: copied ? 1 : 0,
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        pointerEvents: 'none',
      }}>
        Copied!
      </span>
      <button onClick={handleClick} className="footer-link" style={linkStyle}>
        Email
      </button>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="r-footer" style={{ borderTop: `1px solid ${T.border}`, marginTop: 96 }}>
      <div style={{
        maxWidth: 960, margin: '0 auto', padding: '40px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <FooterEmailButton />
          <a href="https://www.linkedin.com/in/anna-yarigina-4a69a31a1/" target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            LinkedIn
          </a>
        </div>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted, margin: 0 }}>
          © {new Date().getFullYear()} Anna Yarigina
        </p>
      </div>
    </footer>
  );
}
