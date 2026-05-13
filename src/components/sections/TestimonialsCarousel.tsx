"use client";
import React, { useState, useEffect } from "react";
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
      <div style={{ marginBottom: 12 }} />

      {/* Quote */}
      <p style={{
        fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500, color: "rgba(11,13,17,0.8)",
        lineHeight: 1.35, margin: "20px 0 20px",
      }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 400, color: "#AAAAAA", lineHeight: 1.55, letterSpacing: '-0.01em', margin: "3px 0 0" }}>
            {t.role}
          </p>
        </div>
      </div>

      {/* Arrow buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={prev} aria-label="Previous" className="testimonial-arrow">
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <button onClick={next} aria-label="Next" className="testimonial-arrow">
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

    </div>
  );
}
