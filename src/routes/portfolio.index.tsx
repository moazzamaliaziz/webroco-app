import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../components/Header";

export const Route = createFileRoute("/portfolio/")({
  component: PortfolioPage,
});

const COVERS = Array.from({ length: 20 }, (_, i) => `https://picsum.photos/seed/webroco-${i + 1}/800/1000`);

type TileDef = { col: number; row: number; colSpan: number; rowSpan: number; aspect: string };

const TILES: TileDef[] = [
  { col: 3, row: 1, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 4, row: 1, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 5, row: 1, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 6, row: 1, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 2, row: 2, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 3, row: 2, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 5, row: 2, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 7, row: 2, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 1, row: 3, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 3, row: 3, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 4, row: 3, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 6, row: 3, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 7, row: 3, colSpan: 1, rowSpan: 2, aspect: "aspect-[3/5]" },
  { col: 2, row: 4, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 4, row: 4, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 5, row: 4, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 6, row: 4, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 3, row: 5, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
  { col: 5, row: 5, colSpan: 1, rowSpan: 1, aspect: "aspect-[4/5]" },
  { col: 6, row: 5, colSpan: 1, rowSpan: 1, aspect: "aspect-square" },
];

const PROJECTS = [
  { title: "This Was Made With AI", slug: "ai-generated-content" },
  { title: "Internet 4-25 / Issue 533", slug: "internet-4-25" },
  { title: "Sonic Boom — Retro Audio", slug: "sonic-boom-retro-audio" },
  { title: "Sail Away — Coastal Brand", slug: "sail-away-coastal-brand" },
  { title: "Vector Portrait Study", slug: "vector-portrait-study" },
  { title: "Magnetic Wearables", slug: "magnetic-wearables" },
  { title: "Chrysanthemum Press", slug: "chrysanthemum-press" },
  { title: "Geometric Design — Vol 12", slug: "geometric-design-vol-12" },
  { title: "Soft Light Studies", slug: "soft-light-studies" },
  { title: "Hat Tip — Editorial", slug: "hat-tip-editorial" },
];

const SEEDS = [
  { y: 180, scale: 0.65 },
  { y: 220, scale: 0.72 },
  { y: 160, scale: 0.6 },
  { y: 200, scale: 0.68 },
  { y: 190, scale: 0.64 },
  { y: 210, scale: 0.7 },
  { y: 170, scale: 0.58 },
  { y: 230, scale: 0.75 },
  { y: 155, scale: 0.62 },
  { y: 205, scale: 0.66 },
  { y: 185, scale: 0.69 },
  { y: 215, scale: 0.63 },
  { y: 175, scale: 0.71 },
  { y: 195, scale: 0.67 },
  { y: 165, scale: 0.6 },
  { y: 225, scale: 0.73 },
  { y: 180, scale: 0.65 },
  { y: 210, scale: 0.68 },
  { y: 170, scale: 0.62 },
  { y: 200, scale: 0.7 },
];

function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs tracking-[0.3em] text-muted-foreground mb-6"
      >
        [ SELECTED WORK · 2018 — 2026 ]
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="display text-[clamp(3.5rem,11vw,11rem)] leading-[0.85]"
      >
        Scroll to<br /><span className="text-accent">reveal</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-8 text-base text-muted-foreground max-w-md"
      >
        Twenty projects. One scroll. A bento of brand, motion, and editorial.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2 text-muted-foreground text-[10px] tracking-[0.3em]"
      >
        <span>SCROLL</span>
        <span className="w-px h-16 bg-foreground/20" />
      </motion.div>
    </section>
  );
}

function BentoImageCard({
  tile, index, scrollYProgress,
}: {
  tile: TileDef; index: number; scrollYProgress: MotionValue<number>;
}) {
  const seed = SEEDS[index % SEEDS.length];
  const col = tile.col - 1;
  const colOffset = col * 0.045;
  const start = 0 + colOffset;
  const end = 0.65 + colOffset;

  const y = useTransform(scrollYProgress, [start, end], [seed.y, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [seed.scale, 1]);
  const opacity = useTransform(scrollYProgress, [start, Math.min(0.95, start + 0.12)], [0, 1]);

  return (
    <motion.figure
      style={{
        gridColumnStart: tile.col,
        gridColumnEnd: `span ${tile.colSpan}`,
        gridRowStart: tile.row,
        gridRowEnd: `span ${tile.rowSpan}`,
        y,
        scale,
        opacity,
      }}
      className="group relative overflow-hidden rounded-lg bg-card"
    >
      <div className={`relative ${tile.aspect} w-full overflow-hidden`}>
        <img
          src={COVERS[index]}
          alt={PROJECTS[index % PROJECTS.length].title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Link to="/portfolio/$slug" params={{ slug: PROJECTS[index % PROJECTS.length].slug }} className="absolute inset-0 flex items-end p-4 md:p-5">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-[10px] tracking-[0.25em] text-foreground/70 mb-1">
              {String(index + 1).padStart(2, "0")} · CASE STUDY
            </p>
            <h3 className="display text-xl md:text-2xl leading-tight">{PROJECTS[index % PROJECTS.length].title}</h3>
          </div>
        </Link>
      </div>
    </motion.figure>
  );
}

function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="min-h-[200vh] flex items-center py-32 px-4 md:px-8">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="hidden md:grid gap-2 md:gap-3" style={{ gridTemplateColumns: "repeat(7, minmax(0,1fr))" }}>
          {TILES.map((t, i) => (
            <BentoImageCard key={i} tile={t} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
        <div className="md:hidden grid grid-cols-2 gap-3">
          {COVERS.map((src, i) => (
            <Link key={i} to="/portfolio/$slug" params={{ slug: PROJECTS[i % PROJECTS.length].slug }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg bg-card">
              <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                src={src} alt={PROJECTS[i % PROJECTS.length].title} loading="lazy"
                className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[10px] text-foreground/80 leading-tight">{PROJECTS[i % PROJECTS.length].title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 md:px-10 py-32 md:py-48 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9]"
      >
        Have a project<br />in mind?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10"
      >
        <Link to="/" className="pill text-lg">Let's talk →</Link>
      </motion.div>
    </section>
  );
}

function PortfolioPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <BentoGrid />
      <CTA />
    </main>
  );
}