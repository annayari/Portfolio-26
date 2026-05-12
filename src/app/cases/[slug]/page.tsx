import { notFound } from "next/navigation";
import { cases, defaultNavSections, type Case } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Pagination } from "@/components/ui/Pagination";
import CaseSideNav from "@/components/CaseSideNav";
import { MateAcademyGamification } from "@/components/cases/MateAcademyGamification";
import { MateAcademySocial } from "@/components/cases/MateAcademySocial";
import { MateAcademyMentor } from "@/components/cases/MateAcademyMentor";
import { CasaVistaApp } from "@/components/cases/CasaVistaApp";

export function generateStaticParams() {
  return cases.map(c => ({ slug: c.slug }));
}

const T = {
  surfaceBase:    '#FDFDFF',
  surfaceRaised:  '#F9F7F5',
  surfaceOverlay: '#F2F2EE',
  surfaceSubtle:  '#E8E8E4',
  inkPrimary:     '#0B0D11',
  inkSecondary:   '#6B7280',
  inkMuted:       '#9CA3AF',
  border:         '#E4E4E0',
  yellow:         '#E8C840',
} as const;

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const FONT_BODY    = "'Geist', -apple-system, sans-serif";
const FONT_MONO    = "'Geist Mono', monospace";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 500, color: T.inkPrimary, margin: '0 0 20px' }}>
      {children}
    </h2>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.inkSecondary, lineHeight: 1.75, margin: 0, ...style }}>
      {children}
    </p>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: T.inkMuted }}>
      {children}
    </span>
  );
}

