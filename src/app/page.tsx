import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { cases } from "@/lib/data";
import { articles as articleList } from "@/lib/articles";
import { ScaleOnScroll } from "@/components/ui/ScaleOnScroll";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { HowIUseAI } from "@/components/sections/HowIUseAI";
import { RevealObserver } from "@/components/ui/RevealObserver";

const T = {
  surfaceBase:    '#FDFDFF',
  surfaceRaised:  '#F9F7F5',
  surfaceOverlay: '#F2F2EE',
  inkPrimary:     '#0B0D11',
  inkSecondary:   '#B4C0CC',
  inkGreeting:    '#9AAAB8',
  inkMuted:       '#9CA3AF',
  border:         '#E4E4E0',
  yellow:         '#F3F4A9',
  yellowHover:    '#E8EF7A',
} as const;

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const FONT_BODY    = "'Geist', -apple-system, sans-serif";
const FONT_MONO    = "'Geist Mono', monospace";

// Placeholder logos (company names as simple styled text)
const logos = [
  { label: 'Mate Academy', icon: '⬡' },
  { label: 'Logoipsum',    icon: '◈' },
  { label: 'Logoipsum',    icon: '⊞' },
  { label: 'Logoipsum',    icon: '✳' },
  { label: 'logoipsum',    icon: '⬭', pill: true },
];

