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
              As the first and only Product Designer, I owned the end-to-end design process from defining the user journey to launching the product.
            </p>
            <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
              The AI-powered app transforms room photos into personalized designs. I focused on converting curiosity into subscription intent by creating value before the paywall and improving the monetization experience.
            </p>
          </div>
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',     value: 'Product designer' },
              { label: 'Platform', value: 'iOS + Web' },
              { label: 'Markets',  value: 'Tier 1' },
            ].map(row => (
              <div key={row.label} className="r-meta-item" style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', textAlign: 'right' as const }}>{row.label}</span>
                <span style={{ fontFamily: FD, fontSize: 14, color: BODY, lineHeight: 1.5, whiteSpace: 'pre-line' as const }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* key results */}
        <div className="reveal" style={{ paddingTop: 48, marginBottom: 0, paddingBottom: 48, borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: '0 0 20px' }}>Key results</p>
          <div className="r-metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 24px', width: '100%' }}>
            {[
              { value: '+30%',  raw: '+30', suffix: '%', label: 'Paywall conversion\nuplift' },
              { value: '< 10%', label: 'Day-0 cancellations\n(was ~18%)', isStatic: true },
              { value: '14.8%', label: 'Web-to-app CR\n(was 8.2%)', isStatic: true },
              { value: '+34%',  raw: '+34', suffix: '%', label: 'Upsell conversion\nfrom inline tools' },
            ].map((m, i, arr) => (
              <div key={m.value} style={{ paddingRight: 24, borderRight: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none', paddingLeft: 0 }}>
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
          <img src="/cases/casavista-hero.png" alt="Hero: before / after AI room generation" style={{ width: '100%', display: 'block' }} />
        </div>

      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Breakdown of the problem</p>
        <H2>Why users weren't ready to subscribe</H2>
        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', marginTop: 32 }}>
          {[
            { emoji: '🧪', title: 'No proof of quality', body: 'Most users dropped before completing their first AI generation, before they could see whether the product was worth paying for.' },
            { emoji: '⏱️', title: 'Paywall appeared too early', body: 'Users were asked to subscribe before reaching the core value moment. Curiosity was there, but confidence wasn\'t built yet.' },
            { emoji: '🔐', title: 'Subscription anxiety', body: 'Bi-weekly support insights showed recurring concerns around trial terms, charges, reminders, and cancellation.' },
            { emoji: '📉', title: 'Day-0 cancellation spike', body: 'Day-0 subscription cancellations reached ~18%, showing that users started trials with low trust and cancelled immediately after.' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 20, margin: '0 0 6px', lineHeight: 1 }}>{item.emoji} <strong style={{ color: INK, fontWeight: 500, fontSize: 17 }}>{item.title}</strong></p>
              <Body style={{ fontSize: 16, lineHeight: 1.6 }}>{item.body}</Body>
            </div>
          ))}
        </div>

      </section>

      {/* ── DISCOVERY ────────────────────────────────────────────────────── */}
      <section id="discovery" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Discovery</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.5 }}>
          Combined funnel analytics, cancellation timing data, bi-weekly support reviews, in-app surveys, and a{' '}
          <strong style={{ fontWeight: 500, color: INK }}>competitor audit across AI apps</strong>{' '}
          mapping paywall timing, pricing, trial mechanics, and upsell placement.
        </Body>

        <div className="img-hover-wrap" style={{ marginTop: 32, borderRadius: 12, overflow: 'hidden' }}>
          <img src="/cases/casavista-competitor-audit.jpg" alt="Competitor audit matrix: paywall timing, pricing, trial mechanics across AI apps" style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ marginTop: 88 }}>
          <div className="r-grid-asym r-case-iteration" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
              <img src="/cases/casavista-user-interviews.jpg" alt="User interviews" style={{ width: '100%', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>User Interviews</p>
              <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.6, margin: '0 0 16px' }}>
                To understand <strong style={{ color: INK, fontWeight: 500 }}>user expectations and conversion barriers</strong>, I interviewed users exploring AI room redesign for the first time.
              </p>
              <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.6, margin: 0 }}>
                The goal was to identify what prevented users from <strong style={{ color: INK, fontWeight: 500 }}>subscribing</strong>, what created <strong style={{ color: INK, fontWeight: 500 }}>trust in AI-generated results</strong>, and which moments delivered enough value to move users from <strong style={{ color: INK, fontWeight: 500 }}>curiosity to commitment</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IDEATION & CONCEPTUALIZATION ────────────────────────────────── */}
      <section id="ideation" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Ideation & Conceptualization</H2>
        <Body style={{ marginBottom: 40, lineHeight: 1.6 }}>
          Working closely with product, analytics, marketing, and support teams, I identified user pain points, conversion barriers, and opportunities to improve the AI redesign experience.
        </Body>
        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'User insights', body: 'Analyzed support feedback, user behavior, and funnel data to understand trust gaps and what prevented users from reaching the value moment.' },
            { title: 'MVP scope', body: 'Prioritized key experiences across AI generation, editing, and monetization to help users move from curiosity to subscription intent.' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 17, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1.3 }}>{item.title}</p>
              <Body style={{ fontSize: 16, lineHeight: 1.6 }}>{item.body}</Body>
            </div>
          ))}
        </div>

        <div className="img-hover-wrap" style={{ marginTop: 40, borderRadius: 16, overflow: 'hidden' }}>
          <img src="/cases/casavista-mvp-scope.png" alt="MVP scope: AI generation flow, personalization editing tools, free generation limits before upgrade, first-time user journey, discovery & inspiration, design system" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ── WORK SCREENS ─────────────────────────────────────────────────── */}
      <section id="work" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Cutting time to first generation by 73%</H2>
        <Body style={{ marginBottom: 16, lineHeight: 1.6 }}>
          I transformed a fragmented AI product into a cohesive ecosystem by creating a scalable design system across generation, editing, onboarding, and monetization.
        </Body>
        <Body style={{ marginBottom: 40, lineHeight: 1.6 }}>
          By introducing guided creation flows and a consistent visual language, I helped users reach value faster while improving clarity, trust, and overall product quality.
        </Body>

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

        <div className="reveal" style={{ marginTop: 48 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '1.2 min', label: 'Time to first generation\n(from 4.5 min)' },
              { n: '+55%', label: 'New user activation' },
              { n: '3×', label: 'Higher subscription intent\nafter first edit' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 01 — PAYWALL ─────────────────────────────────────────── */}
      <section id="paywall" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>A/B test results</H2>

        {[
          {
            title: 'Paywall built around the tool you tapped',
            body: 'I tested a contextual paywall triggered immediately after a user selected an editing tool, making the offer directly relevant to the task they were trying to complete. This replaced a generic paywall with a more timely upgrade moment.',
            imgA: '/cases/casavista-paywall-exp1-a.jpg',
            imgB: '/cases/casavista-paywall-exp1-b.jpg',
            results: [
              { n: '+34%', label: 'Upsell conversion from\ntool-level offers' },
              { n: '41%',  label: 'New subscriptions starting\nfrom a tool-level paywall' },
            ],
          },
          {
            title: 'Trial timeline printed on the paywall',
            body: 'Tested showing the full 7-day trial timeline directly on the paywall, including the reminder and charge date, instead of leaving key terms in the fine print. The goal was to reduce uncertainty, build trust, and make starting the trial feel safer.',
            imgA: '/cases/casavista-paywall-exp2-a.jpg',
            imgB: '/cases/casavista-paywall-exp2-b.jpg',
            results: [
              { n: '< 10%', label: 'Day-0 cancellations\n(from 18%)' },
              { n: '+8%',   label: 'Trial-to-paid conversion' },
              { n: '-23%',  label: 'Billing & cancellation tickets' },
            ],
          },
          {
            title: 'Free generations counted per tool',
            body: 'A static Limit 5 badge stated a rule but never said where the user stood, so running out felt like a sudden restriction. I counted generations per tool and kept the spent tools on screen in a locked state, because visible loss converts better than a clean menu.',
            imgA: '/cases/casavista-paywall-exp3-a.jpg',
            imgB: '/cases/casavista-paywall-exp3-b.jpg',
            results: [
              { n: '7.5%', label: 'Conversion from\nusage limit screen' },
              { n: '19%',  label: 'Users reaching\n5th generation' },
              { n: '3.4',  label: 'Average generations\nper new user' },
            ],
          },
        ].map((it, i) => (
          <div key={i} className="reveal" style={{ marginTop: i === 0 ? 40 : 64, paddingTop: i === 0 ? 0 : 40, borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>{it.title}</h3>
            <Body style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>{it.body}</Body>
            <div className="r-ab-row" style={{ display: 'flex', gap: 4, marginBottom: 24, alignItems: 'stretch' }}>
              <div style={{ backgroundColor: (it as any).imgA ? 'transparent' : OVR, borderRadius: 16, padding: (it as any).imgA ? 0 : 20, position: 'relative' as const, flex: (it as any).imgA ? '0 1 auto' : '1 1 0' }}>
                {!(it as any).imgA && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#E8E8E4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 600, color: '#6B6B7A' }}>A</span>
                  </div>
                )}
                {(it as any).imgA ? (
                  <img src={(it as any).imgA} alt={`${it.title} — variant A`} style={{ height: 'clamp(180px, 55vw, 420px)', maxWidth: '100%', width: 'auto', borderRadius: 10, display: 'block', objectFit: 'contain' as const }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
                )}
              </div>
              <div style={{ backgroundColor: (it as any).imgB ? 'transparent' : OVR, borderRadius: 16, padding: (it as any).imgB ? 0 : 20, position: 'relative' as const, flex: (it as any).imgB ? '0 1 auto' : '1 1 0' }}>
                {!(it as any).imgB && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 600, color: OVR }}>B</span>
                  </div>
                )}
                {(it as any).imgB ? (
                  <img src={(it as any).imgB} alt={`${it.title} — variant B`} style={{ height: 'clamp(180px, 55vw, 420px)', maxWidth: '100%', width: 'auto', borderRadius: 10, display: 'block', objectFit: 'contain' as const }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: 10, backgroundColor: '#E4E4E0' }} />
                )}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
              <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                {it.results.map((m) => (
                  <div key={m.n}>
                    <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                    <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── DESIGN SYSTEM ────────────────────────────────────────────────── */}
      <section id="system" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Implementation</SectionLabel>
        <H2>What was challenging?</H2>
        <Body style={{ marginBottom: 16, lineHeight: 1.6 }}>
          My mission was to transform AI curiosity into subscription intent by designing an experience that built value, trust, and conversion at the right moments.
        </Body>
        <Body style={{ marginBottom: 32, lineHeight: 1.6 }}>
          To scale the product efficiently, I built a strong design foundation by creating a design system, defining reusable components and patterns, and leveraging AI-assisted workflows to accelerate documentation and iteration. This enabled faster experimentation, consistent experiences across iOS and Web, and closer collaboration between design and engineering.
        </Body>

      </section>

      {/* ── LEARNINGS ────────────────────────────────────────────────────── */}
      <section id="learnings" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Learnings</H2>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', marginTop: 28 }}>
          {[
            { title: 'Timing beats persuasion',     body: 'The strongest conversion gains came from placing the paywall after proof of value. Before conviction exists, even the best copy fails.' },
            { title: 'Trust is a conversion lever', body: 'Clear trial terms cut day-0 cancellations in half. Users who feel safe start trials with intent to use them.' },
            { title: 'Copy changes behavior',       body: 'A single CTA swap outperformed every visual redesign. In high-intent flows, language shapes decisions directly.' },
            { title: 'Growth design is sequencing', body: 'Value, then trust, then conversion. The order of the experience matters more than any individual screen.' },
          ].map((l, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 17, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1.3 }}>{l.title}</p>
              <Body style={{ fontSize: 16 }}>{l.body}</Body>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
