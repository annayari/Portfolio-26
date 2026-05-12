"use client";
import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INK   = '#0B0D11';
const BODY  = '#3D3D3D';
const LABEL = '#B3B3B3';
const SUB   = '#9CA3AF';
const BORDER = '#E4E4E0';
const SURF  = '#F9F7F5';
const OVR   = '#F2F2EE';

const FD = "'Geist', -apple-system, sans-serif";
const FM = "'Geist Mono', monospace";

/* ── primitives ──────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: FD, fontSize: 14, fontWeight: 400,
      color: '#6B6B7A', margin: '0 0 8px',
    }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: FD, fontSize: 28, fontWeight: 500, color: INK,
      margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em',
    }}>
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

    document.querySelectorAll<HTMLElement>('.stagger-group').forEach(group => {
      const items = Array.from(group.querySelectorAll<HTMLElement>(':scope > .stagger-item'));
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.06,
            ease: 'power2.out',
          });
        },
      });
    });

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.dataset.count ?? '';
          const suffix = el.dataset.suffix ?? '';
          const isPlus = raw.startsWith('+');
          const isX = raw.startsWith('×');
          const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
          if (isNaN(n)) return;
          const duration = 700;
          let start: number | null = null;
          const tick = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val = Number.isInteger(n) ? Math.round(ease * n) : Math.round(ease * n * 10) / 10;
            el.textContent = `${isX ? '×' : isPlus ? '+' : ''}${val}${suffix}`;
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
          {['Building', 'an', 'AI', 'interior', 'design', 'app'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <br />
          {['from', 'zero', 'to', '+30%', 'subscription', 'conversion'].map((w, i, arr) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${(i + 6) * 0.06 + 0.1}s` }}>{w}</span>
              {i < arr.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h1>

        {/* intro + meta two-column */}
        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: 48, marginBottom: 0, paddingBottom: 36, borderBottom: `1px solid ${BORDER}`, alignItems: 'start' }}>
          {/* left: intro */}
          <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
            First and only designer. Built everything from scratch —{' '}
            <strong style={{ color: INK, fontWeight: 500 }}>branding, design system, MVP, acquisition funnel,</strong>{' '}
            and 15+ A/B experiments after launch. Full ownership, no handoffs. Daily collaboration with PM and engineers.
          </p>

          {/* right: meta rows */}
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',     value: 'Sole product designer' },
              { label: 'Platform', value: 'iOS + Web' },
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
          <div className="r-metrics-row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {[
              { value: '+30%',    raw: '+30',  suffix: '%',  label: 'New user conversion\nto subscription' },
              { value: '+86%',    raw: '+86',  suffix: '%',  label: 'LTV from\npaywall timing' },
              { value: '1.2 min', label: 'Time to first\ngeneration (was 4.5)', isStatic: true },
              { value: '< 10%',  label: 'Day-0 cancellation\nrate at launch', isStatic: true },
            ].map((m) => (
              <div key={m.value} className="stagger-child">
                {m.isStatic ? (
                  <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1 }}>
                    {m.value}
                  </p>
                ) : (
                  <p
                    data-count={m.raw}
                    data-suffix={m.suffix}
                    style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1 }}
                  >
                    {m.value}
                  </p>
                )}
                <p style={{ fontFamily: FD, fontSize: 13, color: BODY, margin: '8px 0 0', lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* phone mockup animation */}
        <div className="phone-bg" style={{
          marginTop: 64,
          borderRadius: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px 24px 64px',
          overflow: 'hidden',
        }}>
          <div className="phone-stage">
            <div className="phone-glow" />
            <div className="phone-item phone-item--l">
              <img src="/cases/phone-left.png" alt="CasaVista design studio" />
            </div>
            <div className="phone-item phone-item--r">
              <img src="/cases/phone-right.png" alt="CasaVista floor change" />
            </div>
            <div className="phone-hint">Hover to interact</div>
          </div>
        </div>

      </section>

      {/* ── DISCOVERY ────────────────────────────────────────────────────── */}
      <section id="discovery" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Discovery: reading the data before touching the UI</H2>

        {/* stats line */}
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.5, margin: '0 0 20px' }}>
          Competitor UX audit across <strong style={{ fontWeight: 500, color: INK }}>6 AI apps</strong> — paywall timing, pricing, trial mechanics, upsell placement ·{' '}
          User behavior analysis tracking <strong style={{ fontWeight: 500, color: INK }}>drop-offs, generation count before purchase, cancellation timing</strong>
        </p>

        {/* insights */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {[
            {
              n: '1',
              bold: 'Conviction before conversion — 3 generations changes everything',
              quote: <>&ldquo;I need to try more first.&rdquo; — <strong>62% of exit survey responses</strong> after seeing the paywall at generation 1</>,
              who: "Exit survey, first cohort",
            },
            {
              n: '2',
              bold: 'Outcome copy outperforms feature copy every time',
              quote: <>&ldquo;Redesign This Room&rdquo; vs &ldquo;Start AI Design&rdquo; — <strong>same screen, same UI, +18% tap-through</strong> from one word change</>,
              who: "A/B test, 12,000 users",
            },
            {
              n: '3',
              bold: 'Transparency is the cheapest retention lever',
              quote: <>&ldquo;I didn&apos;t know when I&apos;d be charged — so I canceled immediately. <strong>No trust, no retention</strong>.&rdquo;</>,
              who: "User interview, week 2",
            },
          ].map((item, i) => (
            <div key={i} className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: 32, alignItems: 'start' }}>
              <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, lineHeight: 1.4, margin: 0, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ color: '#6B6B7A', fontWeight: 500, flexShrink: 0 }}>{item.n}/</span>
                {item.bold}
              </p>
              <div className="hover-note" style={{ backgroundColor: '#F7F7F9', padding: '14px 16px', borderLeft: `2px solid ${BORDER}`, display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
                <p style={{ fontFamily: FD, fontSize: 14, color: BODY, lineHeight: 1.6, margin: '0 0 6px' }}>
                  {item.quote}
                </p>
                <p style={{ fontFamily: FD, fontSize: 13, color: '#6B6B7A', margin: 0 }}>— {item.who}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderLeft: `2px solid ${BORDER}`, paddingLeft: 16, marginTop: 24 }}>
          <p style={{ fontFamily: FD, fontSize: 15, color: '#9B6F3A', lineHeight: 1.6, margin: 0 }}>
            Data shaped every experiment. Each A/B test was a hypothesis — not a guess.
          </p>
        </div>
      </section>

      {/* ── PAYWALL ──────────────────────────────────────────────────────── */}
      <section id="paywall" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Paywall experiments to turn visitors into subscribers</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>Three experiments, one principle: the ask only works <strong style={{ color: INK, fontWeight: 500 }}>after conviction is built</strong>. Timing, framing, and transparency each moved the needle independently.</Body>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Experiment 1 — Paywall timing', title: 'Delay the ask until after 3 generations',
                result: '+86% LTV',
                body: 'Paywall after the first generation converted at 1.8%. After three generations — 8.2%. Users experience quality before the ask. Before conviction exists, even the best copy fails.',
              },
              {
                v: 'V2', tag: 'Experiment 2 — Plan defaults', title: 'Annual plan first, monthly behind "View all plans"',
                result: '+22% annual subscriptions',
                body: 'Annual plan only upfront. Monthly hidden behind one tap. Everyone anchors to annual — not because we hid monthly, but because annual was the default reference point.',
              },
              {
                v: 'V3', tag: 'Experiment 3 — Trial transparency', title: 'Show the timeline: Today → Day 5 reminder → Day 7 charge',
                result: 'Cancellation rate 0d < 10%',
                body: '"How can I cancel?" FAQ on the paywall. Transparency = trust = retention. Day-0 cancellations dropped sharply — users who understood the trial kept it.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 ${it.tag}`} />
                </div>
                <div>
                  <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: '0 0 10px' }}>{it.body}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>{it.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* results */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '+86%', label: 'LTV from\npaywall timing shift' },
              { n: '+22%', label: 'Annual subscriptions\nfrom plan ordering' },
              { n: '< 10%', label: 'Day-0 cancellation\nrate at launch' },
            ].map((m) => (
              <div key={m.n} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── FUNNEL ───────────────────────────────────────────────────────── */}
      <section id="funnel" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Acquisition experiments to bring in higher-intent users</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Two experiments that proved copy and friction design matter more than visual polish — <strong style={{ color: INK, fontWeight: 500 }}>one word change and one gate changed everything.</strong>
        </Body>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Experiment 4 — Web-to-app funnel', title: 'One taste on web, then hard-gate to app',
                result: 'CR 8.2% → 14.8%',
                body: 'Tested four concepts: direct link, quiz, 3 free gens with soft gate, 1 free gen with hard gate. Winner: one taste on web, then hard-gate to app. Desire plus friction produces higher-intent installs.',
              },
              {
                v: 'V2', tag: 'Experiment 5 — CTA copy', title: '"Redesign This Room" outperformed "Start AI Design"',
                result: '+18% tap-through',
                body: 'Outcome framing vs. tool framing. "Redesign This Room" (verb specific to what\'s on screen) won over "Start AI Design" (generic feature label). This moved conversion more than any visual change shipped across 18 months.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 ${it.tag}`} />
                </div>
                <div>
                  <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: '0 0 10px' }}>{it.body}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>{it.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* results */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '14.8%', label: 'Web-to-app install CR\n(was 8.2%)' },
              { n: '+18%', label: 'Tap-through from\noutcome CTA copy' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── ENGAGEMENT ───────────────────────────────────────────────────── */}
      <section id="engagement" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Engagement experiments to turn first-timers into regulars</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Users who generate 2 rooms retain at <strong style={{ color: INK, fontWeight: 500 }}>3× the rate</strong> of one-and-done users. Both experiments moved users to that second generation.
        </Body>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Experiment 6 — Upsell placement', title: 'Surface editing tools inline, not buried in settings',
                result: '+34% upsell conversion',
                body: 'Only 8% of users found editing tools (Change Flooring, Paint Walls, Remove Objects) buried in a secondary menu — despite users who found them converting to paid at 2.3× baseline. Moved tools to a persistent labeled action bar below every result. No new features built.',
              },
              {
                v: 'V2', tag: 'Experiment 7 — Action center', title: 'Prompt the second generation in the first session',
                result: 'Activation > 30%',
                body: 'Users who generate 2 rooms in session 1 retain at 3× the rate. Action center prompts a second generation at peak excitement — immediately after the first result. Timing is the mechanic.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 ${it.tag}`} />
                </div>
                <div>
                  <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: '0 0 10px' }}>{it.body}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: 0 }}>{it.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* results */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '+34%', label: 'Upsell conversion from\ninline tool placement' },
              { n: '> 30%', label: 'Action center activation\nin first session' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* next steps */}
        <div style={{ marginTop: 28 }}>
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

      </section>

      {/* ── DESIGN SYSTEM ────────────────────────────────────────────────── */}
      <section id="system" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Design system</SectionLabel>
        <H2>Token-based system that turned weeks of reskinning into hours</H2>
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.75, margin: '4px 0 28px' }}>
          Built with Claude Code. Token-based component library for web and mobile — reskin all flows by changing tokens, not rebuilding screens.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Multiple app variants targeting different audiences: same features, different UI, branding, and ASO.</strong>{' '}
          New variant ships in hours, not weeks.
        </p>

        <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
          <Placeholder aspect="16/7" label="📷 Design system + 2–3 app variants with different branding on same flows" />
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>What I built</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '15+', label: 'A/B experiments\nrun over 18 months' },
              { n: '3×', label: 'Faster variant launches\nwith token system' },
              { n: '1', label: 'Designer — end-to-end\nownership' },
            ].map((m) => (
              <div key={m.n} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
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
            { title: 'Copy is design', body: 'A CTA change outperformed every visual redesign. "Redesign This Room" moved conversion more than any screen change shipped.' },
            { title: 'Timing beats messaging', body: 'The best paywall copy fails before conviction is built. Delay the ask until after three generations — then even simple copy converts.' },
            { title: 'Transparency reduces churn', body: 'Trial timelines increased trust and dropped day-0 cancellations. Users who understood the terms kept the subscription.' },
            { title: 'Systems enable scale', body: 'Token-based design system + Claude Code turned weeks of reskinning into hours. Architecture is a growth lever.' },
            { title: 'Iteration over redesign', body: '18 months of sequenced bets compounded into +30% conversion. No big bang. Each experiment built on the last.' },
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
