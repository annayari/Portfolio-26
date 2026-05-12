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

export function MateAcademySocial() {
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
          {['Boosting', 'user', 'DMs', 'and', 'task', 'interaction'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <br />
          {['by', '15%', 'with', 'launched', 'social', 'features'].map((w, i, arr) => (
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
            2,000+ students studying completely alone. No visible peers, no collaboration, no proof
            anyone else is here.{' '}
            <strong style={{ color: INK, fontWeight: 500 }}>Isolated learners disengage faster and churn silently.</strong>{' '}
            I owned end-to-end design of two features that turned a solo tool into a peer-driven experience.
          </p>

          {/* right: meta rows */}
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',     value: 'Product designer' },
              { label: 'Scope',    value: '2 features\nend-to-end' },
              { label: 'Year',     value: '2023' },
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
              { value: '1,000+', label: 'Monthly DMs\nbetween students', isStatic: true },
              { value: '15%', raw: '15', suffix: '%', label: 'Conversion from peer\nactivity to DM' },
              { value: '40K', raw: '40', suffix: 'K', label: 'Monthly peer\nsolution views' },
              { value: '+7.37%', raw: '+7.37', suffix: '%', label: 'Mobile app usage\nafter launch' },
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

      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 80 }}>
        <SectionLabel>Breakdown of the problem</SectionLabel>
        <H2>The platform had great content — but zero social layer</H2>

        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 48px', marginTop: 24 }}>
          {[
            { emoji: '👤', title: 'No visible peers', desc: 'Students had no way to see who else was on the platform. No peer presence meant no sense of a cohort — just solo grinding.' },
            { emoji: '🔇', title: 'No way to connect', desc: 'Chat existed but adoption was under 5%. Students didn\'t know who to talk to — no context for reaching out.' },
            { emoji: '📉', title: '3× faster churn', desc: 'Students who never interacted with another user churned 3× faster. Weekend activity was near-zero for solo learners.' },
            { emoji: '🏁', title: 'Submission as a dead end', desc: 'After solving a task — nothing. No peer perspective, no alternative approaches, no signal that the work mattered.' },
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
        <H2>Discovery: mapping the isolation</H2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, margin: '20px 0 28px' }}>
          {[
            { n: '120', label: 'Survey respondents' },
            { n: '8', label: 'In-depth interviews' },
            { n: '6', label: 'Competitive platforms benchmarked' },
            { n: '10', label: 'Usability tests' },
          ].map(m => (
            <div key={m.n} style={{ backgroundColor: '#F5F5F3', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ fontFamily: FD, fontSize: 28, fontWeight: 500, color: INK, margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.01em' }}>{m.n}</p>
              <p style={{ fontFamily: FD, fontSize: 13, color: '#6B6B7A', margin: 0, lineHeight: 1.4 }}>{m.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginTop: 8 }}>
          {[
            {
              n: '01',
              bold: 'Students didn\'t lack motivation — they lacked social context',
              quote: <>&ldquo;I have no idea if anyone else is stuck on this or <strong style={{ color: INK, fontWeight: 500 }}>if it&apos;s just me</strong>.&rdquo;</>,
              who: "Student interview",
            },
            {
              n: '02',
              bold: '54% wanted to see how peers approach the same tasks',
              quote: <>&ldquo;I finished a task and nothing happened — no one to compare with, <strong style={{ color: INK, fontWeight: 500 }}>no feedback, just silence</strong>.&rdquo;</>,
              who: "Student interview",
            },
            {
              n: '03',
              bold: 'Real-time activity outperforms static history',
              quote: <><strong style={{ color: INK, fontWeight: 500 }}>Platforms showing who&apos;s here now outperform those showing who was here before.</strong> Benchmarked across Codecademy, Coursera, LeetCode, GitHub, LinkedIn, Duolingo.</>,
              who: "Competitive analysis, 6 platforms",
            },
          ].map((item, i) => (
            <div key={i} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              {item.n !== '03' && (
                <div style={{ padding: '20px 24px 18px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, color: '#A0A0A0', letterSpacing: '0.12em' }}>{item.n}</span>
                  <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, lineHeight: 1.45, margin: 0 }}>
                    {item.bold}
                  </p>
                </div>
              )}
              {item.n === '03' ? (
                <div style={{ padding: '20px 24px' }}>
                  <p style={{ fontFamily: FD, fontSize: 14, color: '#5A5A5A', lineHeight: 1.65, margin: '0 0 12px' }}>
                    {item.quote}
                  </p>
                  <span style={{ fontFamily: FM, fontSize: 10, color: '#9A9A9A', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Competitive analysis · 6 platforms</span>
                </div>
              ) : (
                <div style={{ backgroundColor: '#F9F9F9', borderTop: `1px solid ${BORDER}`, padding: '14px 24px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  <p style={{ fontFamily: FD, fontSize: 13, color: '#5A5A5A', lineHeight: 1.65, margin: 0, fontStyle: 'italic' as const }}>
                    {item.quote}
                  </p>
                  <span style={{ fontFamily: FD, fontSize: 12, color: '#9A9A9A', margin: 0 }}>— {item.who}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ── USER PROFILES ────────────────────────────────────────────────── */}
      <section id="profiles" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>User Profiles to make learners visible to each other</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Students had gamification — streaks, achievements, leaderboard — but all of it was private.{' '}
          <strong style={{ color: INK, fontWeight: 500 }}>Earned rewards with no audience.</strong>{' '}
          My approach: don&apos;t build a social network. Make the existing platform social by surfacing what&apos;s already there.
        </Body>

        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <img src="/cases/mate-social-profile-main.jpg" alt="Profile UI — progress, achievements, streak, DM button, social links" style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ marginBottom: 20, marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Contextual layer, not a destination
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 4 }}>
              Profile accessible from 6 entry points — leaderboard, chat, dashboard, calendar, events. Every data point individually toggleable. Public by default, private by choice.
            </Body>
          </div>
        </div>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: '', title: '',
                body: 'Collaborated with engineering on real-time data sync, privacy architecture, and scalable profile infrastructure',
              },
              {
                v: 'V3', tag: '', title: 'Post-launch',
                body: 'Tracked profile views, DM rates, privacy usage and then ran 7 follow-up interviews. Students who set privacy controls were more active, not less. Control increased trust and activity.',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>}
                  {it.title && <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 12px' }}>{it.title}</p>}
                  {it.body && (it.v === 'V1' ? (
                    <div style={{ borderLeft: '3px solid #8BA3CC', backgroundColor: '#ECF0F9', padding: '8px 12px' }}>
                      <p style={{ fontFamily: FD, fontSize: 15, color: '#3D5F8A', lineHeight: 1.6, margin: 0 }}>{it.body}</p>
                    </div>
                  ) : (
                    <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>
                  ))}
                </div>
                <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                  {it.v === 'V1' ? (
                    <img src="/cases/mate-social-profile-variations.jpg" alt="Engineering collaboration" style={{ width: '100%', display: 'block' }} />
                  ) : (
                    <img src="/cases/mate-social-profile-postlaunch.jpg" alt="Post-launch" style={{ width: '100%', display: 'block' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div>
            <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>1,000+</p>
            <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4 }}>users DM other users monthly</p>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              'Add activity feed for followed peers to surface recent progress',
              'Surface "studying now" real-time status on the leaderboard',
              'Test peer-matching by current topic for async accountability',
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

      {/* ── PEER SOLUTIONS ───────────────────────────────────────────────── */}
      <section id="peer-solutions" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Turning every solved task into a peer conversation</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>
          Task submission was a dead end. I turned it into a peer learning surface: <strong style={{ color: INK, fontWeight: 500 }}>see others&apos; solutions after submitting yours</strong>, find who&apos;s solving it now, message them directly.
        </Body>

        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <Placeholder aspect="16/7" label="📷 Task page — peer solutions panel + Solving now avatars + DM buttons" />
        </div>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 4px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Completion gate: one constraint that preserved integrity
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
              Solutions locked until you submit. One constraint that prevented copying and made the reveal feel earned. 15% of students who see peer activity start a DM.
            </Body>
            <div style={{ borderLeft: '3px solid #C8922A', backgroundColor: '#FDF6EC', padding: '8px 12px', marginBottom: 24 }}>
              <p style={{ fontFamily: FD, fontSize: 15, color: '#9B6F3A', lineHeight: 1.6, margin: 0 }}>Worked with design team to extend existing components for code display, peer indicators, and messaging interfaces while maintaining platform consistency</p>
            </div>
            <div className="img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
              <Placeholder aspect="16/7" label="📷 Locked vs unlocked state: Solve to see peer solutions → solutions visible" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', tag: 'Process', title: 'Friction from 3 clicks to zero',
                body: 'Analyzed 4 competitive solution-sharing platforms. Iterative testing with students — moved "Solving now" from a separate page to inline on the task. Friction dropped from 3 clicks to zero.',
              },
            ].map((it) => (
              it.v === 'V3' ? (
                <div key={it.v} className="stagger-item">
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>}
                  {it.title && <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>}
                  {it.body && <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>}
                </div>
              ) : (
                <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                  <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                    <Placeholder aspect="4/3" label={`📷 Peer solutions — ${it.tag}`} />
                  </div>
                  <div>
                    {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 8px' }}>{it.tag}</p>}
                    {it.title && <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>}
                    {it.body && <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 20px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '1,000+', label: 'Monthly DMs' },
              { n: '15%', label: 'Clicked at user task\nactivity start a DM' },
              { n: '2 min', label: 'DMs happen within\n2 minutes of viewing peer code' },
            ].map((m) => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              'Improve visual hierarchy in "Solving now" modal: add filters, sorting, or prioritization of active users',
              'Test different ways to initiate conversations (quick templates, conversation starters)',
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

      {/* ── MOBILE ───────────────────────────────────────────────────────── */}
      <section id="mobile" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <SectionLabel>Mobile app</SectionLabel>
        <H2>Social features on the go</H2>
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.75, margin: '4px 0 28px' }}>
          Full feature parity on mobile: students solve tasks, message peers, and review solutions from any device, anytime.
        </p>

        <div style={{ borderRadius: 12, overflow: 'hidden' }}>
          <Placeholder aspect="16/8" label="📷 Web → Mobile: profile, solution sharing, solving now" />
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '+7.37%', label: 'App usage after\nsocial features launched' },
              { n: '1,000+', label: 'Monthly DMs, majority\ntask-related' },
            ].map((m) => (
              <div key={m.n}>
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
          Isolation was the churn driver — and social design was the fix
        </p>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'Real-time beats static', body: 'Live "solving now" converted 15%. Past solver lists converted almost nothing. Presence is the signal.' },
            { title: 'Completion gates preserve integrity', body: 'Lock-then-reveal kept learning honest and made peer solutions feel earned, not copied.' },
            { title: 'Privacy drives engagement', body: 'Students shared more when they controlled what\'s visible. Forced transparency kills adoption.' },
            { title: 'Data validates intuition', body: 'Analytics confirmed isolation as the churn driver before we designed anything. Post-launch data shaped every iteration. Design decisions backed by numbers, not assumptions.' },
            { title: 'Scale the system', body: 'Both features built on existing components. Faster handoff, zero visual debt.' },
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
