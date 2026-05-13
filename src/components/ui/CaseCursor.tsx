'use client';
import { useEffect, useRef } from 'react';
import { Eye, Clock, GraduationCap } from 'lucide-react';

export function CaseCursor() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const iconEyeRef    = useRef<HTMLSpanElement>(null);
  const iconWipRef    = useRef<HTMLSpanElement>(null);
  const iconCourseRef = useRef<HTMLSpanElement>(null);
  const inZone     = useRef(false);
  const isWipZone  = useRef(false);
  const entered    = useRef(false);
  const target     = useRef({ x: -300, y: -300 });
  const current    = useRef({ x: -300, y: -300 });
  const rafId      = useRef<number>(0);

  useEffect(() => {
    const wrap    = wrapRef.current;
    const content = contentRef.current;
    const text       = textRef.current;
    const iconEye    = iconEyeRef.current;
    const iconWip    = iconWipRef.current;
    const iconCourse = iconCourseRef.current;
    if (!wrap || !content || !text || !iconEye || !iconWip || !iconCourse) return;

    type ZoneType = 'view' | 'wip' | 'course';

    const updateLabel = (type: ZoneType) => {
      const prev = isWipZone.current ? 'wip' : (iconCourse.style.display === 'flex' ? 'course' : 'view');
      if (type === prev) return;
      isWipZone.current         = type === 'wip';
      text.textContent          = type === 'wip' ? 'Currently building' : type === 'course' ? 'View course' : 'View case study';
      iconEye.style.display    = type === 'view'   ? 'flex' : 'none';
      iconWip.style.display    = type === 'wip'    ? 'flex' : 'none';
      iconCourse.style.display = type === 'course' ? 'flex' : 'none';
      wrap.style.backgroundColor = type === 'wip' ? '#FFFFFF' : '#D8D2FF';
    };

    const setZone = (nowInZone: boolean, isWip: boolean, isCourse: boolean) => {
      if (nowInZone !== inZone.current) {
        inZone.current = nowInZone;
        if (nowInZone) {
          wrap.style.backgroundColor = isWip ? '#FFFFFF' : '#D8D2FF';
          wrap.style.maxWidth     = '230px';
          wrap.style.height       = '38px';
          wrap.style.padding      = '10px 20px 10px 14px';
          content.style.opacity   = '1';
          content.style.transform = 'scale(1)';
        } else {
          wrap.style.backgroundColor = '#D8D2FF';
          wrap.style.maxWidth        = '18px';
          wrap.style.height          = '18px';
          wrap.style.padding         = '0';
          content.style.opacity      = '0';
          content.style.transform    = 'scale(0.7)';
        }
      }
      if (nowInZone) updateLabel(isWip ? 'wip' : isCourse ? 'course' : 'view');
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!entered.current) { entered.current = true; wrap.style.opacity = '1'; }
      const el   = document.elementFromPoint(e.clientX, e.clientY);
      const zone = el?.closest('.case-hover-zone') as HTMLElement | null;
      setZone(!!zone, zone?.dataset.cursor === 'wip', zone?.dataset.cursor === 'course');
    };

    const onLeave = () => { wrap.style.opacity = '0'; entered.current = false; };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      wrap.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        pointerEvents: 'none', willChange: 'transform', opacity: 0,
        maxWidth: 18, height: 18, borderRadius: 9999, overflow: 'hidden',
        backgroundColor: '#D8D2FF',
        display: 'flex', alignItems: 'center', padding: 0,
        transition: 'max-width 0.4s cubic-bezier(0.34,1.2,0.64,1), height 0.4s cubic-bezier(0.34,1.2,0.64,1), padding 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.2s ease',
      }}
    >
      <div
        ref={contentRef}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          opacity: 0, transform: 'scale(0.7)',
          transition: 'opacity 0.22s ease 0.08s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1) 0.08s',
          whiteSpace: 'nowrap',
          fontFamily: "'Geist', -apple-system, sans-serif",
          fontSize: 14, fontWeight: 500, color: '#0B0D11',
        }}
      >
        <span ref={iconEyeRef} style={{ display: 'flex' }}><Eye size={15} strokeWidth={2} /></span>
        <span ref={iconWipRef} style={{ display: 'none' }}><Clock size={15} strokeWidth={2} /></span>
        <span ref={iconCourseRef} style={{ display: 'none' }}><GraduationCap size={15} strokeWidth={2} /></span>
        <span ref={textRef}>View case study</span>
      </div>
    </div>
  );
}
