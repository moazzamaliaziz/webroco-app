import { useEffect, useRef } from "react";
import Matter from "matter-js";

import {
  SiWordpress, SiShopify, SiNextdotjs, SiReact, SiTailwindcss,
  SiFigma, SiGoogleads, SiSemrush, SiGoogleanalytics, SiTypescript,
  SiFramer, SiVercel, SiNotion, SiGoogle, SiWebflow,
} from "react-icons/si";
import type { IconType } from "react-icons";

type Pill = { label: string; Icon: IconType; color: string };

const PILLS: Pill[] = [
  { label: "WordPress", Icon: SiWordpress, color: "#21759B" },
  { label: "Shopify", Icon: SiShopify, color: "#95BF47" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { label: "React", Icon: SiReact, color: "#61DAFB" },
  { label: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { label: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { label: "Ahrefs", Icon: SiGoogleads, color: "#0095FF" },
  { label: "Semrush", Icon: SiSemrush, color: "#FF642D" },
  { label: "SEO", Icon: SiGoogleanalytics, color: "#E37400" },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { label: "Motion", Icon: SiFramer, color: "#BB4B96" },
  { label: "Vercel", Icon: SiVercel, color: "#000000" },
  { label: "UI/UX", Icon: SiNotion, color: "#111111" },
  { label: "Webflow", Icon: SiWebflow, color: "#146EF5" },
];

export default function PhysicsPills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const width = scene.clientWidth;
    const height = scene.clientHeight;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.1 } });
    const world = engine.world;

    const wallOpts = { isStatic: true, render: { visible: false } };
    Matter.World.add(world, [
      Matter.Bodies.rectangle(width / 2, height + 30, width + 200, 60, wallOpts),
      Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOpts),
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOpts),
    ]);

    const bodies: Matter.Body[] = pillRefs.current.map((el, i) => {
      if (!el) return null as never;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const body = Matter.Bodies.rectangle(
        40 + Math.random() * (width - 80),
        -100 - i * 80 - Math.random() * 200,
        w,
        h,
        {
          chamfer: { radius: h / 2 },
          restitution: 0.55,
          friction: 0.08,
          frictionAir: 0.012,
          density: 0.0015,
          angle: (Math.random() - 0.5) * 0.6,
        }
      );
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      return body;
    }).filter(Boolean) as Matter.Body[];

    Matter.World.add(world, bodies);

    const mouse = Matter.Mouse.create(scene);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    (mouse as unknown as { element: HTMLElement }).element.removeEventListener(
      "wheel",
      (mouse as unknown as { mousewheel: EventListener }).mousewheel
    );
    Matter.World.add(world, mouseConstraint);

    let raf = 0;
    const sync = () => {
      bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${b.position.y - el.offsetHeight / 2}px) rotate(${b.angle}rad)`;
      });
      raf = requestAnimationFrame(sync);
    };

    const runner = Matter.Runner.create();
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      Matter.Runner.run(runner, engine);
      sync();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(scene);

    const onResize = () => {
      const nw = scene.clientWidth;
      const nh = scene.clientHeight;
      Matter.Body.setPosition(world.bodies[0], { x: nw / 2, y: nh + 30 });
      Matter.Body.setPosition(world.bodies[1], { x: -30, y: nh / 2 });
      Matter.Body.setPosition(world.bodies[2], { x: nw + 30, y: nh / 2 });
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative h-[460px] sm:h-[520px] mt-8 select-none touch-none"
    >
      {PILLS.map((p, i) => {
        const Icon = p.Icon;
        return (
          <div
            key={p.label}
            ref={(el) => { pillRefs.current[i] = el; }}
            className="absolute top-0 left-0 will-change-transform"
            style={{ transform: "translate(-200px,-200px)" }}
          >
            <div className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] font-medium text-sm sm:text-base whitespace-nowrap">
              <Icon size={20} color={p.color} />
              <span>{p.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}