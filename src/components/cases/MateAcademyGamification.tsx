"use client";
import React, { useEffect } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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

const tagStyle: React.CSSProperties = {
  fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A',
};

function Tag({ children }: { children: React.ReactNode }) {
  return <span style={tagStyle}>{children}</span>;
}

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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK,
      margin: '0 0 10px', lineHeight: 1.3,
    }}>
      {children}
    </h3>
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

/* ── design decision block ────────────────────────────────────────────────── */

function DesignDecision({
  label, heading, problem, solution
}: {
  label: string; heading: string; problem: string; solution: string;
}) {
  return (
    <div>
      <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, margin: '0 0 16px', lineHeight: 1.3 }}>
        <span style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', marginRight: 12, flexShrink: 0 }}>{label}</span>
        {heading}
      </p>
      <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Body>{problem}</Body>
        <Body style={{ color: INK, fontWeight: 500 }}>{solution}</Body>
      </div>
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

export function MateAcademyGamification() {
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

    // ── Scroll reveal: sections fade up, repeat on scroll back ──
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

    // ── Iteration cards: stagger in with 80ms delay ──
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

    // ── Key results: count up from 0 ──
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
          {['Boosting', 'DAU/MAU', 'by', '36%', 'with'].map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero-word" style={{ display: 'inline-block', animationDelay: `${i * 0.06 + 0.1}s` }}>{w}</span>{' '}
            </React.Fragment>
          ))}
          <br />
          {['a', 'gamification', 'ecosystem', 'from', 'scratch'].map((w, i, arr) => (
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
            Long courses are hard to stick with. Students struggle to maintain motivation when they
            can't see whether their pace is normal and{' '}
            <strong style={{ color: INK, fontWeight: 500 }}>feel like they're studying alone</strong>{' '}
            — with no sense of progress relative to peers.
          </p>

          {/* right: meta rows */}
          <div className="r-meta-list" style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { label: 'Role',     value: 'Product designer' },
              { label: 'Team',     value: '1 PM · 6 devs' },
              { label: 'Scope',    value: '4 features\nend-to-end' },
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
              { value: '+36%', raw: '+36', suffix: '%', label: 'DAU/MAU\non weekends' },
              { value: '+30min', raw: '+30', suffix: 'min', label: 'Session time\nincreased' },
              { value: '46K', raw: '46', suffix: 'K', label: 'Achievements\nopened monthly' },
              { value: '×2', raw: '×2', suffix: '', label: 'Daily tasks\ncompleted' },
            ].map((m) => (
              <div key={m.value} className="stagger-child">
                <p
                  data-count={m.raw}
                  data-suffix={m.suffix}
                  style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: 0, lineHeight: 1 }}
                >
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
        <H2>Why students lose motivation in long self-paced courses</H2>

        {/* 2×2 open grid */}
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 48px', marginTop: 24 }}>
          {[
            { emoji: '🎯', title: 'No pace awareness', desc: 'Students could only compare progress with their own past — no reference for whether they were on track.' },
            { emoji: '🏝️', title: 'Isolation', desc: 'Students were studying in silence — no sense of a cohort, no signal that anyone else was there.' },
            { emoji: '📉', title: 'Weekend drop-off', desc: 'Analytics showed steep DAU drops on Sat–Sun. Students who kept weekend activity were 3× more likely to finish.' },
            { emoji: '⏳', title: 'No daily reason to return', desc: 'Without short-term loops, students skipped days, lost momentum, and churned.' },
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



      {/* ── STREAKS ──────────────────────────────────────────────────────── */}
      <section id="streaks" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Streaks to make students open the platform every single day</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>Building a daily habit loop that <strong style={{ color: INK, fontWeight: 500 }}>survives weekends</strong>, busy days, and self-doubt.</Body>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V1', title: 'Task-based trigger', tag: 'Iteration 1',
                body: <>Defined "active day" as completing <strong style={{ color: INK, fontWeight: 500 }}>1 practical task</strong> — achievable, tied to real learning, meaningful enough to feel like actual studying.</>,
                img: '/cases/streaks-v1.jpg',
              },
              {
                v: 'V2', title: 'Discovery', tag: '',
                body: <><strong style={{ color: INK, fontWeight: 500 }}>4 out of 7 interviewees</strong> had no reason to return daily — no habit loop & nothing pulling them back. Weekend activity dropped sharply.</>,
                img: '/cases/streaks-v2.jpg',
              },
              {
                v: 'V3', title: 'From counter to calendar', tag: 'Iteration 2',
                body: <><strong style={{ color: INK, fontWeight: 500 }}>Tested with 10 users across multiple feedback rounds to sharpen the logic before shipping.</strong> Replaced the counter with a calendar, added streak freeze, XP bonuses, personal records, and milestone celebrations.</>,
                img: '/cases/streaks-v3.jpg',
              },
            ].map((it) => (
              <div key={it.v} className="stagger-item r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                <div className={it.v !== 'V2' ? "img-hover-wrap" : undefined} style={{ borderRadius: 12, overflow: 'hidden' }}>
                  {it.img
                    ? <img src={it.img} alt={it.title} style={{ width: '100%', display: 'block' }} />
                    : <Placeholder aspect="16/9" label={`📷 ${it.title}`} />
                  }
                </div>
                <div>
                  {(it as any).tag && <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{(it as any).tag}</p>}
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
              { n: '+30 min', raw: '+30', label: 'Average time spent on\nthe platform increased' },
              { n: '×2', raw: '2×', label: 'More small daily tasks\nsolved by students' },
              { n: '42%', raw: '42%', label: 'Of users interact with\nstreaks daily' },
            ].map((m, i) => (
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
              'Allow users to restore broken streaks once per month to reduce frustration',
              'Adjust streak requirements for weekends when study patterns differ',
              'Add special rewards at streak milestones (7, 30, 100 days) to encourage long-term commitment',
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

      {/* ── LEADERBOARD ──────────────────────────────────────────────────── */}
      <section id="leaderboard" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Leaderboard to show students they're not studying alone</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>Here's the thing about isolation on a learning platform: the fix isn't adding a chat. It's <strong style={{ color: INK, fontWeight: 500 }}>making other students visible</strong>. A leaderboard, done right, doesn't create competition — it <strong style={{ color: INK, fontWeight: 500 }}>creates awareness</strong>.</Body>

        <div className="reveal" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <img src="/cases/leaderboard-user-stories.jpg" alt="Leaderboard design with user stories" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* design decisions */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
          <div>
            <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              Placement determines whether a feature helps or competes
            </h3>
            <Body style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              The leaderboard belongs in the sidebar — close enough to feel relevant, contained enough to stay out of the way.
            </Body>
            <div className="img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
              <img src="/cases/placement-explorations.jpg" alt="Placement explorations" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 32 }}>
            {[
              {
                v: 'V1', title: 'Simple ranked list',
                body: 'Built the most basic version to validate the core hypothesis: does seeing peers help? It did — but students at the bottom (#48 of 200) felt worse, not better. No context for whether their rank was normal.',
                imgLabel: 'V1 — basic leaderboard with podium + rank list',
              },
              {
                v: 'V2', title: 'Small leagues, tier progression, monthly reset',
                body: 'Redesigned around small cohorts (~30 peers), 2-week sprints, and league promotion. Added Q&A block after usability testing revealed 7/7 students asked "how do I move up?" Follow-up surveys surfaced a new need: students wanted to track progress over time, not just see a current snapshot.',
                imgLabel: 'V2 — Basic challenge → Newbie challenge → November race with Golden league',
              },
              {
                v: 'V3', title: 'Weekly XP, smarter copy, new audience',
                body: 'Added a Fri–Thu XP trend line and position change indicators. Students could now see their learning rhythm — "I dropped on Sunday, picked up Tuesday." Refined UI copy from task-focused ("Solve tasks to compete") to journey-focused ("Collect XP to see which league you join").',
                imgLabel: 'V3 — Race for league + Monthly Leaderboard with XP graph',
              },
            ].map((it, i) => (
              <div key={it.v} className="stagger-item">
                {it.v === 'V1' ? (
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
                    <div>
                      <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Iteration 1</p>
                      <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: 0 }}>{it.title}</p>
                    </div>
                    <div>
                      <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                        <img src="/cases/leaderboard-v1.png" alt="V1 Simple ranked list" style={{ width: '100%', display: 'block' }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
                    <div>
                      <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>{it.v === 'V2' ? 'Iteration 2' : 'Iteration 3'}</p>
                      <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: 0 }}>{it.title}</p>
                    </div>
                    {it.v === 'V2' ? (
                      <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                        <img src="/cases/leaderboard-v2.jpg" alt="V2 Small leagues" style={{ width: '100%', display: 'block' }} />
                      </div>
                    ) : it.v === 'V3' ? (
                      <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                        <img src="/cases/leaderboard-v3.jpg" alt="V3 Weekly XP rhythm" style={{ width: '100%', display: 'block' }} />
                      </div>
                    ) : (
                      <Placeholder aspect="4/3" label={`📷 ${it.imgLabel}`} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* leaderboard results */}
        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '+36%', label: 'DAU/MAU on weekends' },
              { n: '+15%', label: 'DAU/MAU on weekdays' },
            ].map(m => (
              <div key={m.n}>
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* leaderboard next steps */}
        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              'Add time-based competitions to maintain engagement and give new users regular opportunities to compete',
              'Improve leaderboard UI integration on the main page',
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

      {/* ── ACHIEVEMENTS ─────────────────────────────────────────────────── */}
      <section id="achievements" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Achievements to motivate students multiple times a day</H2>
        <Body style={{ marginBottom: 24, lineHeight: 1.4 }}>Designed achievements at two levels: simple ones for early actions to <strong style={{ color: INK, fontWeight: 500 }}>reduce activation friction</strong> and advanced ones that <strong style={{ color: INK, fontWeight: 500 }}>raise the bar worth chasing</strong>.</Body>

        <div className="reveal img-hover-wrap" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <img src="/cases/achievements-tiers.jpg" alt="Achievements tiers" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {[
              {
                v: 'V2', title: 'Modular badge system',
                body: "Unique illustrations don't scale. Built a framework: shared frame + category art + color families. New badge ships in under an hour.",
                imgLabel: 'V2 — Modular badge system',
              },
              {
                v: 'V1', title: 'Three audience layers',
                body: 'Leads get onboarding badges — achievements as a conversion funnel. Part-time students unlock behavior-driven badges. Full-time students add peer review and English milestones on top.',
                imgLabel: 'V1 — basic leaderboard with podium + rank list',
              },
            ].map((it, i) => (
              <div key={it.v} className="stagger-item">
                <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: 32, alignItems: 'start' }}>
                  <div className={it.v === 'V1' ? "img-hover-wrap" : undefined} style={{ borderRadius: 12, overflow: 'hidden' }}>
                    <img src={it.v === 'V2' ? '/cases/achievements-badges.jpg' : '/cases/achievements-audience.jpg'} alt="Achievements" style={{ width: '100%', display: 'block' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 4px' }}>{it.title}</p>
                    <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>{it.body}</p>
                  </div>
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
              { n: '46,000', raw: '46000', label: 'Awards opened\nmonthly' },
              { n: '400+', raw: '400', label: 'Daily active users interacting\nwith achievements' },
              { n: '+20%', raw: '+20%', label: 'Graded homework checks after introducing grade badges' },
            ].map((m) => (
              <div key={m.n} className="stagger-child">
                <p style={{ fontFamily: FD, fontSize: 40, fontWeight: 500, color: INK, margin: '0 0 6px', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.n}</p>
                <p style={{ fontFamily: FD, fontSize: 14, color: '#6B6B7A', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* next steps */}
        <div style={{ marginTop: 48 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 16px' }}>Next steps</p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            {[
              'Add achievement streaks — reward students who earn achievements consistently over multiple weeks',
              'Introduce team-based achievements to strengthen the social layer',
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

      {/* ── SOFT DEADLINES ───────────────────────────────────────────────── */}
      <section id="soft-deadlines" className="reveal" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 64 }}>
        <H2>Soft deadlines to give students structure without pressure</H2>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '40px 0 8px' }}>Discovery</p>
          <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}><strong style={{ color: INK, fontWeight: 500 }}>38% of students said they still need deadlines</strong>, even during wartime — and the real number is likely higher. Many wanted deadlines but feared feeling punished for missing them. Control had to be visible at every step.</p>
        </div>

        <div className="reveal" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
          <img src="/cases/deadlines-survey.jpg" alt="Survey results — pie charts" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* iterations */}
        <div style={{ marginBottom: 36, marginTop: 40 }}>
          <div className="stagger-group" style={{ display: 'flex', flexDirection: 'column' as const, gap: 56 }}>
            {/* V1 — vertical: tag + title + image */}
            <div className="stagger-item" style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div>
                <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
                <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 8px' }}>Activation</p>
                <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>&ldquo;Without deadlines&rdquo; stays selected by default to keep the self-paced promise. &ldquo;Soft deadlines&rdquo; is shown as an option, with clear benefits, but without pushing students toward it.</p>
              </div>
              <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                <img src="/cases/deadlines-iterations.jpg" alt="Design decisions" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>

            {/* V3 — vertical: tag + title + image */}
            <div className="stagger-item" style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div>
                <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Design decisions</p>
                <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 8px' }}>Selection</p>
                <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>A stepped slider helps students choose a realistic course duration by showing the required weekly effort in real time. This makes the deadline feel self-owned, not assigned.</p>
              </div>
              <div className="img-hover-wrap" style={{ borderRadius: 12, overflow: 'hidden' }}>
                <img src="/cases/deadlines-iteration2.jpg" alt="Design decisions" style={{ width: '100%', display: 'block', borderRadius: 12 }} />
              </div>
            </div>

            {/* V4 — vertical: tag + title + image */}
            <div className="stagger-item" style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div>
                <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 2px' }}>Iterations after user testing</p>
                <p style={{ fontFamily: FD, fontSize: 20, fontWeight: 500, color: INK, lineHeight: 1.3, margin: '0 0 8px' }}>Module breakdowns & pace tooltip</p>
                <p style={{ fontFamily: FD, fontSize: 15, color: BODY, lineHeight: 1.6, margin: 0 }}>After testing with 6 users, we replaced one distant course deadline with module-level countdowns and added a visible pace status, so students can understand what needs attention at a glance.</p>
              </div>
              <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                <img src="/cases/deadlines-iteration3.jpg" alt="Iteration" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>

        {/* results */}
        <div className="reveal" style={{ marginTop: 64 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div className="r-grid-3-to-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { n: '42%', raw: '42%', label: 'Of new students adopted\nsoft deadlines on launch' },
              { n: '+18%', raw: '+18%', label: 'Course completion rate\namong deadline users' },
              { n: '3×', raw: '3×', label: 'More likely to finish\nvs no-deadline students' },
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
              'Add smart deadline suggestions based on student pace and course length',
              'Send proactive nudges when students fall behind — before they disengage',
              'Allow deadline sharing with a mentor or study buddy for accountability',
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
        <H2>Gamification on the go</H2>
        <p style={{ fontFamily: FD, fontSize: 16, color: BODY, lineHeight: 1.75, margin: '4px 0 28px' }}>
          Brought the full gamification system to mobile — streaks, XP, leaderboard, and achievements adapted for touch. Progress is trackable on the go, and push notifications keep the streak alive between sessions.
        </p>

        <div style={{ borderRadius: 12, overflow: 'hidden' }}>
          <img src="/cases/mobile.jpg" alt="Gamification on mobile — leaderboard, streaks, achievements" style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: FD, fontSize: 14, fontWeight: 400, color: '#6B6B7A', margin: '0 0 12px' }}>Result</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { n: '17%', label: 'Notification open rate\nfrom mobile' },
              { n: '+7.37%', label: 'App usage after\ngamification' },
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
          Gamification works as an ecosystem — no single feature could achieve +36% alone
        </p>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px' }}>
          {[
            { title: 'Ship lean', body: 'MVPs consistently outperformed polished first versions. The perfect design is the one that gets tested.' },
            { title: 'Explain the why', body: "A streak isn't a counter — it's a consistency tool. Context drives adoption." },
            { title: 'Trust behavior over surveys', body: 'What users say and what they do rarely match. Watch the data weekly.' },
            { title: 'Gamification is an ecosystem', body: "+36% didn't come from one feature. It came from features that made each other stronger." },
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
