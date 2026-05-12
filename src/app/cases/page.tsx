import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

const T = {
  inkPrimary:   '#0B0D11',
  inkSecondary: '#6B7280',
  inkMuted:     '#9CA3AF',
  border:       '#E4E4E0',
} as const;

const FONT_DISPLAY = "'Geist', -apple-system, sans-serif";
const FONT_BODY    = "'Geist', -apple-system, sans-serif";
const FONT_MONO    = "'Geist Mono', monospace";

export default function CasesPage() {
  return (
    <div className="r-page-wrap" style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
      <h1 className="r-hero-title" style={{ fontFamily: FONT_DISPLAY, fontSize: 40, fontWeight: 500, color: T.inkPrimary, marginBottom: 64 }}>
        Cases
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {cases.map(c => (
          <Link key={c.slug} href={`/cases/${c.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/7', backgroundColor: c.coverColor, marginBottom: 24 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: 1, maxWidth: 600 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  {c.categories.map(cat => <Badge key={cat} variant="chip">{cat}</Badge>)}
                </div>
                <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 500, color: T.inkPrimary, lineHeight: 1.3, margin: '0 0 12px' }}>
                  {c.title}
                </h2>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.inkSecondary, lineHeight: 1.65, margin: 0 }}>
                  {c.summary}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingTop: 4 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkMuted }}>{c.year}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkPrimary, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Open <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
