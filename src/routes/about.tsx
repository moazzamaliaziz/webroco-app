import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ─── image URLs (Unsplash — same vibe as reference assets) ─────────────── */

const studioTeam = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
const laptopCouch = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
const brandFlatlay = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
const collab = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";
const t1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80";
const t2 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80";
const t3 = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80";
const t4 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Webroco Studio" },
      { name: "description", content: "Since 2017, Webroco has been crafting digital products with a unique vision of making user experience better." },
      { property: "og:title", content: "About — Webroco Studio" },
      { property: "og:description", content: "A global creative agency crafting brand, product and digital experiences." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16 md:pt-20">
      <Header />
      <Hero />
      <IntroSplit />
      <GalleryStrip />
      <Approach />
      <Stats />
      <LogoMarquee />
      <Collaborate />
      <Awards />
      <Team />
      <TeamList />
      <Footer />
    </div>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  return (
    <section ref={ref} className="relative min-h-[80vh] sm:min-h-screen grid place-items-center px-4 overflow-hidden">
      <motion.h1
        style={{ scale, opacity }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="display text-center leading-[0.82] text-[24vw] sm:text-[20vw] select-none"
      >
        Since 2017
      </motion.h1>
    </section>
  );
}

/* ─── INTRO SPLIT ─────────────────────────────────────────────────────── */

function IntroSplit() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About Studio</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[8vw] sm:text-6xl lg:text-7xl leading-[0.95] max-w-5xl"
        >
          Crafting digital products with a unique — vision of making user experience better.
        </motion.h2>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-10">
        <div />
        <motion.ul
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-3 text-xl sm:text-2xl"
        >
          {["Full-Stack Development", "UI/UX Design", "SEO & Growth"].map(t => (
            <motion.li key={t}
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              className="flex items-center gap-3">
              <span className="size-1.5 bg-accent shrink-0" /> {t}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="space-y-6 text-muted-foreground leading-relaxed max-w-md"
        >
          <p>Webroco is a first and only creative agency for your real exploration. It's one private place to save everything you can realize about digital beautifully design.</p>
          <p>As a global creative agency, we understand the importance of staying ahead of the game. That's why we partner with some of the world's best talent to bring fresh ideas.</p>
          <Link to="/service" className="inline-flex items-center px-7 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent transition-all hover:scale-105">Explore Services →</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── GALLERY STRIP ───────────────────────────────────────────────────── */

function GalleryStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);
  const imgs = [studioTeam, laptopCouch, brandFlatlay, collab, studioTeam, laptopCouch];
  return (
    <section ref={ref} className="overflow-hidden py-10">
      <motion.div style={{ x }} className="flex gap-5 sm:gap-6 w-max pl-5 sm:pl-8">
        {imgs.map((src, i) => (
          <div key={i} className="w-[60vw] sm:w-[28vw] aspect-[3/4] rounded-2xl overflow-hidden shrink-0">
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── APPROACH ────────────────────────────────────────────────────────── */

function Approach() {
  const steps = [
    { h: "Problem discovery", items: ["Usability Studies", "User Interviews", "Stakeholder Interviews", "Competitive Research", "Insights Report", "User Journey"] },
    { h: "Design system ready", items: ["Thinking Workshops", "Sitemaps", "Concepts", "Designs", "Prototypes", "Usability Studies"] },
    { h: "Design implementation", items: ["Design", "Use Cases", "User Flows", "Various User Types", "Annotations", "Interactions"] },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Approach</span>
        </div>
        <div className="space-y-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="display text-[8vw] sm:text-6xl lg:text-7xl leading-[0.95] max-w-3xl"
          >
            Method of making better result
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {steps.map((s, i) => (
              <motion.div key={s.h}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                className="space-y-5 relative"
              >
                <h3 className="text-xl sm:text-2xl max-w-[12ch]">{s.h}</h3>
                {i < 2 && (
                  <motion.span
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                    className="hidden md:block absolute top-3 right-[-30px] w-[60px] h-px bg-muted-foreground/40 origin-left"
                  />
                )}
                <ul className="space-y-2 text-muted-foreground">
                  {s.items.map(it => <li key={it}>{it}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── COUNTER ─────────────────────────────────────────────────────────── */

function CounterNum({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startT = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - startT) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Number((to * eased).toFixed(to < 10 ? 1 : 0)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── STATS ───────────────────────────────────────────────────────────── */

function Stats() {
  const stats = [
    { l: "35+ Google reviews", v: 4.9, s: "" },
    { l: "Clients world-wide", v: 170, s: "+" },
    { l: "Completed projects", v: 1.7, s: "k" },
    { l: "Client satisfaction", v: 95, s: "%" },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Who are we?</span>
        </div>
        <div className="space-y-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="display text-[8vw] sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl"
          >
            We deliver creative ideas to a crowded world.
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border/60 p-6 sm:p-8 overflow-hidden group hover:border-accent/60 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 transition-all duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="text-xs text-muted-foreground mb-3">{s.l}</div>
                  <div className="display text-5xl sm:text-6xl">
                    <CounterNum to={s.v} suffix={s.s} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── LOGO MARQUEE ────────────────────────────────────────────────────── */

function LogoMarquee() {
  const logos = ["miro", "Voiceflow", "monday", "dokey.", "SendGrid", "webflow", "pingdom", "Notion", "Linear"];
  const row = [...logos, ...logos, ...logos];
  return (
    <section className="py-14">
      <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto px-5">Help to brands growing up and show their success stories to the world</p>
      <div className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6 animate-marquee w-max">
          {row.map((l, i) => (
            <div key={i} className="px-8 py-5 rounded-full border border-border/60 text-2xl sm:text-3xl text-muted-foreground/60 italic display whitespace-nowrap">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COLLABORATE ─────────────────────────────────────────────────────── */

function Collaborate() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden aspect-[4/5]"
        >
          <img src={collab} alt="Team collaboration" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <div className="space-y-8">
          <motion.h3
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="display text-[7vw] sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Collaborate with a super down-to-earth, mad-talented team
          </motion.h3>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            A collective bunch working on incredible projects and building enduring partnerships that extend well beyond the deliverable.
          </p>
          <Link to="/" className="inline-flex items-center px-7 py-4 rounded-full border border-border/60 text-sm font-medium hover:bg-foreground hover:text-background transition-all hover:scale-105">Learn More →</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── AWARDS ──────────────────────────────────────────────────────────── */

function Awards() {
  const groups = [
    { h: "Awwwards", rows: [["7x Honorable Mention", "2014"], ["4x Site of the Day", "2016"], ["2x Developer Awards", "2016"], ["1x Site of the Year", "2019"], ["1x Design of the Year", "2025"]] },
    { h: "CSS Design", rows: [["2x Website of the Day", "2014"], ["1x Best Innovation", "2016"], ["5x UX Design", "2016"], ["6x Creative Design", "2019"]] },
    { h: "Dribbble", rows: [["2x Design of the Day", "2014"], ["2x Site of the Day", "2016"]] },
    { h: "Behance", rows: [["5x Featured Design", "2025"]] },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Awards</span>
        </div>
        <div className="space-y-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="display text-[8vw] sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl"
          >
            Quality always comes first than quantity, that's why we're great ever.
          </motion.h2>
          <div className="divide-y divide-border/60 border-t border-border/60">
            {groups.map((g, gi) => (
              <motion.div key={g.h}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 py-8"
              >
                <h4 className="text-lg">{g.h}</h4>
                <div className="space-y-2">
                  {g.rows.map(([name, year]) => (
                    <div key={name} className="grid grid-cols-[1fr_auto] gap-4 text-muted-foreground hover:text-foreground transition-colors">
                      <span>{name}</span><span className="tabular-nums">{year}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM ────────────────────────────────────────────────────────────── */

function Team() {
  const team = [
    { n: "Moazzam Ali", r: "Creative Director", img: t1 },
    { n: "Sarah Chen", r: "Brand Designer", img: t2 },
    { n: "Alex Rivera", r: "Lead Developer", img: t3 },
    { n: "Jordan Park", r: "Strategist", img: t4 },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Team</span>
        </div>
        <div className="space-y-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="display text-[8vw] sm:text-6xl lg:text-7xl leading-[0.95] max-w-3xl"
          >
            Meet the talented squad, behind the creativity
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <img src={p.img} alt={p.n} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-base sm:text-lg">{p.n}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{p.r}</div>
                  </div>
                  <span className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all">↗</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM LIST ───────────────────────────────────────────────────────── */

function TeamList() {
  const rows = [
    { n: "Ana Dina Belić", r: "Graphic Designer", img: t2 },
    { n: "Giuseppe Carbonara", r: "Brand Strategist", img: t3 },
    { n: "Vedran Starčić", r: "Jr. Designer", img: t4 },
    { n: "Izquierdo Bayà", r: "Creative Writer", img: t1 },
    { n: "Jared Silverman", r: "Motion Designer", img: t2 },
    { n: "Samuel Bertain", r: "WordPress Developer", img: t3 },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-8 pb-20 sm:pb-28">
      <ul className="divide-y divide-border/60 border-t border-border/60 list-none">
        {rows.map((p, i) => (
          <motion.li key={p.n}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group"
          >
            <a href="#" className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6">
              <img src={p.img} alt={p.n} loading="lazy" className="size-12 sm:size-14 rounded-full object-cover" />
              <span className="text-base sm:text-2xl group-hover:translate-x-2 group-hover:text-accent transition-all">{p.n}</span>
              <span className="hidden sm:block text-muted-foreground">{p.r}</span>
              <span className="text-muted-foreground group-hover:text-accent group-hover:rotate-45 transition-all text-xl">↗</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────── */

// Footer replaced by shared component