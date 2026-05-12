import Link from "next/link";

const T = {
  inkSecondary: '#6B7280',
  inkPrimary:   '#0B0D11',
  inkMuted:     '#9CA3AF',
  border:       '#E4E4E0',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', monospace";

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Cases', href: '/cases' },
  { label: 'About', href: '/about' },
  { label: 'Playground', href: '/playground' },
];

const socialLinks = [
  { label: 'Email', href: 'mailto:annayarigina7@gmail.com' },
  { label: 'LinkedIn', href: '#' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: 14,
  color: T.inkSecondary,
  textDecoration: 'none',
  transition: 'color 0.12s ease',
};

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.border}`, marginTop: 96 }}>
      <div style={{
        maxWidth: 960, margin: '0 auto', padding: '40px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} style={linkStyle}>{label}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {socialLinks.map(({ label, href }) => (
            <a key={label} href={href} style={linkStyle}>{label}</a>
          ))}
        </div>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted, margin: 0 }}>
          © {new Date().getFullYear()} Anna Yarigina
        </p>
      </div>
    </footer>
  );
}
