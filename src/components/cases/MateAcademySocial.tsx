"use client";
import React, { useEffect } from "react";
import { ArrowUp, Mic } from "lucide-react";
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

        {/* Row 1: Analytics audit + Survey */}
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0 12px' }}>

          {/* Analytics audit */}
          <div style={{ backgroundColor: '#F9F9F9', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
            <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Analytics audit</p>
            <div style={{ display: 'flex', gap: 32 }}>
              <div>
                <p style={{ fontFamily: FD, fontSize: 36, fontWeight: 500, color: INK, margin: '0 0 3px', lineHeight: 1, letterSpacing: '-0.02em' }}>3×</p>
                <p style={{ fontFamily: FD, fontSize: 13, color: '#6B6B7A', margin: 0, lineHeight: 1.4 }}>faster churn with<br />no peer interaction</p>
              </div>
              <div>
                <p style={{ fontFamily: FD, fontSize: 36, fontWeight: 500, color: INK, margin: '0 0 3px', lineHeight: 1, letterSpacing: '-0.02em' }}>&lt;5%</p>
                <p style={{ fontFamily: FD, fontSize: 13, color: '#6B6B7A', margin: 0, lineHeight: 1.4 }}>chat adoption<br />despite chat existing</p>
              </div>
            </div>
          </div>

          {/* Survey */}
          <div style={{ backgroundColor: '#F9F9F9', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
            <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Survey — 220 respondents</p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {[
                { pct: '68%', label: 'felt alone while studying' },
                { pct: '54%', label: 'wanted to see how peers solve tasks' },
                { pct: '41%', label: 'would study more if they saw others active' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, margin: 0, lineHeight: 1, minWidth: 44 }}>{s.pct}</p>
                  <p style={{ fontFamily: FD, fontSize: 13, color: BODY, margin: 0, lineHeight: 1.3 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Row 2: Interview quotes */}
        <div style={{ backgroundColor: '#F9F9F9', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20, marginBottom: 12 }}>
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: FD, fontSize: 16, fontWeight: 600, color: INK, margin: '0 0 2px' }}>Interviews — 8 students</p>
            <p style={{ fontFamily: FD, fontSize: 13, color: '#6B6B7A', margin: 0, lineHeight: 1.4 }}>Root cause: not a motivation problem — a <strong style={{ color: INK }}>visibility</strong> problem</p>
          </div>
          <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {([
              <>"I have no idea if anyone else is <strong style={{ color: INK }}>stuck</strong> on this or if it&apos;s just me."</>,
              <>"I finished a task and <strong style={{ color: INK }}>nothing happened</strong> — no one to compare with, no feedback, just <strong style={{ color: INK }}>silence</strong>."</>,
              <>"I would message someone if I knew they <strong style={{ color: INK }}>just solved it</strong>. But I have <strong style={{ color: INK }}>no way to know</strong>."</>,
              <>"Seeing a <strong style={{ color: INK }}>peer&apos;s solution</strong> — there were <strong style={{ color: INK }}>3 ways to solve it</strong>. More than the task taught me."</>,
              <>"The leaderboard shows points but <strong style={{ color: INK }}>nothing about what people are actually doing</strong>."</>,
              <>"I feel like I&apos;m <strong style={{ color: INK }}>learning alone</strong> even though there are <strong style={{ color: INK }}>thousands of us</strong>."</>,
            ] as React.ReactNode[]).map((node, i) => (
              <div key={i} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: '12px 14px' }}>
                <p style={{ fontFamily: FD, fontSize: 13, color: '#4A4A5A', lineHeight: 1.6, margin: 0 }}>{node}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Competitive analysis */}
        <div style={{ backgroundColor: '#F9F9F9', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 20px' }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 6px' }}>Competitive analysis — 6 platforms</p>
          <p style={{ fontFamily: FD, fontSize: 15, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1.3 }}>Real-time activity drives engagement</p>
          <p style={{ fontFamily: FD, fontSize: 13, color: BODY, margin: 0, lineHeight: 1.5 }}>Codecademy, LeetCode, GitHub, Duolingo, Coursera, LinkedIn Learning — who&apos;s here <em>now</em> matters, not who was here before.</p>
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
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
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
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.tag}</p>}
                  {it.title && <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 12px' }}>{it.title}</p>}
                  {it.body && (it.v === 'V1' ? (
                    <div style={{ borderLeft: '3px solid #C4BDFF', backgroundColor: '#F3F1FF', padding: '8px 12px' }}>
                      <p style={{ fontFamily: FD, fontSize: 15, color: '#4A3F8A', lineHeight: 1.6, margin: 0 }}>{it.body}</p>
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
          <img src="/cases/mate-social-peer-solutions.jpg" alt="Task page — peer solutions panel" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ marginBottom: 56, marginTop: 56 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
            {[
              {
                v: 'V1', tag: 'Iterations', title: '3 clicks to zero',
                body: 'Moved "Solving now" from a separate page to inline on the task. Tested with students, validated with data. Finish the task — see your peers instantly.',
              },
            ].map((it) => (
              <div key={it.v} style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                <div>
                  {it.tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.tag}</p>}
                  {it.title && <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 6px' }}>{it.title}</p>}
                  {it.body && <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>}
                </div>
                <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <img src="/cases/mate-social-peer-process.jpg" alt="Peer solutions process" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Completion gate
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
              Solutions locked until you submit yours. One rule that prevented copying and made the reveal feel earned. 15% who see peer activity start a DM.
            </Body>
            <div className="img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
              <img src="/cases/mate-social-peer-locked.jpg" alt="Locked vs unlocked state" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ borderLeft: '3px solid #C4BDFF', backgroundColor: '#F3F1FF', padding: '8px 12px' }}>
              <p style={{ fontFamily: FD, fontSize: 15, color: '#4A3F8A', lineHeight: 1.6, margin: 0 }}>Worked with design team to extend existing components for code display, peer indicators, and messaging interfaces while maintaining platform consistency</p>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 20px' }}>Result</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 48 }}>
              {[
                { n: '1,000+', label: 'Monthly DMs' },
                { n: '15%', label: 'Clicked at user task\nactivity start a DM' },
              ].map((m) => (
                <div key={m.n}>
                  <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                  <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{m.label}</p>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>2 min</p>
              <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{'DMs happen within 2 minutes\nof viewing peer code'}</p>
            </div>
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
      <section id="mobile" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 40 }}>
        <SectionLabel>Mobile app</SectionLabel>
        <div style={{ margin: '0 0 6px' }}><H2>Social features on the go</H2></div>
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.6, margin: '0 0 16px' }}>
          Full feature parity on mobile: students solve tasks, message peers, and review solutions from any device, anytime.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mate-social-mobile-1.jpg" alt="Mobile — peer solutions" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img src="/cases/mate-social-mobile-2.jpg" alt="Mobile — solution sharing" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
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
