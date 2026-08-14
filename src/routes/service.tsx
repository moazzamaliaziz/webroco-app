import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhysicsPills from "../components/PhysicsPills";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Expertise — Webroco Studio" },
      { name: "description", content: "A multidisciplinary studio crafting art direction, interaction design, development, marketing and brand systems for ambitious teams." },
      { property: "og:title", content: "Expertise — Webroco Studio" },
      { property: "og:description", content: "Art direction, interaction design, development, marketing & brand systems." },
    ],
  }),
  component: Page,
});

const services = [
  { title: "Art Direction", images: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80",
  ]},
  { title: "Interaction Design", images: [
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
  ]},
  { title: "Development", images: [
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  ]},
  { title: "Marketing", images: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80",
  ]},
  { title: "Brand Guideline", images: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
  ]},
  { title: "Creative Writing", images: [
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  ]},
];

const studioTeam = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
const laptopCouch = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16 md:pt-20">
      <Header />
      <Hero />
      <ServicesList />
      <GalleryStory />
      <ClientPhysics />
      <Marquee />
      <Footer />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="relative min-h-[80vh] sm:min-h-screen grid place-items-center px-4 overflow-hidden">
      <motion.h1
        style={{ scale, opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="display text-center leading-[0.82] text-[22vw] sm:text-[19vw] select-none"
      >
        Expertise
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll to explore ↓
      </motion.p>
    </section>
  );
}

function ServicesList() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Our capabilities</span>
          <p className="mt-4 text-sm text-muted-foreground max-w-[200px]">Six disciplines, one team. Hover each line to peek inside.</p>
        </div>

        <ul className="relative">
          {services.map((s, i) => (
            <li
              key={s.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border-t border-border/60 last:border-b"
            >
              <a href="#" className="flex items-center justify-between gap-4 py-6 sm:py-8 transition-all">
                <span className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                  <span className="text-xs sm:text-sm text-muted-foreground tabular-nums shrink-0">0{i + 1}</span>
                  <span className={`display text-[10vw] sm:text-7xl lg:text-8xl transition-all duration-500 ${hovered === i ? "text-accent translate-x-2 sm:translate-x-4" : ""}`}>
                    {s.title}
                  </span>
                </span>

                <span className="hidden sm:flex shrink-0 items-center -space-x-3">
                  {s.images.map((img, idx) => (
                    <motion.span
                      key={idx}
                      animate={{
                        scale: hovered === i ? 1 : 0.6,
                        opacity: hovered === i ? 1 : 0,
                        rotate: hovered === i ? (idx - 1) * 6 : 0,
                        x: hovered === i ? 0 : 20,
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 }}
                      className="block size-14 lg:size-16 rounded-xl overflow-hidden border-2 border-background shadow-xl"
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </motion.span>
                  ))}
                </span>

                <span className={`hidden lg:inline-block text-2xl transition-all duration-300 ${hovered === i ? "translate-x-2 text-accent" : "text-muted-foreground"}`}>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryStory() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <img src={studioTeam} alt="Team at work" className="w-full aspect-[4/3] object-cover rounded-2xl" loading="lazy" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
          A practical guide explaining how and why Webroco should be part of every project to ensure its high quality and seamless user experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="space-y-8 lg:pt-32"
      >
        <img src={laptopCouch} alt="Workspace" className="w-full aspect-[4/3] object-cover rounded-2xl" loading="lazy" />
        <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed ml-auto">
          If you already understand, keep scrolling; otherwise tap the link below to dig deeper into our process.
        </p>
      </motion.div>
    </section>
  );
}

function ClientPhysics() {
  return (
    <section className="relative border-t border-border/60 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-16 sm:pt-24 pb-32 sm:pb-48 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="display text-[9vw] sm:text-6xl lg:text-7xl max-w-5xl leading-[0.95]"
        >
          Client: Helping brands to grow and say their success stories to the world.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 max-w-md text-muted-foreground leading-relaxed"
        >
          We're a great team of creatives with the strongest capabilities — helping progressive fields achieve their goals with the best talent on every project.
        </motion.p>

        <PhysicsPills />

        <div className="absolute bottom-0 inset-x-0 h-12 flex flex-col justify-end gap-[3px] px-5 sm:px-8 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-px bg-border" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Art Direction", "Interaction", "Development", "Marketing", "Brand", "Creative Writing"];
  const row = [...words, ...words, ...words];
  return (
    <section className="border-y border-border/60 py-6 sm:py-8 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {row.map((w, i) => (
          <span key={i} className="display text-4xl sm:text-6xl text-muted-foreground/40 flex items-center gap-12">
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

// Footer replaced by shared component
