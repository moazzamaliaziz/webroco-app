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
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLElement | null>(null);
  const isActive = useRef(false);
  const positions = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFn = useRef<(() => void) | null>(null);
  const strength = useRef({ v: 0 });
  const isOnTarget = useRef(false);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const ua = (navigator.userAgent || "").toLowerCase();
    return /android|webos|iphone|ipad|ipod|mobile/i.test(ua);
  }, []);

  // Gap between cursor corners and element edge � 0 = flush, negative = tighter
  const PAD = 0;

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    const { x: ox, y: oy } = getBlockOffset(blockRef.current);
    gsap.to(cursorRef.current, { x: x - ox, y: y - oy, duration: 0.08, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;
    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current = Array.from(cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner"));
    blockRef.current = getContainingBlock(cursor);

    let activeTarget: HTMLElement | null = null;
    let leaveHandlerFn: (() => void) | null = null;

    const cleanup = (t: HTMLElement) => {
      if (leaveHandlerFn) t.removeEventListener("mouseleave", leaveHandlerFn);
      leaveHandlerFn = null;
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

    const downH = () => {
      if (cornersRef.current.length) gsap.to(cornersRef.current, { scale: 0.6, duration: 0.12, ease: "power2.out" });
    };
    const upH = () => {
      if (cornersRef.current.length) gsap.to(cornersRef.current, { scale: 1, duration: 0.12, ease: "power2.out" });
    };
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);

    // Start spinning
    spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    const enterH = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(targetSelector) as HTMLElement | null;
      if (!t || t === activeTarget) return;
      if (activeTarget) cleanup(activeTarget);
      activeTarget = t;
      isOnTarget.current = true;

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

      // KILL spin completely � no rotation on target
      if (spinTl.current) {
        spinTl.current.kill();
        spinTl.current = null;
      }
      gsap.killTweensOf(cursor, "rotation");
      gsap.set(cursor, { rotation: 0 });

      // Color transition
      if (cursorColorOnTarget) {
        gsap.to(cornersRef.current, { borderColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
        if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15, ease: "power2.out" });
      }

      // Corner tracking
      const fn = () => {
        if (!cornersRef.current.length || !positions.current || !isOnTarget.current) return;
        const cx = gsap.getProperty(cursor, "x") as number;
        const cy = gsap.getProperty(cursor, "y") as number;
        cornersRef.current.forEach((c, i) => {
          const bx = positions.current![i].x;
          const by = positions.current![i].y;
          const s = parallaxOn ? strength.current.v : 1;
          gsap.to(c, {
            x: bx + (bx - cx) * s * 0.12 - cx,
            y: by + (by - cy) * s * 0.12 - cy,
            duration: 0.12,
            ease: "power2.out",
          });
        });
      };
      tickerFn.current = fn;
      gsap.ticker.add(fn);

      leaveHandlerFn = () => {
        if (tickerFn.current) gsap.ticker.remove(tickerFn.current);
        isActive.current = false;
        isOnTarget.current = false;
        positions.current = null;
        strength.current = { v: 0 };
        activeTarget = null;

        // Restore color
        if (cursorColorOnTarget) {
          gsap.to(cornersRef.current, { borderColor: cursorColor, duration: 0.15, ease: "power2.out" });
          if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15, ease: "power2.out" });
        }

        // Reset corners to resting position
        if (cornersRef.current.length) {
          gsap.killTweensOf(cornersRef.current, "x,y");
          const cs = 12;
          const reset = [
            { x: -cs * 1.5, y: -cs * 1.5 },
            { x: cs * 0.5, y: -cs * 1.5 },
            { x: cs * 0.5, y: cs * 0.5 },
            { x: -cs * 1.5, y: cs * 0.5 },
          ];
          const tl = gsap.timeline();
          cornersRef.current.forEach((c, i) =>
            tl.to(c, { x: reset[i].x, y: reset[i].y, duration: 0.25, ease: "power3.out" }, 0)
          );
        }

        // Resume spin after a short delay
        setTimeout(() => {
          if (!isOnTarget.current && cursorRef.current) {
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
          }
        }, 80);

        cleanup(t);
      };
      t.addEventListener("mouseleave", leaveHandlerFn);
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
      document.body.style.cursor = "";
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