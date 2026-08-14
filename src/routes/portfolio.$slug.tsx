import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleize(params.slug)} — Case Study` },
      { name: "description", content: `${titleize(params.slug)} — visual identity, branding and craft.` },
      { property: "og:title", content: `${titleize(params.slug)} — Case Study` },
      { property: "og:description", content: `Brand, identity and motion case study.` },
      { property: "og:image", content: `https://picsum.photos/seed/${params.slug}-cover/1600/900` },
    ],
  }),
  component: PortfolioDetailsPage,
});

function titleize(slug: string) {
  return slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");
}

const GALLERY = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/webroco-g-${i + 1}/900/1200`);

function ParallaxImg({ src, alt, speed = 0.8 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-md">
      <motion.img style={{ y }} src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
    </div>
  );
}

function TitleHeader({ slug }: { slug: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
    >
      <div className="w-full md:w-[28%] aspect-[5/4] overflow-hidden rounded-md bg-card shrink-0">
        <img src={`https://picsum.photos/seed/${slug}-thumb/600/480`} alt={titleize(slug)}
          className="w-full h-full object-cover" />
      </div>
      <h1 className="display text-[clamp(2.5rem,9vw,9rem)] leading-[0.88] flex-1">
        {titleize(slug).split(" ").map((w, i) => {
          if (i === Math.floor(titleize(slug).split(" ").length / 2)) return <span key={i}>{w}<br /></span>;
          return <span key={i}>{w}{" "}</span>;
        })}
      </h1>
    </motion.div>
  );
}

