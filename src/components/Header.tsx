"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const T = {
  surfaceRaised:  '#FFFFFF',
  activepill:     '#F0F0F0',
  inkPrimary:     '#0B0D11',
  inkSecondary:   '#AAAAAA',
  border:         '#E5E5E5',
} as const;

const FONT_BODY = "'Geist', -apple-system, sans-serif";

const navItems = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
] as const;

function NavItem({ label, href, active }: { label: string; href: string; active: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      href={href}
      className="r-nav-item"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: FONT_BODY,
        fontSize: 14,
        fontWeight: active ? 500 : 400,
        borderRadius: 9999,
        border: 'none',
        backgroundColor: active ? T.activepill : 'transparent',
        color: active ? T.inkPrimary : hovered ? T.inkPrimary : T.inkSecondary,
        padding: '7px 18px',
        cursor: 'pointer',
        transition: 'color 0.12s ease, background-color 0.12s ease',
        outline: 'none',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 20,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <nav style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 5,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.80)' : T.surfaceRaised,
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        border: `1px solid ${scrolled ? 'rgba(228,228,224,0.6)' : T.border}`,
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.08)',
        borderRadius: 9999,
        pointerEvents: 'auto',
        transition: 'background-color 0.25s ease, backdrop-filter 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}>
        {navItems.map(({ label, href }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return <NavItem key={label} label={label} href={href} active={active} />;
        })}
      </nav>
    </header>
  );
}
