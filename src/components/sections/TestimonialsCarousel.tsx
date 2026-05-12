"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

const FONT_MONO = "'Geist Mono', monospace";
const FONT_BODY = "'Geist', -apple-system, sans-serif";

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  const tWithImage = t as typeof t & { image?: string; initials: string };

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  return (
    <div>
      {/* Divider */}
      <div style={{ borderTop: "1px solid #E5E5E5", marginBottom: 28 }} />

      {/* Quote */}
      <p style={{
        fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500, color: "#111111",
        lineHeight: 1.55, margin: "0 0 20px",
      }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {tWithImage.image ? (
          <img
            src={tWithImage.image}
            alt={t.name}
            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            backgroundColor: "#F2F2EE",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: FONT_MONO, fontSize: 11, fontWeight: 500, color: "#999",
          }}>
            {getInitials(t.name)}
          </div>
        )}
        <div>
          <p style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 400, color: "#111111", margin: 0 }}>
            {t.name}
          </p>
          <p style={{ fontFamily: FONT_MONO, fontSize: 13, color: "#999999", margin: "3px 0 0" }}>
            {t.role}
          </p>
        </div>
      </div>

      {/* Arrow navigation */}
      <div style={{ display: "flex", gap: 8 }}>
        {[{ Icon: ChevronLeft, onClick: prev, aria: "Previous" }, { Icon: ChevronRight, onClick: next, aria: "Next" }].map(btn => (
          <button
            key={btn.aria}
            onClick={btn.onClick}
            aria-label={btn.aria}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "none", backgroundColor: "#F5F5F5",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#0B0D11",
            }}
          ><btn.Icon size={18} strokeWidth={1.5} /></button>
        ))}
      </div>
    </div>
  );
}
