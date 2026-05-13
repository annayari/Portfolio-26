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
      color: '#6B6B7A', margin: '0 0 2px',
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

export function MateAcademyMentor() {
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
          {['Reducing', 'the', 'time', 'for', 'mentors'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <br />
          {['to', 'review', 'home', 'tasks', 'by', '25%'].map((w, i, arr) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${(i + 5) * 0.06 + 0.1}s` }}>{w}</span>
              {i < arr.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h1>

        {/* intro + meta two-column */}
        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: 48, marginBottom: 0, paddingBottom: 36, borderBottom: `1px solid ${BORDER}`, alignItems: 'start' }}>
          {/* left: intro */}
          <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
            Mentorship costs made up{' '}
            <strong style={{ color: INK, fontWeight: 500 }}>70% of studying expenses</strong>{' '}
            — and no one knew how long a review should take, so it took as long as it took. I designed three features that attacked the problem from three angles: eliminate tool friction, replace idle tracking, and make performance visible.
          </p>

          {/* right: meta rows */}
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',  value: 'Product designer' },
              { label: 'Scope', value: '3 features\nend-to-end' },
              { label: 'Year',  value: '2023' },
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
              { value: '13h→7.48h', label: 'Median review time\nacross two quarters' },
              { value: '~5%',       label: 'Monthly cost savings\nfrom fewer iterations' },
              { value: '$1,520',    label: 'Saved monthly\nreplacing Toggl' },
              { value: '3→1',       label: 'Tools replaced by\none unified platform' },
            ].map((m) => (
              <div key={m.value} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1 }}>
                  {m.value}
                </p>
                <p style={{ fontFamily: FD, fontSize: 13, color: BODY, margin: '8px 0 0', lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 80 }}>
        <SectionLabel>Breakdown of the problem</SectionLabel>
        <H2>Mentorship was expensive — and invisible</H2>

        {/* 2×2 open grid */}
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 48px', marginTop: 24 }}>
          {[
            { emoji: '🔧', title: '3 disconnected tools', desc: 'Strapi for homework, Google Sheets for tracking, Toggl for time. Every tool switch was friction. Every gap was a cost leak.' },
            { emoji: '⏱️', title: 'No time benchmarks', desc: 'Same task: 5 min vs 40 min, no quality difference. Parkinson\'s Law confirmed — without a target, work expands to fill the time.' },
            { emoji: '💤', title: 'Idle time tracked as work', desc: 'Toggl had no activity context. It couldn\'t tell homework review from idle time — mentors were paid for gaps, not just work.' },
            { emoji: '💸', title: 'Mentorship = 70% of costs', desc: 'No visibility into what drove the variance. No performance baseline, no benchmark, no way to improve what couldn\'t be measured.' },
          ].map(p => (
            <div key={p.title}>
              <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, margin: '0 0 10px', lineHeight: 1.3 }}>
                {p.emoji} {p.title}
              </p>
              <Body style={{ fontSize: 15, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{p.desc}</Body>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCOVERY ────────────────────────────────────────────────────── */}
      <section id="discovery" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Discovery: mapping the cost chain</H2>

        {/* stats line */}
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.5, margin: '0 0 20px' }}>
          Stakeholder interviews with <strong style={{ fontWeight: 500, color: INK }}>coordinators, mentors, and finance</strong> ·{' '}
          Workflow audit across <strong style={{ fontWeight: 500, color: INK }}>3 tools</strong> ·{' '}
          Data analysis of <strong style={{ fontWeight: 500, color: INK }}>review time variance</strong>
        </p>

        {/* insights + quotes */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {[
            {
              n: '1',
              bold: 'Every tool switch was a cost leak',
              quote: <>&ldquo;I have four tabs open just to leave one comment. By the time I&apos;m done switching, <strong>I&apos;ve lost the context</strong>.&rdquo;</>,
              who: "Mentor, Frontend track",
            },
            {
              n: '2',
              bold: 'Same task, 5–40 min — with no quality difference',
              quote: <>&ldquo;I never knew if I was too fast or too slow. <strong>There was no reference point</strong>, so I just took my time.&rdquo;</>,
              who: "Mentor, Python track",
            },
            {
              n: '3',
              bold: 'Without visibility, you can\'t manage what you can\'t see',
              quote: <>&ldquo;We had no idea which mentors were efficient and which weren&apos;t. <strong>We paid everyone the same</strong> regardless.&rdquo;</>,
              who: "Coordinator, QA track",
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
            Strategy: reduce time per task + eliminate idle tracking + measure performance = reduce costs
          </p>
        </div>
      </section>

      {/* ── REVIEW PLUGIN ────────────────────────────────────────────────── */}
      <section id="review-plugin" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Feature 01</SectionLabel>
        <H2>Review Plugin to replace three broken tools with one</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Built an in-platform review plugin replacing Strapi and Google Sheets —{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>homework list with filters, student info, review history, direct messaging.</strong>{' '}
          Tested with 15+ mentors, iterated on prioritization and speed.
        </Body>

        {/* hero image */}
        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <Placeholder aspect="16/7" label="📷 Review plugin — homework list, student info, review history, DM" />
        </div>

        {/* design decisions */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Behavioral nudge: show the average, change the behavior
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              Each card shows average review time — which I deliberately set 20% lower than the actual median. Mentors anchor to the displayed number and self-correct pace. No mandate needed — just a shifted reference point.
            </Body>
            <div className="img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
              <Placeholder aspect="16/7" label="📷 Homework card with behavioral time indicator" />
            </div>
          </div>
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Iteration 1', title: 'Unified homework list',
                body: 'Replaced Strapi with a single filtered list — all submissions in one place, student context inline. Mentors no longer needed to open external tools to start a review.',
              },
              {
                v: 'V2', tag: 'Discovery', title: 'Prioritization was the missing piece',
                body: <><strong style={{ color: INK, fontWeight: 500 }}>Mentors spent time choosing what to review next, not reviewing.</strong> Testing with 15+ mentors revealed: the order mattered as much as the interface. Added smart sorting — overdue first, then by student progress stage.</>,
              },
              {
                v: 'V3', tag: 'Iteration 2', title: 'Time indicator as anchor',
                body: 'Added per-card average review time display. Set the shown average 20% below the measured median. Mentors calibrated to it without being told to — review time dropped without a single policy change.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 Review plugin ${it.v}`} />
                </div>
                <div>
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.tag}</p>}
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>
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
              { n: '13h→10h', label: 'Median review time\nafter plugin launch' },
              { n: '~5%', label: 'Monthly cost savings\nfrom fewer review iterations' },
              { n: '3→1', label: 'Tools replaced\nby the plugin' },
            ].map((m) => (
              <div key={m.n} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── TIME TRACKER ─────────────────────────────────────────────────── */}
      <section id="time-tracker" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Feature 02</SectionLabel>
        <H2>Time Tracker to replace $1,520/month Toggl with a smarter native tool</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Toggl had no activity context — couldn&apos;t tell homework review from idle time.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Built a native tracker: persistent header timer, activity categorization, calendar view, and auto-sync with the review plugin.</strong>{' '}
          When a mentor clicks "Start review" — the timer starts automatically.
        </Body>

        {/* hero image */}
        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <Placeholder aspect="16/7" label="📷 Timer widget + calendar view + admin entry point" />
        </div>

        {/* design decisions */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              5 roles, one system — IA was the hardest challenge
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              Mentors see daily stats. Coordinators manage hours and rates. Finance exports salary tables. Management sees track-level performance. One product serving five different mental models — information architecture mattered more than UI.
            </Body>
          </div>
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Iteration 1', title: 'Persistent timer, zero manual entry',
                body: 'Timer lives in the persistent header — always visible, never forgotten. Activity categorization built in: homework review, calls, admin work. No manual entry, no room for error.',
              },
              {
                v: 'V2', tag: 'Iteration 2', title: 'Auto-sync with the review plugin',
                body: <><strong style={{ color: INK, fontWeight: 500 }}>Clicking "Start review" on a homework card starts the timer automatically.</strong> Category pre-filled, student context attached. Mentors never had to remember to log — it happened as a side effect of working.</>,
              },
              {
                v: 'V3', tag: 'Iteration 3', title: 'Calendar view + editing history',
                body: 'Calendar shows daily and weekly rhythm — when mentors work, not just how long. Editing history preserved for audit trail. Coordinators can see corrections without manual monitoring.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 Time tracker ${it.v}`} />
                </div>
                <div>
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.tag}</p>}
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>
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
              { n: '$1,520', label: 'Saved monthly\nreplacing Toggl' },
              { n: '5 roles', label: 'Served by one\nunified tracker' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── PERFORMANCE DASHBOARD ────────────────────────────────────────── */}
      <section id="dashboard" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Feature 03</SectionLabel>
        <H2>Performance Dashboard to make productivity visible to everyone</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          When mentors saw their stats next to track averages,{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>they self-corrected.</strong>{' '}
          Measurement alone drove improvement — before any policy change.
        </Body>

        {/* hero image */}
        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <Placeholder aspect="16/7" label="📷 Coordinator dashboard — tracked vs factual time + mentor performance comparison" />
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Iteration 1', title: 'Performance dashboard',
                body: 'Tracked vs. factual time per mentor with track-average benchmarks. Side-by-side comparison made outliers visible without calling anyone out — just data, in context.',
              },
              {
                v: 'V2', tag: 'Iteration 2', title: 'Idle time detection — friendly, not punitive',
                body: <>&ldquo;It seems you might have left the timer on.&rdquo; — a friendly notification when the timer runs without activity for 10+ minutes. <strong style={{ color: INK, fontWeight: 500 }}>Transparency, not surveillance.</strong> Maintained trust while solving the problem.</>,
              },
              {
                v: 'V3', tag: 'Iteration 3', title: 'Coordinator alerts for audit trail',
                body: 'Coordinators get flagged on anomalies — without manual monitoring. Prototyped with both mentors and coordinators, iterated on data visualization clarity post-launch. Post-launch data shaped every iteration.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <Placeholder aspect="4/3" label={`📷 Dashboard ${it.v}`} />
                </div>
                <div>
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.tag}</p>}
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                  <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>
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
              { n: '10h→7.48h', label: 'Median review time\nin one quarter' },
              { n: '25%', label: 'Total reduction\nin review time' },
              { n: '0', label: 'Policy changes needed\nto achieve the result' },
            ].map((m) => (
              <div key={m.n} className="stagger-child">
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
              'Connect performance data to compensation — reward efficiency, not just hours logged',
              'Add task-type breakdowns to surface which homework categories take longest',
              'Test peer benchmarking visibility — let mentors opt into seeing anonymized peer stats',
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

      {/* ── LEARNINGS ────────────────────────────────────────────────────── */}
      <section id="learnings" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Learnings</H2>
        <p style={{ fontFamily: FD, fontSize: 18, color: '#6B6B7A', margin: '4px 0 28px', lineHeight: 1.4 }}>
          A 25% reduction without a single mandate — measurement and design did the work
        </p>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'Nudges outperform mandates', body: 'A subtly lowered average changed behavior without a single policy change. The reference point is the intervention.' },
            { title: 'Visibility drives accountability', body: 'When mentors saw their stats next to track averages, they self-corrected. Measurement alone drove improvement.' },
            { title: 'Transparency beats surveillance', body: '"You might have left the timer on" maintained trust while solving the idle time problem. Tone of voice is a design decision.' },
            { title: 'Design for roles, not screens', body: '5 roles, one system — information architecture was the hardest challenge, not the UI. Start with who needs what, not what it looks like.' },
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