export default function Home() {
  // First case is Mate Academy — rendered with special mockup
  const mateCase = cases[0]; // mate-academy
  const restCases = cases.slice(1);

  return (
    <div className="r-page-wrap" style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px 16px' }}>
      <RevealObserver />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="r-section-hero" style={{ marginBottom: 96 }}>
        {/* Label */}
        <p className="hero-word" style={{ fontFamily: FONT_BODY, fontSize: 18, fontWeight: 400, letterSpacing: '-0.02em', color: '#B3B3B3', margin: '0 0 8px', animationDelay: '0.05s' }}>
          Product designer based in Warsaw
        </p>

        {/* Headline — mixed weight, large */}
        <h1 className="r-hero-title" style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 40,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          fontWeight: 500,
          margin: '0 0 28px',
          maxWidth: 900,
        }}>
          <span className="hero-word" style={{ color: T.inkPrimary, animationDelay: '0.17s' }}>I&apos;m Anna </span>
          <span className="hero-word" style={{ color: '#B3B3B3', animationDelay: '0.25s' }}>Yarigina, </span>
          <span className="hero-word" style={{ color: T.inkPrimary, animationDelay: '0.33s' }}>6+ years </span>
          <span className="hero-word" style={{ color: '#B3B3B3', animationDelay: '0.41s' }}>designing </span>
          <span className="hero-word" style={{ color: T.inkPrimary, animationDelay: '0.49s' }}>data-driven solutions </span>
          <span className="hero-word" style={{ color: '#B3B3B3', animationDelay: '0.57s' }}>for desktop, mobile, and web products across </span>
          <span className="hero-word" style={{ color: T.inkPrimary, animationDelay: '0.65s' }}>AI, Ed-tech and Health &amp; Fitness</span>
        </h1>

        {/* CTAs */}
        <style>{`
          .hero-btn { transition: all 0.15s ease; }
          .hero-btn-primary:hover { background-color: #C8C2FF !important; border-color: rgba(109,40,217,0.28) !important; }
          .hero-btn-primary:active { background-color: #B8B1FF !important; border-color: rgba(109,40,217,0.32) !important; transform: scale(0.97); }
          .hero-btn-secondary:hover { background: #F7F7F5 !important; border-color: #E0E0DC !important; box-shadow: 0 1px 4px rgba(0,0,0,0.04) !important; }
          .hero-btn-secondary:active { background: #F0F0ED !important; border-color: #D4D4D0 !important; box-shadow: none !important; transform: scale(0.97); }
        `}</style>
        <div className="hero-animate r-hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, animationDelay: '0.45s' }}>
          <CopyEmailButton />
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anna-yarigina-4a69a31a1/' },
            { label: 'Resume (CV)', href: 'https://drive.google.com/file/d/1XY3IjRvj2GHlLz4XpjtNDcHbmI-CM71Z/view?usp=sharing' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href !== '#' ? '_blank' : undefined}
              rel={href !== '#' ? 'noopener noreferrer' : undefined}
              className="hero-btn hero-btn-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500,
                padding: '11px 26px', borderRadius: 9999,
                background: 'linear-gradient(to bottom, #FCFCFC 0%, #FAFAFA 100%)',
                border: `1px solid ${T.border}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                color: T.inkPrimary,
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* ── COMPANIES MARQUEE ─────────────────────────────── */}
      <section className="r-section-strip reveal" style={{ marginBottom: 72 }}>
        <p style={{
          fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: '#AAAAAA',
          margin: '0 0 20px',
        }}>
          Companies I&apos;ve worked with
        </p>
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: 0 }}>
          <div className="marquee-track">
            {[0, 1, 2, 3].map(pass => (
              <img
                key={pass}
                src="/logos/companies-gray.svg"
                alt=""
                aria-hidden={pass > 0}
                style={{ display: 'block', height: 36, width: 'auto', flexShrink: 0, paddingRight: 80 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CASES ────────────────────────────────────────────── */}
      <section className="r-section-cases" style={{ marginBottom: 120 }}>

        {/* Featured card — full width */}
        <div className="r-case-gap reveal" style={{ marginBottom: 48 }}>
          <Link href="/cases/mate-academy" className="case-hover-zone" style={{ textDecoration: 'none', display: 'block', cursor: 'none' }}>
            <div className="r-featured-h" style={{
              width: '100%', height: 400, borderRadius: 12,
              backgroundColor: '#F6F4FD',
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScaleOnScroll>
                <picture style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <source media="(max-width: 640px)" srcSet="/cases/mate-academy-cover-mobile.jpg" />
                  <img
                    src="/cases/mate-academy-cover.png"
                    alt="Gamification leaderboard UI"
                    className="r-featured-img"
                    style={{ display: 'block', width: '84%', maxWidth: 880, height: 'auto', margin: '0 auto' }}
                  />
                </picture>
              </ScaleOnScroll>
            </div>
            <p style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: '#6B6B7A', margin: '12px 0 4px',
            }}>
              Mate academy
            </p>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
              color: T.inkPrimary, margin: 0, lineHeight: 1.4,
            }}>
              Boosting DAU/MAU by 36% <span style={{ whiteSpace: 'nowrap' }}>with a gamification</span> ecosystem from scratch
            </h2>
          </Link>
        </div>

        {/* Grid row 1 — Mate academy */}
        <div className="r-grid-2 reveal reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 48 }}>

          {/* Case 2 — Mate academy social */}
          <Link href="/cases/mate-academy-social" className="case-hover-zone" style={{ textDecoration: 'none', display: 'block', cursor: 'none' }}>
            <div style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 12,
              backgroundColor: T.surfaceOverlay, overflow: 'hidden',
            }}>
              <img src="/cases/mate-academy-social-cover.jpg" alt="Mate academy social features" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <p style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: '#6B6B7A', margin: '12px 0 4px',
            }}>
              Mate academy
            </p>
            <h3 style={{
              fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
              color: T.inkPrimary, lineHeight: 1.4, margin: 0,
            }}>
              Boosting user DMs and task interaction by 15% with launched social features
            </h3>
          </Link>

          {/* Case 3 — Mate academy mentor */}
          <div className="case-hover-zone" data-cursor="wip" style={{ display: 'block', cursor: 'none' }}>
            <div style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 12,
              backgroundColor: T.surfaceOverlay, overflow: 'hidden', position: 'relative',
            }}>
              <img src="/cases/mate-academy-mentor-cover.jpg" alt="Mate academy mentor review" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="r-wip-pill"><Clock size={11} strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" />Currently building</span>
            </div>
            <p className="r-case-company" style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: '#6B6B7A', margin: '12px 0 4px',
            }}>
              Mate academy
            </p>
            <h3 style={{
              fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
              color: T.inkPrimary, lineHeight: 1.4, margin: 0,
            }}>
              Reducing the time for mentors to review home tasks by 25%
            </h3>
          </div>

        </div>

        {/* Grid row 2 — mobile apps */}
        <div className="r-grid-2 reveal reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>

          {/* Case 4 — CasaVista */}
          <div className="case-hover-zone" data-cursor="wip" style={{ display: 'block', cursor: 'none' }}>
            <div className="phone-bg" style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%) scale(0.62)',
                transformOrigin: 'center center',
              }}>
                <div className="phone-stage">
                  <div className="phone-glow" />
                  <div className="phone-item phone-item--l">
                    <img src="/cases/phone-left.png" alt="" />
                  </div>
                  <div className="phone-item phone-item--r">
                    <img src="/cases/phone-right.png" alt="" />
                  </div>
                </div>
              </div>
              <span className="r-wip-pill"><Clock size={11} strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" />Currently building</span>
            </div>
            <p className="r-case-company" style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: '#6B6B7A', margin: '12px 0 4px',
            }}>
              CasaVista app
            </p>
            <h3 style={{
              fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
              color: T.inkPrimary, lineHeight: 1.4, margin: 0,
            }}>
              Increasing new user conversion to subscription by 30%
            </h3>
          </div>

          {/* Case 5 — Sipless */}
          <div className="case-hover-zone" data-cursor="wip" style={{ display: 'block', cursor: 'none' }}>
            <div style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 12,
              backgroundColor: T.surfaceOverlay, overflow: 'hidden', position: 'relative',
            }}>
              <img src="/cases/sipless-cover.jpg" alt="Sipless app" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <span className="r-wip-pill"><Clock size={11} strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" />Currently building</span>
            </div>
            <p className="r-case-company" style={{
              fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
              color: '#6B6B7A', margin: '12px 0 4px',
            }}>
              Sipless app
            </p>
            <h3 style={{
              fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500,
              color: T.inkPrimary, lineHeight: 1.4, margin: 0,
            }}>
              Boosting streak conversion by 10% and cut cancellation by 15%
            </h3>
          </div>

        </div>

      </section>

      {/* ── MENTORSHIP ───────────────────────────────────── */}
      <section className="r-section-lg reveal" style={{ marginBottom: 120 }}>
        <div className="r-grid-2 r-mentoring-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'flex-start' }}>

          {/* Left — heading */}
          <div>
            <h2 className="r-page-h2" style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 2.55vw, 44px)', fontWeight: 500,
              color: T.inkPrimary, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Mentoring early-career designers
            </h2>
          </div>

          {/* Right — content */}
          <a
            href="https://mate.academy/en"
            target="_blank"
            rel="noopener noreferrer"
            className="case-hover-zone"
            data-cursor="course"
            style={{ textDecoration: 'none', display: 'block', cursor: 'none' }}
          >
            <p style={{
              fontFamily: FONT_BODY, fontSize: 16, fontWeight: 400,
              color: 'rgba(11,13,17,0.8)', lineHeight: 1.4, margin: '0 0 12px',
            }}>
              Mentored 200+ students at Mate academy in Ukraine, supporting them in building practical skills and getting hired for junior designer roles
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 14px' }}>
              <p style={{
                fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500,
                lineHeight: 1.3,
                color: '#6B6B7A', margin: 0,
              }}>
                UI/UX course
              </p>
              <span className="r-mobile-course-badge" style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500, color: '#6B6B7A', margin: 0 }}>View course →</span>
            </div>
            <div style={{
              borderRadius: 16, border: `1px solid ${T.border}`,
              backgroundColor: '#F7F7F9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              aspectRatio: '660/520',
              padding: '56px 32px',
            }}>
              <img
                src="/mentoring-zoom.png"
                alt="Mentoring session on Zoom with students"
                style={{ width: '100%', borderRadius: 10, display: 'block' }}
              />
            </div>
          </a>

        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────── */}
      <section className="r-section-lg reveal" style={{ marginBottom: 120 }} id="publications">
        <h2 className="r-writing-title r-page-h2" style={{
          fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 2.55vw, 44px)', fontWeight: 500,
          color: T.inkPrimary, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          Writing
        </h2>
        <div>
          {articleList.map(a => (
            <a
              key={a.slug}
              href={a.hasPage ? `/articles/${a.slug}` : (a.externalUrl ?? '#')}
              target={a.hasPage ? undefined : '_blank'}
              rel={a.hasPage ? undefined : 'noopener noreferrer'}
              className="r-article-row"
              style={{
                display: 'flex', alignItems: 'baseline',
                justifyContent: 'space-between', gap: 48,
                padding: '10px 0', textDecoration: 'none',
              }}
            >
              <span style={{ fontFamily: FONT_BODY, fontSize: 16, fontWeight: 500, color: 'rgba(11,13,17,0.8)', lineHeight: 1.5 }}>
                {a.title}
              </span>
              <span className="r-article-date" style={{ fontFamily: FONT_BODY, fontSize: 14, color: '#6B6B7A', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {a.date?.split(' ').pop()}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── HOW I USE AI ─────────────────────────────────── */}
      <section className="r-section-lg" style={{ marginBottom: 120 }}>
        <HowIUseAI />
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ marginBottom: 0 }}>
        <h2 className="r-page-h2" style={{
          fontFamily: FONT_DISPLAY, fontSize: 'clamp(24px, 2.55vw, 44px)', fontWeight: 500,
          color: T.inkPrimary, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          Growth through<br />feedback
        </h2>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <TestimonialsCarousel />
        </div>
      </section>

    </div>
  );
}
