// Static mockup of the Mate Academy gamification dashboard

const T = {
  white:         '#FFFFFF',
  surfaceRaised: '#F9F7F5',
  inkPrimary:    '#0B0D11',
  inkSecondary:  '#6B7280',
  inkMuted:      '#9CA3AF',
  border:        '#E8E8E4',
  purple:        '#6B5FD4',
  purpleLight:   '#EAE8F8',
  fire:          '#F97316',
  gold:          '#F59E0B',
} as const;

const FONT = "'Geist', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', monospace";

const leaderRows = [
  { rank: 45, name: 'Andriy V.',   xp: '934 XP' },
  { rank: 46, name: 'Michael D.',  xp: '932 XP', up: true },
  { rank: 47, name: 'Kamil L.',    xp: '920 XP' },
  { rank: 48, name: 'Emily R.',    xp: '799 XP' },
  { rank: 49, name: 'Thomas J.',   xp: '721 XP' },
  { rank: 50, name: 'Nick S.',     xp: '642 XP' },
];

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const activeDay = [true, true, true, true, false, false, false];

// Tiny sparkline path for XP chart
const sparkPath = "M 0 48 C 15 48 18 20 35 22 C 52 24 58 42 75 38 C 92 34 100 8 118 14 C 136 20 148 36 165 28 C 182 20 190 8 210 12";

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      backgroundColor: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT, fontSize: 10, fontWeight: 500, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export default function GamificationMockup() {
  return (
    <div style={{
      display: 'flex',
      gap: 10,
      padding: '20px 20px 16px',
      fontFamily: FONT,
    }}>

      {/* ── LEFT: Leaderboard ─────────────────────────── */}
      <div style={{
        flex: '0 0 280px',
        backgroundColor: T.white,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: '14px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: T.inkPrimary }}>April leaderboard</span>
          <span style={{ fontSize: 10, color: T.inkMuted, fontFamily: FONT_MONO }}>13 days left</span>
        </div>

        {/* League row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🏆</span>
            <span style={{ fontSize: 16 }}>🥈</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            backgroundColor: '#FEF9EC', border: '1px solid #F59E0B',
            borderRadius: 9999, padding: '3px 10px',
            fontSize: 10, fontWeight: 500, color: '#B45309',
          }}>
            🏆 Golden league
          </div>
          <span style={{ fontSize: 14 }}>🔖</span>
        </div>

        {/* Top 3 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          {[
            { initials: 'KQ', color: '#9B8FC0', name: 'Kate Q.',  xp: '1230 XP' },
            { initials: 'AH', color: '#8AB4C0', name: 'Ann H.',   xp: '999 XP' },
            { initials: 'MK', color: '#C0A08A', name: 'Maria K.', xp: '973 XP' },
          ].map(p => (
            <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Avatar initials={p.initials} color={p.color} />
              <span style={{ fontSize: 9, color: T.inkPrimary, fontWeight: 500 }}>{p.name}</span>
              <span style={{ fontSize: 9, color: T.inkMuted, fontFamily: FONT_MONO }}>{p.xp}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: T.border }} />

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {leaderRows.map(r => (
            <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: T.inkMuted, width: 16, textAlign: 'right' }}>{r.rank}</span>
              <Avatar initials={r.name[0] + r.name.split(' ')[1][0]} color={`hsl(${r.rank * 37} 35% 65%)`} />
              <span style={{ fontSize: 11, color: T.inkPrimary, flex: 1 }}>{r.name}</span>
              {r.up && <span style={{ fontSize: 9, color: '#22C55E' }}>▲</span>}
              <span style={{ fontSize: 10, color: T.inkMuted, fontFamily: FONT_MONO }}>{r.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Streak + XP + Stats ─────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Streak card */}
        <div style={{ backgroundColor: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.inkPrimary }}>Current streak</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: T.fire }}>🔥 22</span>
          </div>
          {/* Days */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {days.map((d, i) => (
              <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, color: T.inkMuted }}>{d}</span>
                {activeDay[i]
                  ? <span style={{ fontSize: 14 }}>🔥</span>
                  : <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${T.border}` }} />
                }
              </div>
            ))}
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 12, borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
            {[
              { icon: '❄️', label: 'Frozen days', value: '1 day' },
              { icon: '🔥', label: 'Best streak', value: '73 days' },
              { icon: '⭐', label: 'Streak XP',   value: '+511 XP' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                <span style={{ fontSize: 12 }}>{s.icon}</span>
                <div>
                  <p style={{ fontSize: 9, color: T.inkMuted, margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: T.inkPrimary, margin: 0 }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* XP chart card */}
        <div style={{ backgroundColor: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.inkPrimary }}>April XP</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.purple }}>⬤ 932</span>
          </div>
          {/* Sparkline */}
          <div style={{ position: 'relative', height: 56 }}>
            <svg width="100%" height="56" viewBox="0 0 210 56" preserveAspectRatio="none">
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.purple} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={T.purple} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={sparkPath + " L 210 56 L 0 56 Z"} fill="url(#xpGrad)" />
              <path d={sparkPath} fill="none" stroke={T.purple} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            {['Mon', 'Wed', 'Fri', 'Sun'].map(d => (
              <span key={d} style={{ fontSize: 9, color: T.inkMuted, fontFamily: FONT_MONO }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Bottom stats row */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Certificates', value: '8',     extra: 'MA' },
            { label: 'Achievements', value: '12/48', extra: '🏅🥈🏆' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, backgroundColor: T.white,
              border: `1px solid ${T.border}`, borderRadius: 12,
              padding: '10px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontSize: 9, color: T.inkMuted, margin: '0 0 3px' }}>{s.label}</p>
                <p style={{ fontSize: 16, fontWeight: 500, color: T.inkPrimary, margin: 0, fontFamily: FONT_MONO }}>{s.value}</p>
              </div>
              <span style={{
                fontSize: s.label === 'Certificates' ? 11 : 14,
                ...(s.label === 'Certificates' ? {
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: T.purpleLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT, fontWeight: 500, color: T.purple,
                } : {}),
              }}>
                {s.extra}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
