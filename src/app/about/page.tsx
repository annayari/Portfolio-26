"use client";
import { useState, useEffect, useRef } from 'react';

const F = "'Geist', -apple-system, sans-serif";
const M = "'Geist Mono', monospace";

const T = {
  pageBg:       '#FFFFFF',
  cardBg:       '#F7F7F9',
  inkPrimary:   '#1A1A1A',
  inkSecondary: '#4A4A4A',
  inkMuted:     '#9A9A9A',
  divider:      '#E8E7E2',
  border:       '#E4E4E0',
} as const;

/* ── Bio sections ── */
type Company = { name: string; href: string };
type Section = { label: string; text: string; companies?: Company[] };

const sections: Section[] = [
  {
    label: 'Intro',
    text: "My name is Anna, and I'm from Ukraine 🇺🇦 I'm originally from Melitopol, a city in the south of Ukraine.",
  },
  {
    label: 'How it started',
    text: "I've always loved creating things — drawing, crafting, and making something from scratch 🎨 That joy of building something new has stayed with me.",
  },
  {
    label: 'The turning point',
    text: "I studied sociology, and once we had to turn data into an infographic. My professor said mine was the best in class. That small comment changed my direction.",
  },
  {
    label: 'Finding my path',
    text: "I started learning graphic design, then worked on my first websites. That's when I realized I loved digital design more than print. It felt more alive. From there, I moved into web and product design.",
  },
  {
    label: 'What I do now',
    text: "Today, I work as a Product Designer, creating things that help people. What motivates me most is knowing that my work can make someone's experience a little better.",
  },
  {
    label: 'Beyond the work',
    text: "I also mentor junior designers because I enjoy helping people grow. Teaching helps me keep learning too. Sometimes I take on side projects for friends when the idea feels exciting.",
  },
  {
    label: 'Away from screens',
    text: "Outside of work, I love traveling, especially near water 🌊 My first trip to Asia changed how I see the world. I also practice yoga, cook, drink natural wine, and believe the best ideas often happen over long dinners with good people ✨",
  },
];

/* ── Books ── */
const books = [
  { title: 'The Body Keeps the Score',        author: 'Bessel van der Kolk', color: '#5B8FBF', src: '/book-body-score.jpg', href: 'https://literal.club/book/the-body-keeps-the-score-1k9b0' },
  { title: 'Normal People',                   author: 'Sally Rooney',    color: '#8FA832', src: '/book-normal-people.jpg', href: 'https://literal.club/book/normal-people-3hz01' },
  { title: 'Made to Stick',                    author: 'Chip Heath & Dan Heath', color: '#C8922A', src: '/book-made-to-stick.jpg', href: 'https://literal.club/book/made-to-stick-e54n1' },
];

/* ── Gallery ── */
const gallerySlots = [
  { color: '#C0B8B0', src: '/about-photo-main.jpg' }, // portrait
  { color: '#C8B89A', src: '/about-photo-5.jpg' },    // sunset beach girls
  { color: '#C8B89A', src: '/about-photo-7.jpg' },    // elephants Thailand
  { color: '#B8B0A8', src: '/about-photo-meet2.png' },// laptop Meet (new)
  { color: '#A8B09A', src: '/about-photo-6.jpg' },    // cooking / wine
  { color: '#A8B8C0', src: '/about-photo-1.jpg' },    // waterfall
  { color: '#D4C8B8', src: '/about-photo-painting.jpg' }, // painting studio
  { color: '#C8C4B8', src: '/about-photo-museum.jpg' },   // Monet museum
];

/* ── Contacts ── */
const contacts = [
  { label: 'Email',     href: 'mailto:annayarigina7@gmail.com' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/anna-yarigina-4a69a31a1/' },
  { label: 'Twitter',   href: '#' },
  { label: 'Instagram', href: '#' },
];

/* ── Gallery component ── */
function Gallery() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timer.current = setInterval(() => setActive(i => (i + 1) % gallerySlots.length), 2000);
  };
  useEffect(() => { start(); return () => { if (timer.current) clearInterval(timer.current); }; }, []);

  const go = (i: number) => {
    setActive(i);
    if (timer.current) clearInterval(timer.current);
    start();
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Stacked slides — cross-fade like iPhone Photos */}
      {gallerySlots.map((slot, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundColor: slot.color,
          opacity: i === active ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: i === active ? 1 : 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {slot.src && (
            <img src={slot.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%', display: 'block' }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Card shell ── */
function Card({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{
      backgroundColor: T.cardBg,
      borderRadius: 20,
      padding: 24,
      border: `1px solid ${T.divider}`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── App icon badge ── */
function AppIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10, overflow: 'hidden',
      flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: T.pageBg, minHeight: '100vh' }}>
      <div className="about-page-wrap" style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 24px 80px' }}>

        <style>{`
          @media (min-width: 641px) {
            .about-bio     { grid-column: 1; grid-row: 1 / span 3; }
            .about-photo   { grid-column: 2; grid-row: 1; }
            .about-spotify { grid-column: 2; grid-row: 2; }
            .about-books   { grid-column: 2; grid-row: 3; }
          }
          @media (max-width: 640px) {
            .about-page-wrap { padding-top: 16px !important; }
            .about-photo   { order: 1; aspect-ratio: 4/3 !important; }
            .about-bio     { order: 2; }
            .about-spotify { order: 3; }
          }
        `}</style>

        <div className="r-grid-asym" style={{ display: 'grid', gridTemplateColumns: '500px 360px', columnGap: 12, rowGap: 12, alignItems: 'start' }}>

          {/* ── Left column wrapper (bio + books) ── */}
          <div className="about-bio" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            <Card>
              <h1 style={{ fontFamily: F, fontSize: 38, fontWeight: 700, color: T.inkPrimary, margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                What I&apos;m about.
              </h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sections.map((s, i) => (
                  <p key={i} style={{ fontFamily: F, fontSize: 16, lineHeight: 1.6, color: T.inkSecondary, margin: 0 }}>
                    {s.text}
                  </p>
                ))}
              </div>
            </Card>

            {/* Currently reading — separate card */}
            <Card>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 500, color: T.inkMuted, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
                Currently reading
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {books.map(book => {
                  const cover = (
                    <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: 10, backgroundColor: book.color, overflow: 'hidden' }}>
                      {book.src && <img src={book.src} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />}
                    </div>
                  );
                  return (
                    <div key={book.title}>
                      {book.href ? (
                        <a href={book.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', cursor: 'none' }}>
                          {cover}
                        </a>
                      ) : cover}
                    </div>
                  );
                })}
              </div>
            </Card>

          </div>

          {/* ── Photo gallery ── */}
          <div className="about-photo" style={{
            aspectRatio: '1/1',
            borderRadius: 20, overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${T.divider}`,
          }}>
            <Gallery />
          </div>

          {/* ── Spotify ── */}
          <div className="about-spotify" style={{
            borderRadius: 20, overflow: 'hidden',
            backgroundColor: '#121212',
            border: `1px solid ${T.divider}`,
          }}>
            <iframe
              style={{ display: 'block', border: 'none', width: '100%', height: 448 }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1EIWqSrfwW8NAh?utm_source=generator&theme=0"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
