import React from "react";

const T = {
  inkPrimary: '#0B0D11',
  textMuted:  '#6B6B7A',
  cardBg:     '#F7F7F9',
  cardBorder: '#EEEEF0',
} as const;

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const FONT_BODY    = "'Geist', -apple-system, sans-serif";

const Icon1 = () => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 40, flexShrink: 0 }}>
    <img src="/icon-vibe-coding.svg" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
  </span>
);
const Icon2 = () => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 40, flexShrink: 0 }}>
    <img src="/icon-ux-writing.svg" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
  </span>
);
const Icon3 = () => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, flexShrink: 0 }}>
    <img src="/icon-midjourney.svg" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
  </span>
);
const Icon4 = () => (
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, flexShrink: 0 }}>
    <img src="/icon-design-systems.svg" alt="" style={{ height: 40, width: 'auto', display: 'block' }} />
  </span>
);

const items = [
  {
    Icon: Icon1,
    title: "Vibe-coding and prototyping",
    description: "I leverage AI to quickly build prototypes and validate ideas, turning concepts into working products without the need for extensive engineering.",
  },
  {
    Icon: Icon2,
    title: "UX writing, structuring and analyzing",
    description: "I use AI tools like Claude Chat/ChatGPT to generate diagrams in FigJam, analyze design files, challenge my thinking, and draft UX copy and microcopy faster.",
  },
  {
    Icon: Icon3,
    title: "Visual exploration with Midjourney",
    description: "I use Midjourney to generate concepts, visual directions, background imagery, and custom assets for early-stage exploration and storytelling.",
  },
  {
    Icon: Icon4,
    title: "Design systems support",
    description: "I use AI to speed up the creation of design tokens, variables, and structured system logic — especially when organizing scalable design foundations.",
  },
];

export function HowIUseAI() {
  return (
    <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'flex-start' }}>

      {/* Left — heading */}
      <div>
        <h2 className="r-page-h2" style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 'clamp(24px, 2.55vw, 44px)',
          fontWeight: 500,
          color: T.inkPrimary,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          How I use AI<br />in product design
        </h2>
      </div>

      {/* Right — cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(({ Icon, title, description }) => (
          <div
            key={title}
            style={{
              backgroundColor: T.cardBg,
              border: `1px solid ${T.cardBorder}`,
              borderRadius: 14,
              padding: '18px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Icon />
              <p style={{
                fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500,
                color: T.inkPrimary, margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em',
              }}>
                {title}
              </p>
            </div>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400,
              color: T.textMuted, lineHeight: 1.55, letterSpacing: '-0.01em', margin: 0,
            }}>
              {description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
