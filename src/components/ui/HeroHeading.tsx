"use client";

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const INK = '#0B0D11';
const MUTED = '#B3B3B3';

const words: { text: string; color: string }[] = [
  { text: "I'm",           color: INK   },
  { text: "Anna",          color: INK   },
  { text: "Yarigina,",     color: MUTED },
  { text: "6+",            color: INK   },
  { text: "years",         color: INK   },
  { text: "designing",     color: MUTED },
  { text: "data-driven",   color: INK   },
  { text: "solutions",     color: INK   },
  { text: "for",           color: MUTED },
  { text: "desktop,",      color: MUTED },
  { text: "mobile,",       color: MUTED },
  { text: "and",           color: MUTED },
  { text: "web",           color: MUTED },
  { text: "products",      color: MUTED },
  { text: "across",        color: MUTED },
  { text: "AI,",           color: INK   },
  { text: "Ed-tech",       color: INK   },
  { text: "and",           color: INK   },
  { text: "Health",        color: INK   },
  { text: "&",             color: INK   },
  { text: "Fitness",       color: INK   },
];

export function HeroHeading() {
  return (
    <h1 style={{
      fontFamily: FONT_DISPLAY,
      fontSize: 44,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      fontWeight: 500,
      margin: '0 0 36px',
      maxWidth: 900,
    }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: word.color,
            display: 'inline-block',
            opacity: 0,
            animation: `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            animationDelay: `${0.25 + i * 0.04}s`,
            marginRight: '0.25em',
          }}
        >
          {word.text}
        </span>
      ))}
    </h1>
  );
}
