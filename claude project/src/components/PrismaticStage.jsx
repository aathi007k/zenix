import { useEffect, useMemo, useRef, useState } from 'react';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * PrismaticStage
 * A unique 3D parallax backdrop that reacts to pointer + scroll.
 * Designed to sit behind a hero section (position: absolute; inset: 0).
 */
export default function PrismaticStage({
  className = '',
  intensity = 1,
  spotlight = true,
  grid = true,
}) {
  const rootRef = useRef(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0, s: 0 });
  const currentRef = useRef({ x: 0, y: 0, s: 0 });
  const [canAnimate, setCanAnimate] = useState(true);

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    setCanAnimate(!reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !canAnimate) return;

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      targetRef.current.x = clamp((px - 0.5) * 2, -1, 1);
      targetRef.current.y = clamp((py - 0.5) * 2, -1, 1);
    };

    const onPointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = 1 - clamp((rect.top + rect.height * 0.2) / (viewH + rect.height), 0, 1);
      targetRef.current.s = progress;
    };

    const tick = () => {
      const c = currentRef.current;
      const t = targetRef.current;
      const k = 0.08;
      c.x += (t.x - c.x) * k;
      c.y += (t.y - c.y) * k;
      c.s += (t.s - c.s) * 0.06;

      el.style.setProperty('--px', String(c.x));
      el.style.setProperty('--py', String(c.y));
      el.style.setProperty('--sp', String(c.s));

      rafRef.current = window.requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [canAnimate]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`prismatic-stage ${className}`}
      style={{
        '--intensity': String(intensity),
      }}
      data-spotlight={spotlight ? 'on' : 'off'}
      data-grid={grid ? 'on' : 'off'}
    >
      <div className="prismatic-layer prismatic-layer--base" />
      <div className="prismatic-layer prismatic-layer--grid" />
      <div className="prismatic-layer prismatic-layer--prism" />
      <div className="prismatic-layer prismatic-layer--grain" />
    </div>
  );
}