function MetaBar() {
  const items = [
    { title: "Service", text: "Visual Identity, Branding" },
    { title: "Client", text: "Softakey Digital Agency" },
    { title: "Date", text: "January 2026" },
    { title: "Technology", text: "Figma, WordPress" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
    >
      {items.map((m) => (
        <div key={m.title}>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{m.title}</p>
          <p className="text-sm md:text-base">{m.text}</p>
        </div>
      ))}
    </motion.div>
  );
}

function StorySplit() {
  const bullets = ["Brand Development", "UX/UI Design", "Front-end Development", "Copywriting", "Shopify Development"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-2 gap-10 md:gap-16"
    >
      <h2 className="display text-[clamp(2rem,5vw,5rem)] leading-[0.95]">
        Build, streamline and evolve together with solution.
      </h2>
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          Myriam was first trained as a sculptor in Montreal and then in Helsinki, Finland. She is now based in Quebec
          but works for clients all around the globe. From textile design to murals, editorial illustrations and book
          covers, her style is recognized by her simple and perfectly arranged shapes as well as her rich and vibrant
          color palette. Striking pewter studded epaulettes silver zips inner drawstring waist channel.
        </p>
        <ul className="space-y-3 list-none">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm">
              <span className="h-px w-6 bg-foreground/50 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function DetailsBlocks() {
  const blocks = [
    {
      num: "01",
      title: "Visual Hierarchy",
      text: "Visual hierarchy is the principle of arranging elements to show their order of importance. information easily. By laying out elements logically designers working process by wireframing.",
    },
    {
      num: "02",
      title: "Components",
      text: "From textile design to murals, editorial illustrations and book covers, her style is recognized by her simple and perfectly arranged shapes as well as her rich and vibrant color palette.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-2 gap-10 md:gap-16"
    >
      {blocks.map((b) => (
        <div key={b.num}>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">{b.num}</p>
          <h3 className="display text-3xl md:text-4xl mb-4 leading-tight">{b.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{b.text}</p>
        </div>
      ))}
    </motion.div>
  );
}

function Pagination({ slug }: { slug: string }) {
  const slugs = [
    "ai-generated-content",
    "internet-4-25",
    "sonic-boom-retro-audio",
    "sail-away-coastal-brand",
    "vector-portrait-study",
    "magnetic-wearables",
    "chrysanthemum-press",
    "geometric-design-vol-12",
    "soft-light-studies",
    "hat-tip-editorial",
  ];
  const idx = slugs.indexOf(slug);
  const prev = idx > 0 ? slugs[idx - 1] : null;
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-between"
    >
      {prev ? (
        <Link to="/portfolio/$slug" params={{ slug: prev }} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <svg width="13" height="18" viewBox="0 0 13 18" fill="none" className="group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.871 10.896c-.849-.618-1.778-1.117-2.76-1.489l-1.286-.407c1.457.373 2.834 1.014 4.047 1.897 2.028 1.476 3.486 3.545 4.148 5.887-.07-.245-.148-.487-.235-.726-.74-2.043-2.098-3.84-3.914-5.161Zm4.148-9.68l-1.122-.286c-.595 2.108-1.908 3.971-3.733 5.3-1.826 1.328-4.063 2.048-6.363 2.048v.001c2.3 0 4.537-.72 6.363-2.05 1.825-1.328 3.138-3.19 3.733-5.298l1.122.285Zm-3.66 9.078c-.698-.508-1.445-.94-2.23-1.294.785-.354 1.532-.786 2.23-1.294 2.168-1.578 3.726-3.79 4.434-6.294L13 .678l-2.669-.678-.207.734c-.55 1.946-1.762 3.666-3.448 4.893C4.99 7.48 2.925 8.145.8 8.145H0v2.963h.8c2.125 0 4.19.665 5.876 1.891 1.686 1.227 2.897 2.947 3.447 4.894l.208.733L13 17.322l-.207-.734c-.708-2.503-2.266-4.716-4.434-6.294Z" fill="currentColor" />
          </svg>
          Prev
        </Link>
      ) : <span />}
      {next ? (
        <Link to="/portfolio/$slug" params={{ slug: next }} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          Next
          <svg width="13" height="18" viewBox="0 0 13 18" fill="none" className="group-hover:translate-x-1 transition-transform">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.129 10.896c.849-.618 1.778-1.117 2.76-1.489l1.286-.407c-1.457.373-2.834 1.014-4.047 1.897-2.028 1.476-3.486 3.545-4.148 5.887.07-.245.148-.487.235-.726.74-2.043 2.098-3.84 3.914-5.161Zm-4.148-9.68 1.122-.286c.595 2.108 1.908 3.971 3.733 5.3 1.826 1.328 4.063 2.048 6.363 2.048v.001c-2.3 0-4.537-.72-6.363-2.05-1.825-1.328-3.138-3.19-3.733-5.298l-1.122.285Zm3.66 9.078c.698-.508 1.445-.94 2.23-1.294-.785-.354-1.532-.786-2.23-1.294-2.168-1.578-3.726-3.79-4.434-6.294L0 .678l2.669-.678.207.734c.55 1.946 1.762 3.666 3.448 4.893 1.686 1.227 3.75 1.892 5.875 1.892H13v2.963h-.8c-2.125 0-4.19.665-5.876 1.891-1.686 1.227-2.897 2.947-3.447 4.894l-.208.733L0 17.322l.207-.734c.708-2.503 2.266-4.716 4.434-6.294Z" fill="currentColor" />
          </svg>
        </Link>
      ) : <span />}
    </motion.div>
  );
}

function PortfolioDetailsPage() {
  const { slug } = Route.useParams();
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <section className="pt-28 md:pt-36">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <TitleHeader slug={slug} />
          <div className="mt-10 md:mt-14">
            <MetaBar />
          </div>
        </div>
        <div className="mt-14 md:mt-20 px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto">
            <ParallaxImg src={`https://picsum.photos/seed/${slug}-feat/1920/1100`} alt="" speed={0.8} />
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-20 md:mt-28">
          <StorySplit />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {GALLERY.map((src, i) => (
              <ParallaxImg key={i} src={src} alt={`Gallery ${i + 1}`} speed={0.8} />
            ))}
          </motion.div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-20 md:mt-28">
          <DetailsBlocks />
        </div>
        <div className="mt-16 px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto">
            <ParallaxImg src={`https://picsum.photos/seed/${slug}-wide/1920/800`} alt="" speed={0.8} />
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-16 md:mt-20 pb-16">
          <Pagination slug={slug} />
        </div>
      </section>
      <Footer />
    </main>
  );
}