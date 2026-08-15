import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

const getContainingBlock = (el: HTMLElement | null): HTMLElement | null => {
  let node = el?.parentElement;
  while (node && node !== document.documentElement) {
    const s = getComputedStyle(node);
    if (s.transform !== "none" || s.perspective !== "none" || s.filter !== "none" ||
      s.willChange.includes("transform") || s.willChange.includes("perspective") ||
      /paint|layout|strict|content/.test(s.contain)) return node;
    node = node.parentElement;
  }
  return null;
};

const getBlockOffset = (b: HTMLElement | null) => {
  if (!b) return { x: 0, y: 0 };
  const r = b.getBoundingClientRect();
  return { x: r.left + b.clientLeft, y: r.top + b.clientTop };
};

const TargetCursor = ({
  targetSelector = "a, button, .cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#ffffff",
  cursorColorOnTarget,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[] | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLElement | null>(null);
  const isActive = useRef(false);
  const positions = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFn = useRef<(() => void) | null>(null);
  const strength = useRef({ v: 0 });

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const small = window.innerWidth <= 768;
    const ua = (navigator.userAgent || "").toLowerCase();
    return (touch && small) || /android|webos|iphone|ipad|ipod/i.test(ua);
  }, []);

  const PAD = 3;

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    const { x: ox, y: oy } = getBlockOffset(blockRef.current);
    gsap.to(cursorRef.current, { x: x - ox, y: y - oy, duration: 0.1, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;
    const origCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const qsa = cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner");
    cornersRef.current = Array.from(qsa);
    blockRef.current = getContainingBlock(cursor);

    let activeTarget: HTMLElement | null = null;
    let leaveHandler: (() => void) | null = null;

    const cleanup = (t: HTMLElement) => {
      if (leaveHandler) t.removeEventListener("mouseleave", leaveHandler);
      leaveHandler = null;
    };

    const moveH = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveH, { passive: true });

    const scrollH = () => {
      if (activeTarget && isActive.current && positions.current) {
        const r = activeTarget.getBoundingClientRect();
        positions.current = [
          { x: r.left - PAD, y: r.top - PAD },
          { x: r.right + PAD, y: r.top - PAD },
          { x: r.right + PAD, y: r.bottom + PAD },
          { x: r.left - PAD, y: r.bottom + PAD },
        ];
      }
    };
    window.addEventListener("scroll", scrollH, { passive: true });

    const downH = () => { if (cornersRef.current) gsap.to(cornersRef.current, { scale: 0.7, duration: 0.15, ease: "power2.out" }); };
    const upH = () => { if (cornersRef.current) gsap.to(cornersRef.current, { scale: 1, duration: 0.15, ease: "power2.out" }); };
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);

    spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    const enterH = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(targetSelector) as HTMLElement | null;
      if (!t || t === activeTarget) return;
      if (activeTarget) cleanup(activeTarget);
      activeTarget = t;

      const r = t.getBoundingClientRect();
      const pos = [
        { x: r.left - PAD, y: r.top - PAD },
        { x: r.right + PAD, y: r.top - PAD },
        { x: r.right + PAD, y: r.bottom + PAD },
        { x: r.left - PAD, y: r.bottom + PAD },
      ];

      isActive.current = true;
      positions.current = pos;
      strength.current = { v: 0 };
      gsap.to(strength.current, { v: 1, duration: hoverDuration, ease: "power2.out", overwrite: true });

      // Stop spin immediately
      if (spinTl.current) { spinTl.current.kill(); spinTl.current = null; }
      gsap.to(cursor, { rotation: 0, duration: 0.2, ease: "power2.out" });

      // Color transition
      if (cursorColorOnTarget && cornersRef.current) {
        gsap.to(cornersRef.current, { borderColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
        if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
      }

      // Corner tracking ticker
      const fn = () => {
        if (!cornersRef.current || !positions.current) return;
        const cx = gsap.getProperty(cursor, "x") as number;
        const cy = gsap.getProperty(cursor, "y") as number;
        cornersRef.current.forEach((c, i) => {
          const bx = positions.current![i].x;
          const by = positions.current![i].y;
          const s = parallaxOn ? strength.current.v : 1;
          const ox = (bx - cx) * s * 0.15;
          const oy = (by - cy) * s * 0.15;
          gsap.to(c, { x: bx + ox - cx, y: by + oy - cy, duration: 0.15, ease: "power2.out" });
        });
      };
      tickerFn.current = fn;
      gsap.ticker.add(fn);

      leaveHandler = () => {
        if (tickerFn.current) gsap.ticker.remove(tickerFn.current);
        isActive.current = false;
        positions.current = null;
        strength.current = { v: 0 };
        activeTarget = null;

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(cornersRef.current, { borderColor: cursorColor, duration: 0.15, ease: "power2.out" });
          if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15, ease: "power2.out" });
        }

        if (cornersRef.current) {
          gsap.killTweensOf(cornersRef.current, "x,y");
          const cs = 12;
          const reset = [
            { x: -cs * 1.5, y: -cs * 1.5 }, { x: cs * 0.5, y: -cs * 1.5 },
            { x: cs * 0.5, y: cs * 0.5 }, { x: -cs * 1.5, y: cs * 0.5 },
          ];
          const tl = gsap.timeline();
          cornersRef.current.forEach((c, i) => tl.to(c, { x: reset[i].x, y: reset[i].y, duration: 0.3, ease: "power3.out" }, 0));
        }

        // Resume spin
        setTimeout(() => {
          if (!activeTarget && cursorRef.current) {
            const cur = gsap.getProperty(cursorRef.current, "rotation") as number;
            const norm = cur % 360;
            spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
            gsap.to(cursorRef.current, {
              rotation: norm + 360,
              duration: spinDuration * (1 - norm / 360),
              ease: "none",
              onComplete: () => spinTl.current?.restart(),
            });
          }
        }, 50);

        cleanup(t);
      };
      t.addEventListener("mouseleave", leaveHandler);
    };
    window.addEventListener("mouseover", enterH, { passive: true });

    const resizeH = () => { blockRef.current = getContainingBlock(cursor); };
    window.addEventListener("resize", resizeH);

    return () => {
      if (tickerFn.current) gsap.ticker.remove(tickerFn.current);
      window.removeEventListener("mousemove", moveH);
      window.removeEventListener("mouseover", enterH);
      window.removeEventListener("scroll", scrollH);
      window.removeEventListener("resize", resizeH);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
      if (activeTarget) cleanup(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = origCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, hideDefaultCursor, isMobile, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor }} />
      <div className="target-cursor-corner corner-tl" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-tr" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-br" style={{ borderColor: cursorColor }} />
      <div className="target-cursor-corner corner-bl" style={{ borderColor: cursorColor }} />
    </div>
  );
};

export default TargetCursor;