"use client";
import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INK    = '#0B0D11';
const BODY   = '#3D3D3D';
const BORDER = '#E4E4E0';
const OVR    = '#F2F2EE';
const SUB    = '#9CA3AF';
const FD     = "'Geist', -apple-system, sans-serif";
const FM     = "'Geist Mono', monospace";

/* ── primitives ──────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: FD, fontSize: 28, fontWeight: 500, color: INK, margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.75, margin: 0, ...style }}>
      {children}
    </p>
  );
}

function Placeholder({ aspect = '16/9', label }: { aspect?: string; label?: string }) {
  return (
    <div style={{
      width: '100%', aspectRatio: aspect, borderRadius: 12,
      backgroundColor: OVR, border: `1px dashed ${BORDER}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {label && (
        <span style={{ fontFamily: FM, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: SUB }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

export function CasaVistaApp() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        el.textContent = (el.dataset.count ?? '') + (el.dataset.suffix ?? '');
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
          else entry.target.classList.remove('visible');
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px 0px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.dataset.count ?? '';
          const suffix = el.dataset.suffix ?? '';
          const isPlus = raw.startsWith('+');
          const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
          if (isNaN(n)) return;
          const duration = 700;
          let start: number | null = null;
          const tick = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val = Number.isInteger(n) ? Math.round(ease * n) : Math.round(ease * n * 10) / 10;
            el.textContent = `${isPlus ? '+' : ''}${val}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.8 }
    );
    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section id="overview" style={{ paddingTop: 8 }}>

        {/* title */}
        <h1 className="r-case-h1" style={{
          fontFamily: FD, fontSize: 36, fontWeight: 500, color: INK,
          lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 24px',
        }}>
          {['Increasing', 'new', 'user', 'conversion'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <br />
          {['to', 'subscription', 'by', '30%'].map((w, i, arr) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${(i + 4) * 0.06 + 0.1}s` }}>{w}</span>
              {i < arr.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h1>

        {/* intro + meta */}
        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: 48, marginBottom: 0, paddingBottom: 36, borderBottom: `1px solid ${BORDER}`, alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Joined as the first and only designer and led the product from zero to launch:{' '}
              <strong style={{ color: INK, fontWeight: 500 }}>brand, MVP, AI generation flow, design system, paywall, upsells, and acquisition funnels.</strong>
            </p>
            <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
              The app helps users visualize room redesigns with AI — upload a photo, choose a style, get a result. My work focused on turning curiosity into subscription intent: helping users experience value before the ask, reducing trial distrust, and placing monetization at the right moment.
            </p>
          </div>
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',     value: 'Sole product designer' },
              { label: 'Platform', value: 'iOS + Web' },
              { label: 'Markets',  value: 'Tier 1' },
              { label: 'Duration', value: '18 months' },
            ].map(row => (
              <div key={row.label} className="r-meta-item" style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', textAlign: 'right' as const }}>{row.label}</span>
                <span style={{ fontFamily: FD, fontSize: 14, color: BODY, lineHeight: 1.5, whiteSpace: 'pre-line' as const }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* key results */}
        <div className="reveal" style={{ paddingTop: 48, marginBottom: 0 }}>
          <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: '0 0 20px' }}>Key results</p>
          <div className="r-metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 24px', width: '100%' }}>
            {[
              { value: '+30%',  raw: '+30', suffix: '%', label: 'Paywall conversion\nuplift' },
              { value: '< 10%', label: 'Day-0 cancellations\n(was ~18%)', isStatic: true },
              { value: '14.8%', label: 'Web-to-app CR\n(was 8.2%)', isStatic: true },
              { value: '+34%',  raw: '+34', suffix: '%', label: 'Upsell conversion\nfrom inline tools' },
            ].map((m) => (
              <div key={m.value} style={{ paddingRight: 24, borderRight: `1px solid ${BORDER}`, paddingLeft: 0 }}>
                {m.isStatic ? (
                  <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </p>
                ) : (
                  <p data-count={m.raw} data-suffix={m.suffix}
                    style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {m.value}
                  </p>
                )}
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: '8px 0 0', lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* hero image */}
        <div className="img-hover-wrap" style={{ marginTop: 64, borderRadius: 16, overflow: 'hidden' }}>
          <Placeholder aspect="16/7" label="Hero: before / after AI room generation" />
        </div>

      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Breakdown of the problem</p>
        <H2>Why users weren't ready to subscribe</H2>
        <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', marginTop: 32 }}>
          {[
            { emoji: '🧪', title: 'No proof of quality', body: 'Most users dropped before completing their first AI generation — before they could see whether the product was worth paying for.' },
            { emoji: '⏱️', title: 'Paywall appeared too early', body: 'Users were asked to subscribe before reaching the core value moment. Curiosity was there, but confidence wasn\'t built yet.' },
            { emoji: '🔐', title: 'Subscription anxiety', body: 'Bi-weekly support insights showed recurring concerns around trial terms, charges, reminders, and cancellation.' },
            { emoji: '📉', title: 'Day-0 cancellation spike', body: 'Day-0 subscription cancellations reached ~18%, showing that users started trials with low trust and cancelled immediately after.' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 20, margin: '0 0 6px', lineHeight: 1 }}>{item.emoji} <strong style={{ color: INK, fontWeight: 500, fontSize: 17 }}>{item.title}</strong></p>
              <Body style={{ fontSize: 15, lineHeight: 1.6 }}>{item.body}</Body>
            </div>
          ))}
        </div>

      </section>

      {/* ── DISCOVERY ────────────────────────────────────────────────────── */}
      <section id="discovery" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Discovery: users churned from distrust, not dissatisfaction</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.5 }}>
          Combined funnel analytics, cancellation timing data, bi-weekly support reviews, in-app surveys, and a{' '}
          <strong style={{ fontWeight: 500, color: INK }}>competitor audit across 6 AI apps</strong>{' '}
          — mapping paywall timing, pricing, trial mechanics, and upsell placement.
        </Body>

        <div style={{ borderLeft: `2px solid ${BORDER}`, paddingLeft: 16, marginTop: 32 }}>
          <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: INK, fontWeight: 500 }}>Key insight:</strong> the product asked for commitment before users had enough confidence in the output or clarity around terms. The paywall needed to appear later, explain more, and feel safer.
          </p>
        </div>

        <div className="img-hover-wrap" style={{ marginTop: 32, borderRadius: 12, overflow: 'hidden' }}>
          <Placeholder aspect="16/6" label="Competitor audit matrix: paywall timing, pricing, trial mechanics across 6 AI apps" />
        </div>
      </section>

      {/* ── WORK SCREENS ─────────────────────────────────────────────────── */}
      <section id="work" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {[
            '/cases/vista-work-1.jpg',
            '/cases/vista-work-2.jpg',
            '/cases/vista-work-3.jpg',
            '/cases/vista-work-4.jpg',
            '/cases/vista-work-5.jpg',
          ].map((src, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden' }}>
              <img src={src} alt={`App screen ${i + 1}`} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE 01 — PAYWALL ─────────────────────────────────────────── */}
      <section id="paywall" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>A/B testing</SectionLabel>
        <H2>Paywall experiments to turn visitors into subscribers</H2>
        <Body style={{ marginBottom: 48, lineHeight: 1.6 }}>
          Three experiments, one principle: the ask only works{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>after conviction is built</strong>.
          Timing, framing, and transparency each moved the needle independently.
        </Body>

        {[
          {
            tag: 'Experiment 01 — Paywall redesign',
            title: 'Clearer value, stronger hierarchy, less decision friction',
            result: '+30% paywall conversion',
            body: 'Previous paywall created friction — users didn\'t have enough confidence in the product or clarity on terms. Redesigned around clearer value communication, stronger hierarchy, and reduced decision friction.',
          },
          {
            tag: 'Experiment 02 — Trial transparency',
            title: 'Show the timeline: Today → Day 5 reminder → Day 7 charge',
            result: 'Day-0 cancellations < 10% (from ~18%)',
            body: 'Support showed recurring anxiety: when will I be charged? Can I cancel? Added a step-by-step timeline and cancellation info directly on the paywall. Users who feel safe actually try the product.',
          },
          {
            tag: 'Experiment 03 — Annual plan as default',
            title: 'Annual plan first, monthly behind "View all plans"',
            result: '+22% annual subscriptions',
            body: 'Annual plan as the primary option, monthly behind one tap. When the first price users see is the annual per-month rate, monthly feels expensive by comparison.',
          },
        ].map((it, i) => (
          <div key={i} style={{ marginTop: i === 0 ? 0 : 64 }}>
            <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>{it.tag}</p>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 20px' }}>{it.title}</h3>
            <div style={{ backgroundColor: OVR, borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ position: 'relative' as const }}>
                <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
                <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E8E8E4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: '#6B6B7A' }}>A</span>
                </div>
              </div>
              <div style={{ position: 'relative' as const }}>
                <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
                <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: OVR }}>B</span>
                </div>
              </div>
            </div>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>{it.body}</Body>
            <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>{it.result}</p>
          </div>
        ))}

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '+30%',  label: 'Paywall conversion\nuplift' },
              { n: '< 10%', label: 'Day-0 cancellations\n(was ~18%)' },
              { n: '+22%',  label: 'Annual subscriptions\nfrom plan ordering' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 02 — ACQUISITION FUNNEL ──────────────────────────────── */}
      <section id="funnel" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>A/B testing</SectionLabel>
        <H2>Acquisition experiment to bring in higher-intent users</H2>
        <Body style={{ marginBottom: 48, lineHeight: 1.6 }}>
          One taste creates desire. A hard gate filters for intent.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Higher-quality installs, not just more installs.</strong>
        </Body>

        <div>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Experiment 04 — Web-to-app hard gate</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 20px' }}>One taste on web, then hard-gate to app</h3>
          <div style={{ backgroundColor: OVR, borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ position: 'relative' as const }}>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
              <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E8E8E4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: '#6B6B7A' }}>A</span>
              </div>
            </div>
            <div style={{ position: 'relative' as const }}>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
              <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: OVR }}>B</span>
              </div>
            </div>
          </div>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
            Tested four concepts: direct link, quiz, multiple free gens + soft gate, one gen + hard gate. Winner: one taste on web creates desire, hard gate filters for intent.
          </Body>
          <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>CR 8.2% → 14.8%</p>
        </div>

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '14.8%', label: 'Web-to-app install CR\n(was 8.2%)' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 03 — ENGAGEMENT ──────────────────────────────────────── */}
      <section id="engagement" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>A/B testing</SectionLabel>
        <H2>Upsell experiment to monetize at the right moment</H2>
        <Body style={{ marginBottom: 48, lineHeight: 1.6 }}>
          Users are most receptive the moment they see their room transformed.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Burying tools requires them to remember and seek — surfacing them requires nothing.</strong>
        </Body>

        <div>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Experiment 05 — Upsell placement</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 20px' }}>Surface editing tools inline, not buried in settings</h3>
          <div style={{ backgroundColor: OVR, borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div style={{ position: 'relative' as const }}>
              <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
              <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E8E8E4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: '#6B6B7A' }}>A</span>
              </div>
            </div>
            <div style={{ position: 'relative' as const }}>
              <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
              <div style={{ position: 'absolute' as const, top: 10, left: 10, width: 28, height: 28, borderRadius: '50%', backgroundColor: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 600, color: OVR }}>B</span>
              </div>
            </div>
          </div>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
            Editing tools (floor, walls, furniture) moved from settings menu to inline after generation. Only 8% of users found them in settings — despite users who found them converting to paid at 2.3× baseline.
          </Body>
          <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>+34% upsell conversion</p>
        </div>

        {/* Next steps */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              'Test personalized style suggestions based on first generation to increase second-session return',
              'Add social sharing of before/after results as organic acquisition loop',
              'Explore AI-powered room matching — "Users who redesigned this also tried…"',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowUp size={14} color={INK} />
                </div>
                <p style={{ fontFamily: FD, fontSize: 15, color: BODY, margin: 0, lineHeight: 1.5, paddingTop: 6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '+34%', label: 'Upsell conversion from\ninline tool placement' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM ────────────────────────────────────────────────── */}
      <section id="system" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Design system</SectionLabel>
        <H2>Token-based system: new app variant ships in hours</H2>
        <Body style={{ marginBottom: 32, lineHeight: 1.6 }}>
          Built a token-based design system for iOS and web.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Reskin entire flows by swapping tokens, not rebuilding screens.</strong>{' '}
          Multiple app variants for different audiences and ASO targets — same features, different UI and branding.
        </Body>

        <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
          <Placeholder aspect="16/7" label="Design system: tokens, components, app variants" />
        </div>

        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>What I built</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '15+', label: 'A/B experiments\nover 18 months' },
              { n: '~30%', label: 'Faster production\nworkflow' },
              { n: '1',   label: 'Designer — end-to-end\nownership' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNINGS ────────────────────────────────────────────────────── */}
      <section id="learnings" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Learnings</H2>
        <p style={{ fontFamily: FD, fontSize: 18, color: '#6B6B7A', margin: '4px 0 28px', lineHeight: 1.4 }}>
          18 months of sequenced bets — no big launch, disciplined experimentation
        </p>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'Timing beats persuasion',     body: 'The strongest conversion gains came from placing the paywall after proof of value. Before conviction exists, even the best copy fails.' },
            { title: 'Trust is a conversion lever', body: 'Clear trial terms cut day-0 cancellations in half. Users who feel safe start trials with intent to use them.' },
            { title: 'Copy changes behavior',       body: 'A single CTA swap outperformed every visual redesign. In high-intent flows, language shapes decisions directly.' },
            { title: 'Growth design is sequencing', body: 'Value → trust → conversion. The order of the experience matters more than any individual screen.' },
          ].map((l, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 17, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1.3 }}>{l.title}</p>
              <Body style={{ fontSize: 15 }}>{l.body}</Body>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
