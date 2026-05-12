"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

export function BackButton() {
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      style={{
        position: "fixed",
        top: 20,
        left: 24,
        zIndex: 50,
        width: 38,
        height: 38,
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: scrolled ? "rgba(255,255,255,0.80)" : "#FFFFFF",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        border: `1px solid ${scrolled ? "rgba(228,228,224,0.6)" : "#E5E5E5"}`,
        boxShadow: scrolled
          ? "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      <ArrowLeft size={16} color="#0B0D11" />
    </button>
  );
}