function BulletList({ items, color = T.inkSecondary }: { items: string[]; color?: string }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, fontFamily: FONT_BODY, fontSize: 14, color, lineHeight: 1.65 }}>
          <span style={{ color: T.inkMuted, flexShrink: 0, marginTop: 1 }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Placeholder({ aspect = '16/9', label }: { aspect?: string; label?: string }) {
  return (
    <div style={{ width: '100%', aspectRatio: aspect, borderRadius: 16, backgroundColor: T.surfaceOverlay, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {label && <Mono>{label}</Mono>}
    </div>
  );
}

// ─── Mate Academy gamification case renderer ──────────────────────────────────

function MateAcademyCase({ c }: { c: Case }) {
  return (
    <>
      {/* OVERVIEW */}
      <section id="overview">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cases', href: '/cases' }, { label: c.company }]} />
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Mono>{c.company}</Mono>
            {c.companyUrl && (
              <a href={c.companyUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, textDecoration: 'none' }}>
                ↗
              </a>
            )}
            {c.period && <Mono>{c.period}</Mono>}
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 500, color: T.inkPrimary, lineHeight: 1.2, margin: '0 0 20px' }}>
            {c.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {c.categories.map(cat => <Badge key={cat} variant="chip">{cat}</Badge>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {c.overview?.split('\n\n').map((para, i) => <Body key={i}>{para}</Body>)}
          </div>
          <div style={{ marginBottom: 32, backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 16, padding: '24px 28px' }}>
            <Mono>Key outcome</Mono>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 500, color: T.inkPrimary, margin: '8px 0 0', lineHeight: 1.35 }}>
              DAU/MAU increased by 36% on weekends and 15% on weekdays.
            </p>
          </div>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, backgroundColor: c.coverColor }} />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <SectionHeading>Problem</SectionHeading>
        <Body style={{ marginBottom: 28 }}>{c.problem}</Body>
        {c.problemPoints && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {c.problemPoints.map(pt => (
              <div key={pt.title} style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px' }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary, margin: '0 0 6px' }}>{pt.title}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.65, margin: 0 }}>{pt.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GOALS */}
      {c.goals && (
        <section id="goals">
          <SectionHeading>Goals</SectionHeading>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {c.goals.map((goal, i) => (
              <li key={i} style={{ display: 'flex', gap: 16, fontFamily: FONT_BODY, fontSize: 15, color: T.inkSecondary, lineHeight: 1.65 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted, flexShrink: 0, marginTop: 3, letterSpacing: '0.04em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {goal}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* SOLUTIONS */}
      {c.solutions?.map(sol => (
        <section key={sol.id} id={sol.id}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
            <Mono>Solution</Mono>
          </div>
          <SectionHeading>{sol.title}</SectionHeading>
          {sol.intro && <Body style={{ marginBottom: 28 }}>{sol.intro}</Body>}

          {/* Design process */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 12 }}>Design process</p>
            <BulletList items={sol.designProcess} />
          </div>

          <Placeholder label={`${sol.title} screens`} />

          {/* User stories */}
          {sol.userStories && (
            <div style={{ marginTop: 28, backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px' }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 12 }}>User stories</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sol.userStories.map((s, i) => (
                  <p key={i} style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>"{s}"</p>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div style={{ marginTop: 28 }}>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 12 }}>Result</p>
            <BulletList items={sol.results} color={T.inkPrimary} />
          </div>

          {/* Next steps */}
          {sol.nextSteps && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 12 }}>Next steps</p>
              <BulletList items={sol.nextSteps.map((s, i) => `${i + 1}. ${s}`)} />
            </div>
          )}
        </section>
      ))}

      {/* MOBILE */}
      {c.mobileSection && (
        <section id="mobile">
          <SectionHeading>Mobile app</SectionHeading>
          <Body style={{ marginBottom: 24 }}>
            All gamification features were adapted for mobile, enabling students to track progress and engage with the platform on the go.
          </Body>
          <div style={{ marginBottom: 28 }}>
            <BulletList items={c.mobileSection.bullets} />
          </div>
          <div className="r-grid-3-to-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ aspectRatio: '9/16', borderRadius: 16, backgroundColor: `hsl(${145 + i * 15} 30% ${40 + i * 5}%)` }} />
            ))}
          </div>
          <div>
            <p style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 12 }}>Result</p>
            <BulletList items={c.mobileSection.results} color={T.inkPrimary} />
          </div>
        </section>
      )}

      {/* COMBINED IMPACT */}
      {c.combinedMetrics && (
        <section id="impact">
          <SectionHeading>Combined impact</SectionHeading>
          <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {c.combinedMetrics.map((row, i) => (
              <div
                key={row.metric}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: i < c.combinedMetrics!.length - 1 ? `1px solid ${T.border}` : 'none',
                  backgroundColor: i % 2 === 0 ? T.surfaceBase : T.surfaceRaised,
                }}
              >
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary }}>{row.metric}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 500, color: T.inkPrimary, letterSpacing: '0.02em' }}>{row.change}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LEARNINGS */}
      <section id="learnings">
        <SectionHeading>Learnings</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          {c.learnings.map((l, i) => {
            const [headline, ...rest] = l.split('. ');
            return (
              <div key={i} style={{ paddingLeft: 20, borderLeft: `2px solid ${T.border}` }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: T.inkPrimary, margin: '0 0 4px' }}>
                  {headline}.
                </p>
                {rest.length > 0 && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.7, margin: 0 }}>
                    {rest.join('. ')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─── CasaVista case renderer ─────────────────────────────────────────────────

function CasaVistaCase({ c }: { c: Case }) {
  return (
    <>
      {/* OVERVIEW */}
      <section id="overview">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cases', href: '/cases' }, { label: c.company }]} />
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Mono>{c.company}</Mono>
            {c.period && <Mono>{c.period}</Mono>}
            <Mono>iOS · B2C · AI · Sole designer</Mono>
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 500, color: T.inkPrimary, lineHeight: 1.2, margin: '0 0 20px' }}>
            {c.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {c.categories.map(cat => <Badge key={cat} variant="chip">{cat}</Badge>)}
          </div>
          <Body style={{ marginBottom: 32, maxWidth: 600 }}>{c.overview}</Body>
          <Placeholder label="Hero — app screenshots" />
        </div>
      </section>

      {/* RESULTS OVERVIEW */}
      <section id="results">
        <SectionHeading>Results</SectionHeading>
        <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
          {c.results.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 20px',
                borderBottom: i < c.results.length - 1 ? `1px solid ${T.border}` : 'none',
                backgroundColor: i % 2 === 0 ? T.surfaceBase : T.surfaceRaised,
              }}
            >
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary }}>{row.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted }}>{row.before} → {row.after}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 500, color: T.inkPrimary, letterSpacing: '0.02em', minWidth: 60, textAlign: 'right' }}>{row.improvement}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge">
        <SectionHeading>The challenge</SectionHeading>
        <Body style={{ marginBottom: 24 }}>{c.problem}</Body>
        {c.problemPoints && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {c.problemPoints.map(pt => (
              <div key={pt.title} style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px' }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary, margin: '0 0 6px' }}>{pt.title}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.65, margin: 0 }}>{pt.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ONBOARDING */}
      <section id="onboarding">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
          <Mono>Feature 01</Mono>
        </div>
        <SectionHeading>Onboarding — from empty screen to 18-second activation</SectionHeading>
        <Body style={{ marginBottom: 20 }}>
          Designed and tested five onboarding concepts. The winning direction: pre-load a curated
          sample room as the hero, reduce the entry to a single CTA, and let the AI result speak
          before asking for anything.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          Tested 10+ headline and CTA combinations. &ldquo;See Your Dream Home in Seconds&rdquo; +
          &ldquo;Redesign This Room&rdquo; outperformed every alternative — outcome-first copy with
          a verb specific to what&apos;s on screen.
        </Body>
        <div style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <Mono>A/B test · 10,000 users · 14 days</Mono>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <BulletList items={[
              "Activation 33% → 51%",
              "Time to first generation 4.5 min → 1.2 min",
              "D1 retention +33%",
            ]} color={T.inkPrimary} />
          </div>
        </div>
        <Placeholder label="5 onboarding concepts · final UI · loading sequence" aspect="16/7" />
      </section>

      {/* PAYWALL */}
      <section id="paywall">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
          <Mono>Feature 02</Mono>
        </div>
        <SectionHeading>Paywall — right message, right moment</SectionHeading>
        <Body style={{ marginBottom: 20 }}>
          Designed the monetization system from scratch: timing logic, layout, copy, and pricing presentation.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          The core insight from behavioral data: users who generated 3+ designs converted at 8.2% vs 1.8%
          after one. I built a smart trigger — paywall fires after the third generation or a high-intent
          signal (saved design, attempted premium feature), not on a fixed count.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          Tested six headline approaches. ROI framing won: &ldquo;Save $2,000+ on Design Mistakes&rdquo;
          at 6.2% vs &ldquo;Unlock Premium Features&rdquo; at 3.2%. Home design is a financial decision
          — loss aversion outperforms aspiration.
        </Body>
        <div style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <Mono>A/B test · 15,000 users · 21 days</Mono>
          <div style={{ marginTop: 12 }}>
            <BulletList items={[
              "Trial-to-paid 22% → 44%",
              "Paywall CR +94%",
              "30-day LTV +86%",
              "Annual plan selection 23% → 52%",
            ]} color={T.inkPrimary} />
          </div>
        </div>
        <Placeholder label="Before / after: feature-list paywall vs ROI value card" />
      </section>

      {/* EDITING TOOLS */}
      <section id="editing">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
          <Mono>Feature 03</Mono>
        </div>
        <SectionHeading>Editing tools — surfacing hidden value</SectionHeading>
        <Body style={{ marginBottom: 20 }}>
          Designed Change Flooring, Paint Walls, Remove Objects, and Style Transfer as a unified
          editing layer on top of the core AI flow.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          The discovery problem: only 8% of users found the tools, buried in a secondary menu.
          Users who found and used any tool converted to paid at 2.3× the baseline rate. I moved
          tools to a persistent labeled action bar below every result.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          Renamed all tools from mode-labels to action verbs: &ldquo;Floor mode&rdquo; →
          &ldquo;Change flooring.&rdquo; Usage +143%. Designed context-specific upsell triggers
          fired when a user attempted a locked feature — &ldquo;Export in 4K — perfect for printing
          and contractor presentations. +$4.99/mo&rdquo; converted at 8.3% vs 2.1% for a generic
          upgrade prompt.
        </Body>
        <div style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <BulletList items={[
            "Tool discovery 8% → 41%",
            "Tool users converted at 2.3× baseline",
            "Upsell CR 8.3% vs 2.1% generic",
          ]} color={T.inkPrimary} />
        </div>
        <Placeholder label="Before / after: 'More' menu vs labeled action bar" />
      </section>

      {/* ACQUISITION */}
      <section id="acquisition">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
          <Mono>Feature 04</Mono>
        </div>
        <SectionHeading>Acquisition — ASO and web-to-app</SectionHeading>
        <Body style={{ marginBottom: 20 }}>
          Designed the App Store presence and web landing page as the top of the funnel.
          Reordered screenshots to lead with the dramatic before/after result rather than UI screens.
          Rewrote the title and first visible description lines around search keywords and outcome-first framing.
        </Body>
        <Body style={{ marginBottom: 20 }}>
          Built and tested four web-to-app landing page concepts. The winner: let visitors generate
          one result on web, then hard-gate to the app. One taste plus friction produces more installs
          — and higher-intent users — than a full demo with no gate.
        </Body>
        <div style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <BulletList items={[
            "ASO: 'AI interior design' #47 → #8",
            "Organic installs +180%",
            "Web-to-app install CR 8.2% → 14.8% (+80%)",
          ]} color={T.inkPrimary} />
        </div>
        <Placeholder label="App Store screenshots · web landing page" aspect="16/7" />
      </section>

      {/* LEARNINGS */}
      <section id="learnings">
        <SectionHeading>Learnings</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          {c.learnings.map((l, i) => {
            const [headline, ...rest] = l.split('. ');
            return (
              <div key={i} style={{ paddingLeft: 20, borderLeft: `2px solid ${T.border}` }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: T.inkPrimary, margin: '0 0 4px' }}>
                  {headline}.
                </p>
                {rest.length > 0 && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.7, margin: 0 }}>
                    {rest.join('. ')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: '20px 24px' }}>
          <Mono>How I worked</Mono>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.7, margin: '10px 0 0' }}>
            Sole designer for 18 months. No design handoffs — full ownership from research to shipped UI.
            Ran 15+ A/B experiments with the PM, defined the research agenda, wrote copy alongside UI,
            and collaborated daily with engineers on implementation.
          </p>
        </div>
      </section>
    </>
  );
}

// ─── Standard case renderer ────────────────────────────────────────────────────

function StandardCase({ c }: { c: Case }) {
  return (
    <>
      <section id="overview">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cases', href: '/cases' }, { label: c.company }]} />
        <div style={{ marginTop: 24, marginBottom: 16 }}>
          <Mono>{c.company}</Mono>
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 500, color: T.inkPrimary, lineHeight: 1.2, margin: '0 0 20px' }}>
          {c.title}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {c.categories.map(cat => <Badge key={cat} variant="chip">{cat}</Badge>)}
        </div>
        <Body style={{ marginBottom: 32, maxWidth: 600 }}>{c.summary}</Body>
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, backgroundColor: c.coverColor }} />
      </section>

      <section id="problem">
        <SectionHeading>Problem</SectionHeading>
        <Body style={{ marginBottom: 24 }}>{c.problem}</Body>
        <div className="r-grid-3-to-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {['High drop-off', 'User frustration', 'Lost revenue'].map(label => (
            <div key={label} style={{ backgroundColor: T.surfaceRaised, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 12, color: T.inkMuted, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="research">
        <SectionHeading>Research</SectionHeading>
        <Body style={{ marginBottom: 24 }}>{c.research}</Body>
        <Placeholder label="Research artifacts" aspect="16/7" />
      </section>

      <section id="iterations">
        <SectionHeading>Iterations</SectionHeading>
        <Body style={{ marginBottom: 24 }}>
          Each iteration focused on one key friction point from research. I ran lightweight usability tests between rounds to validate direction before investing in high-fidelity work.
        </Body>
        <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {(['Before', 'After'] as const).map(label => (
            <div key={label}>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 12, backgroundColor: label === 'Before' ? '#E4DDD6' : c.coverColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Mono>{label}</Mono>
              </div>
              <Body style={{ fontSize: 12 }}>{label} redesign</Body>
            </div>
          ))}
        </div>
      </section>

      <section id="explorations">
        <SectionHeading>Explorations</SectionHeading>
        <Body style={{ marginBottom: 24 }}>Visual directions explored before converging on the final design language.</Body>
        <div className="r-grid-3-to-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[1, 2, 3].map(i => (
            <div key={i}>
              <div style={{ width: '100%', aspectRatio: '1', borderRadius: 12, backgroundColor: `hsl(${i * 40 + 200} 20% 85%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Mono>V{i}</Mono>
              </div>
              <Body style={{ fontSize: 12 }}>Direction {i}</Body>
            </div>
          ))}
        </div>
      </section>

      <section id="prototypes">
        <SectionHeading>Prototypes</SectionHeading>
        <Body style={{ marginBottom: 24 }}>High-fidelity prototypes used in moderated usability sessions with 8 participants.</Body>
        <Placeholder label="Prototype screens" />
      </section>

      <section id="experiments">
        <SectionHeading>Search &amp; experiments</SectionHeading>
        <Body style={{ marginBottom: 24 }}>A/B tested two variants of the onboarding flow. Variant B outperformed Variant A by 23% on completion rate after a 2-week run.</Body>
        <Placeholder label="Experiment results chart" aspect="16/7" />
      </section>

      <section id="results">
        <SectionHeading>Results + metrics</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {c.results.map((r, i) => (
            <div key={r.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: T.inkPrimary }}>{r.label}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted }}>{r.before} → {r.after}</span>
              </div>
              <ProgressBar value={r.improvement.startsWith('+') ? 80 - i * 10 : 45} accent={i === 0} />
              <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkSecondary, marginTop: 6, letterSpacing: '0.04em' }}>{r.improvement}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="learnings">
        <SectionHeading>Learnings</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          {c.learnings.map((l, i) => (
            <p key={i} style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.inkPrimary, lineHeight: 1.7, margin: 0 }}>
              <span style={{ fontWeight: 500 }}>{i + 1}. </span>{l}
            </p>
          ))}
        </div>
        <Body style={{ paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
          This project reinforced that the best design decisions come from the intersection of user empathy and measurable outcomes — not one or the other.
        </Body>
      </section>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = cases.findIndex(c => c.slug === slug);
  if (idx === -1) notFound();

  const c = cases[idx];
  const prev = cases[idx - 1] ? { href: `/cases/${cases[idx - 1].slug}`, title: cases[idx - 1].company } : undefined;
  const next = cases[idx + 1] ? { href: `/cases/${cases[idx + 1].slug}`, title: cases[idx + 1].company } : undefined;
  const navSections = c.navSections ?? defaultNavSections;

  return (
    <div className="r-case-outer" style={{ maxWidth: 960, margin: '0 auto', padding: '24px 24px 64px 187px' }}>
      <CaseSideNav sections={navSections} />

      <div style={{ display: 'flex' }}>

        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', width: 0, display: 'flex', flexDirection: 'column', gap: 80 }}>
          {c.slug === 'mate-academy' ? <MateAcademyGamification /> : c.slug === 'mate-academy-social' ? <MateAcademySocial /> : c.slug === 'mate-academy-mentor' ? <MateAcademyMentor /> : c.slug === 'casavista-app' ? <CasaVistaApp /> : c.solutions ? <MateAcademyCase c={c} /> : <StandardCase c={c} />}
          {!['mate-academy', 'mate-academy-social', 'mate-academy-mentor', 'casavista-app'].includes(c.slug) && <Pagination prev={prev} next={next} />}
        </div>

      </div>
    </div>

  );
}
