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
      padding: '0 24px',
    }}>
      {label && (
        <span style={{ fontFamily: FM, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: SUB, textAlign: 'center' as const }}>
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
          gsap.to(items, { opacity: 1, y: 0, duration: 0.28, stagger: 0.06, ease: 'power2.out' });
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
        <h1 className="r-case-h1" style={{
          fontFamily: FD, fontSize: 36, fontWeight: 500, color: INK,
          lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 24px',
        }}>
          {['Reducing', 'the', 'time', 'for', 'mentors', 'to', 'review', 'home', 'tasks', 'by', '25%'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
        </h1>

        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: 48, marginBottom: 0, paddingBottom: 36, borderBottom: `1px solid ${BORDER}`, alignItems: 'start' }}>
          <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
            Mentorship drove 70% of study costs, with homework reviews costing ~$350K/year. I designed three features to reduce review friction, replace idle tracking, and make mentor performance visible.
          </p>
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',  value: 'Product designer' },
              { label: 'Scope', value: '3 features\nend-to-end' },
            ].map(row => (
              <div key={row.label} className="r-meta-item" style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', textAlign: 'right' as const }}>{row.label}</span>
                <span style={{ fontFamily: FD, fontSize: 14, color: BODY, lineHeight: 1.5, whiteSpace: 'pre-line' as const }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ paddingTop: 48, marginBottom: 0 }}>
          <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: '0 0 20px' }}>Key results</p>
          <div className="r-metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 24px', width: '100%' }}>
            {[
              { value: '13h → 10h',   label: 'Median review time\ndecreased' },
              { value: '5%',         label: 'Monthly review\ncosts saved' },
              { value: '10h → 7.48h', label: 'Review time reduced\nin one quarter' },
              { value: '1 tool less', label: 'Toggl subscription\nremoved' },
            ].map((m) => (
              <div key={m.value} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 28, fontWeight: 500, color: INK, margin: '0 0 8px', lineHeight: 1 }}>{m.value}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: BODY, margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 80 }}>
        <SectionLabel>Breakdown of the problem</SectionLabel>
        <H2>Mentorship was expensive and invisible</H2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 64px', marginTop: 32, marginBottom: 40 }}>
          {[
            { emoji: '🔧', title: '3 disconnected tools', body: 'Strapi, Sheets, and Toggl created friction and made costs harder to track.' },
            { emoji: '🕰️', title: 'No time benchmarks', body: 'Without clear targets, the same review could take 5 or 40 minutes.' },
            { emoji: '💤', title: 'Idle time tracked as work', body: "Toggl couldn't separate real review time from idle gaps." },
            { emoji: '📋', title: 'Mentorship costs 70%', body: 'Mentorship was costly, but there was no baseline to manage it.' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, margin: '0 0 10px', lineHeight: 1.3 }}>
                {item.emoji} {item.title}
              </p>
              <Body style={{ fontSize: 15, lineHeight: 1.6 }}>{item.body}</Body>
            </div>
          ))}
        </div>


      </section>

      {/* ── DISCOVERY ────────────────────────────────────────────────────── */}

      {/* ── FEATURE 01 — REVIEW PLUGIN ───────────────────────────────────── */}
      <section id="review-plugin" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Review plugin to make mentors review homework in one place</H2>

        {/* Assignment logic — vertical: text above, image below */}
        <div style={{ marginTop: 48 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Exploration</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Assignment logic</h3>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            4-level priority logic helps mentors know which homework to review first. It chooses tasks based on waiting time, previous review context, task type, and similar tasks that can be reviewed together.
          </Body>
          <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-assignment-logic.jpg" alt="Assignment logic flow diagram" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Review interface — vertical: text above, images below */}
        <div style={{ marginTop: 48 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Iterations</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>From locked flow to flexible review</h3>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            Auto-assignment remained the default to preserve review fairness. After testing and mentor feedback, browsing, filtering, and sorting were added so <strong style={{ color: INK, fontWeight: 500 }}>mentors could prioritize work</strong> with broader context.
          </Body>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              { src: '/cases/mentor-review-list1.jpg', label: 'Task reviews: history view' },
              { src: '/cases/mentor-review-list3.jpg', label: 'Task reviews: list with task types' },
              { src: '/cases/mentor-review-list2.jpg', label: 'Task reviews: filters panel' },
            ].map((img, j) => (
              <div key={j} className="img-hover-wrap" style={{ position: 'relative' as const, width: '100%', borderRadius: 12, overflow: 'hidden', marginTop: j === 1 ? 36 : 0 }}>
                <img src={img.src} alt={img.label} style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute' as const, top: 16, left: 16, width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(11,13,17,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: FD, fontSize: 13, fontWeight: 500, color: '#fff', lineHeight: 1 }}>{j + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {[
          {
            tag: 'Exploration', title: 'Review interface',
            images: [{ aspect: '16/7', label: 'Current review interface', src: '/cases/mentor-review-it1.jpg' }],
            content: (
              <Body style={{ fontSize: 15, lineHeight: 1.6 }}>
                Built everything mentors asked for into one card: task description, module context. <strong style={{ color: INK, fontWeight: 500 }}>Tested with 15+ mentors</strong>, iterated on information density.
              </Body>
            ),
          },
          {
            tag: 'Design decision', title: 'Behavioral time nudge',
            images: [{ aspect: '16/7', label: 'Card: Avg. review time: 8 min (actual average is 10 min)', src: '/cases/mentor-review-it2.jpg' }],
            content: (
              <Body style={{ fontSize: 15, lineHeight: 1.6 }}>
                Shows mentors a suggested review time 20% below average and remaining iterations, giving them a clear reference point. This helped <strong style={{ color: INK, fontWeight: 500 }}>reduce cases where 24% of homework exceeded expected review cycles.</strong>
              </Body>
            ),
          },
        ].map((item, i) => (
          <div key={i} className="r-grid-asym r-case-iteration" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start', marginTop: i === 0 ? 96 : 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              {item.images.map((img, j) => (
                <div key={j} className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                  {(img as any).src
                    ? <img src={(img as any).src} alt={img.label} style={{ width: '100%', display: 'block' }} />
                    : <Placeholder aspect={img.aspect} label={img.label} />
                  }
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{item.tag}</p>
              <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 40 }}>
            {[
              { n: '13h→10h', label: 'Median review time\nafter plugin launch' },
              { n: '5%',     label: 'Monthly cost savings\nfrom fewer review iterations' },
              { n: '3→1',     label: 'Tools replaced\nby the plugin' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {['Auto-suggest relevant saved comments based on homework type', 'AI code analysis for common errors', 'Student history visible during review', 'Auto-distribution by mentor expertise'].map((text, i) => (
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

      {/* ── FEATURE 02 — TIME TRACKER ────────────────────────────────────── */}
      <section id="time-tracker" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Time-tracker to track mentor working hours inside the platform</H2>

        {/* Exploration: Timer placement */}
        <div className="r-grid-asym r-case-iteration" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start', marginTop: 48, marginBottom: 48 }}>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-timer-placement.jpg" alt="Timer placement" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Exploration</p>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Timer placement</h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6 }}>
              A native tracker replaced disconnected time logging with contextual tracking inside the review flow.
            </Body>
          </div>
        </div>

        {/* Design decision: Auto-sync */}
        <div className="r-grid-asym r-case-iteration" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start', marginBottom: 64 }}>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-auto-sync.jpg" alt="Auto-sync with review plugin" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decision</p>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Auto-sync with review plugin</h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6 }}>
              The timer starts automatically when a review begins and stops when it's completed, using the correct activity label throughout.
            </Body>
          </div>
        </div>

        {/* Design decision: Five roles */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decision</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
            Five roles, one system
          </h3>
          <div style={{ backgroundColor: 'rgba(249, 249, 249, 0.3)', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '0 20px', marginBottom: 24, overflowX: 'auto' as const }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontFamily: FD, fontSize: 15 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <th style={{ textAlign: 'left' as const, padding: '16px 0 14px', color: '#6B6B7A', fontWeight: 400, fontSize: 14, width: '40%' }}>Role</th>
                  <th style={{ textAlign: 'left' as const, padding: '16px 0 14px', color: '#6B6B7A', fontWeight: 400, fontSize: 14 }}>What they see</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { role: 'Mentor',      sees: 'Personal timer, daily and weekly stats' },
                  { role: 'Coordinator', sees: 'All mentors, editable hours, rates' },
                  { role: 'Manager',     sees: 'Track-level performance' },
                  { role: 'Finance',     sees: 'Hourly rates and salary export' },
                  { role: 'Admin',       sees: 'Full access' },
                ].map((row, i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                    <td style={{ padding: '16px 0', color: INK, fontWeight: 600 }}>{row.role}</td>
                    <td style={{ padding: '16px 0', color: BODY }}>{row.sees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-roles.jpg" alt="Timer tab, Calendar tab, Admin entry" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '$1,520',     label: 'Saved monthly\nreplacing Toggl' },
              { n: '4.69→3.25h', label: 'Mentor daily\nwork time' },
              { n: '5 roles',    label: 'Served by one\nunified tracker' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 03 — PERFORMANCE DASHBOARD ──────────────────────────── */}
      <section id="dashboard" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Feature 03</SectionLabel>
        <H2>Performance dashboard to make mentor productivity visible and accountable</H2>

        {/* Exploration: Dashboard layouts */}
        <div style={{ marginTop: 48, marginBottom: 48 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Exploration</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Dashboard layouts</h3>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            I researched 5 time-tracking tools, interviewed coordinators about time and budget issues, and tested 3 dashboard layouts with mentors and coordinators to make the data easier to read.
          </Body>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-dashboard-layouts.jpg" alt="Dashboard layouts" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Design decision: Tracked vs idle */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decision</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>Tracked vs. idle time</h3>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
            Work timeline shows tracked time, active time, and idle gaps in one view. Coordinators can spot unusual patterns in context without blaming anyone.
          </Body>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-dashboard-factual.jpg" alt="Tracked vs idle time" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Design decision: Idle detection */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decision</p>
          <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
            Idle detection and copy
          </h3>
          <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            Time tracker detects inactivity, notifies mentors and coordinators, and asks mentors to explain idle time.
          </Body>
          <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mentor-idle-detection.jpg" alt="Idle detection" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        {/* Result */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '10h→7.48h', label: 'Median review time\nin one quarter' },
              { n: '25%',       label: 'Total reduction\nin review time' },
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
          A 25% reduction without a single mandate — measurement and design did the work
        </p>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'Tool consolidation pays before optimization starts', body: 'Replacing side tools with one platform reduced operational overhead immediately before changing a single workflow.' },
            { title: 'Visible metrics change behavior on their own',      body: 'Mentors self-corrected when they saw their stats next to team averages. No enforcement was needed.' },
            { title: 'Information architecture is harder than UI',        body: 'Five roles shared one system, so the hardest part was deciding what each role should see, hide, or act on.' },
            { title: 'Accountability works when it feels fair',           body: 'Soft reminders and transparent dashboards created accountability without turning the product into surveillance.' },
            { title: 'Nudges can move behavior faster than policy',       body: 'A slightly more ambitious review-time benchmark shifted behavior across the team. No new rules just a clearer reference point.' },
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
