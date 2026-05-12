"use client";
import { useEffect, useRef, useState } from "react";

export function ScaleOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          // Reset only when element is below viewport (user scrolled back up)
          if (entry.boundingClientRect.top > 0) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: visible ? "scale(1)" : "scale(0.85)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        transformOrigin: "center center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
