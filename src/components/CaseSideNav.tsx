"use client";

import { useEffect, useState } from "react";
import { BackButton } from "@/components/ui/BackButton";

const FONT_MONO = "'Geist Mono', monospace";
const FONT = "'Geist', -apple-system, sans-serif";

const INK       = '#0B0D11';
const INK_MUTED = '#9CA3AF';

type Section = { id: string; label: string };

export default function CaseSideNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside style={{ position: 'fixed', left: 24, top: 24, width: 160, zIndex: 10 }} className="hidden lg:block">
      <BackButton />
      <div style={{ marginTop: 70 }}>
        <nav>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {sections.map(section => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={e => handleClick(e, section.id)}
                    style={{
                      display: 'block',
                      padding: '6px 0',
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 400,
                      color: isActive ? INK : INK_MUTED,
                      textDecoration: 'none',
                      transition: 'color 0.12s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = INK; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = INK_MUTED; }}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
