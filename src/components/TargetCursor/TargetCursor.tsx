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

const getContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.willChange.includes("transform") ||
      style.willChange.includes("perspective") ||
      style.willChange.includes("filter") ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null): { x: number; y: number } => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = "#ffffff",
  cursorColorOnTarget,
}: TargetCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const activeStrengthRef = useRef<{ current: number }>({ current: 0 });

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  const moveCursor = useCallback(
    (x: number, y: number) => {
      if (!cursorRef.current) return;
      const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
      gsap.to(cursorRef.current, {
        x: x - offsetX,
        y: y - offsetY,
        duration: 0.1,
        ease: "power3.out",
      });
    },
    [],
  );

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(".target-cursor-corner");

    containingBlockRef.current = getContainingBlock(cursor);

    let activeTarget: HTMLElement | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: HTMLElement) => {
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    // Mouse move
    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler, { passive: true });

    // Scroll
    const scrollHandler = () => {
      if (activeTarget && isActiveRef.current && targetCornerPositionsRef.current) {
        const rect = activeTarget.getBoundingClientRect();
        const { cornerSize } = constants;
        const pad = 10;
        const positions = [
          { x: rect.left - pad, y: rect.top - pad },
          { x: rect.right + pad, y: rect.top - pad },
          { x: rect.right + pad, y: rect.bottom + pad },
          { x: rect.left - pad, y: rect.bottom + pad },
        ];
        targetCornerPositionsRef.current = positions;
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Click
    const mouseDownHandler = () => {
      if (!cornersRef.current) return;
      gsap.to(Array.from(cornersRef.current), {
        scale: 0.7,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    const mouseUpHandler = () => {
      if (!cornersRef.current) return;
      gsap.to(Array.from(cornersRef.current), {
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    // Spin animation
    spinTl.current = gsap
      .timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Enter handler
    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(targetSelector) as HTMLElement | null;
      if (!target || target === activeTarget) return;

      if (activeTarget) cleanupTarget(activeTarget);
      activeTarget = target;

      const rect = target.getBoundingClientRect();
      const pad = 10;
      const positions = [
        { x: rect.left - pad, y: rect.top - pad },
        { x: rect.right + pad, y: rect.top - pad },
        { x: rect.right + pad, y: rect.bottom + pad },
        { x: rect.left - pad, y: rect.bottom + pad },
      ];

      isActiveRef.current = true;
      targetCornerPositionsRef.current = positions;
      activeStrengthRef.current = { current: 0 };

      gsap.to(activeStrengthRef.current, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
        overwrite: true,
      });

      if (spinTl.current) spinTl.current.pause();
      gsap.to(cursor, { rotation: 0, duration: 0.3, ease: "power2.out" });

      if (cursorColorOnTarget && cornersRef.current) {
        gsap.to(Array.from(cornersRef.current), {
          borderColor: cursorColorOnTarget,
          duration: 0.15,
          ease: "power2.out",
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColorOnTarget,
            duration: 0.15,
            ease: "power2.out",
          });
        }
      }

      // Ticker for parallax corners
      if (parallaxOn) {
        const tickerFn = () => {
          if (!cornersRef.current || !targetCornerPositionsRef.current) return;
          const corners = Array.from(cornersRef.current);
          const positions = targetCornerPositionsRef.current;
          const strength = activeStrengthRef.current.current;

          const cursorX = gsap.getProperty(cursor, "x") as number;
          const cursorY = gsap.getProperty(cursor, "y") as number;

          corners.forEach((corner, i) => {
            const baseX = positions[i].x;
            const baseY = positions[i].y;
            const offsetX = (baseX - cursorX) * strength * 0.15;
            const offsetY = (baseY - cursorY) * strength * 0.15;

            gsap.to(corner, {
              x: baseX + offsetX - cursorX,
              y: baseY + offsetY - cursorY,
              duration: 0.2,
              ease: "power2.out",
            });
          });
        };
        tickerFnRef.current = tickerFn;
        gsap.ticker.add(tickerFn);
      } else {
        const tickerFn = () => {
          if (!cornersRef.current || !targetCornerPositionsRef.current) return;
          const corners = Array.from(cornersRef.current);
          const positions = targetCornerPositionsRef.current;
          const cursorX = gsap.getProperty(cursor, "x") as number;
          const cursorY = gsap.getProperty(cursor, "y") as number;

          corners.forEach((corner, i) => {
            gsap.to(corner, {
              x: positions[i].x - cursorX,
              y: positions[i].y - cursorY,
              duration: 0.2,
              ease: "power2.out",
            });
          });
        };
        tickerFnRef.current = tickerFn;
        gsap.ticker.add(tickerFn);
      }

      // Leave handler
      const leaveHandler = () => {
        if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);

        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
        activeTarget = null;

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), { borderColor: cursorColor, duration: 0.15, ease: "power2.out" });
          if (dotRef.current) gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15, ease: "power2.out" });
        }

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners, "x,y");
          const { cornerSize } = constants;
          const resetPositions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(corner, { x: resetPositions[index].x, y: resetPositions[index].y, duration: 0.3, ease: "power3.out" }, 0);
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, "rotation") as number;
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => spinTl.current?.restart(),
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = { current: 0 };
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration, isMobile]);

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