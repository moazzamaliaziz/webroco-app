import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Preloader } from "../components/preloader";
import heroImg from "../assets/hero-webroco.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Webroco — We Build the Web. You Own the Results." },
      { name: "description", content: "Full-stack web development, SEO and UI/UX design that drives growth, performance and real results." },
      { property: "og:title", content: "Webroco — Senior-Level Web Studio" },
      { property: "og:description", content: "Full-stack web development, SEO and UI/UX design that drives growth, performance and real results." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <div id="app" className="min-h-screen bg-background text-foreground font-['Plus_Jakarta_Sans',sans-serif] overflow-x-clip antialiased transition-[background] duration-700">
      <BackgroundMorph />
      <Preloader onComplete={handleComplete} />
      {loaded && (
        <>
          <Header />
          <Hero />
          <PartnerMarquee />
          <About />
          <StatsCounter />
          <Work />
          <Services />
          <Testimonials />
          <Team />
          <BigCTA />
          <Footer />
        </>
      )}
    </div>
  );
}

/* ============================= BACKGROUND MORPH ============================ */

function BackgroundMorph() {
  useEffect(() => {
    const app = document.getElementById("app");
    if (!app) return;

    const lightSections = document.querySelectorAll('[data-bg="light"]');
    const darkSections = document.querySelectorAll('[data-bg="dark"]');

    const lightObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            app.style.background = "#f5f0e8";
            app.style.color = "#111111";
          } else {
            const anyLight = [...lightSections].some((s) => (s as HTMLElement).dataset.visible === "true");
            if (!anyLight) {
              app.style.background = "";
              app.style.color = "";
            }
          }
          (e.target as HTMLElement).dataset.visible = e.isIntersecting ? "true" : "false";
        });
      },
      { threshold: 0.3 }
    );

    const darkObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            app.style.background = "";
            app.style.color = "";
          }
        });
      },
      { threshold: 0.3 }
    );

    lightSections.forEach((s) => lightObs.observe(s));
    darkSections.forEach((s) => darkObs.observe(s));

    return () => {
      lightObs.disconnect();
      darkObs.disconnect();
    };
  }, []);

  return null;
}

/* ================================ REVEAL WORDS ================================ */

function RevealWords({
  text,
  className = "",
  baseDelay = 0,
  once = true,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  once?: boolean;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...(animateOnMount
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once, margin: "0px 0px -10% 0px" } })}
            transition={{
              delay: baseDelay + i * 0.08,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ================================ REVEAL CHARS ================================ */

function RevealChars({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const chars = text.split("");
  return (
    <span>
      {chars.map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ perspective: "200px" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "120%", rotateX: -80, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: baseDelay + i * 0.035,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ================================ COUNTER NUM ================================ */

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

/* =================================== HERO =================================== */

function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("hello@webroco.xyz");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollIndicatorOpacity(Math.max(0, 1 - v * 4));
  });

  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("hello@webroco.xyz");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section ref={sectionRef} id="hero" className="relative h-[200vh]">
      {/* Sticky container — pinned for 2x viewport scroll */}
      <div className="sticky top-0 h-screen flex flex-col justify-end overflow-hidden">

        {/* Skip to content (accessibility) */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white">
          Skip to content
        </a>

        {/* ─── CENTER IMAGE ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[65%] h-[75%] mt-8 rounded-2xl overflow-hidden">
            <img src={heroImg} alt="Webroco" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* ─── WEBROCO Logo + Socials ─── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5 md:py-7"
        >
          <a href="/" className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.03em] text-xl md:text-2xl">
            webroco<span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-4 md:gap-6">
            {[
              { name: "LinkedIn", href: "https://linkedin.com" },
              { name: "Instagram", href: "https://instagram.com" },
              { name: "GitHub", href: "https://github.com" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase hover:text-accent transition-colors duration-300 relative group">
                {s.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ─── Bottom Content ─── */}
        <div className="relative z-20 w-full px-5 md:px-10 pb-8 md:pb-12">
          <div className="max-w-[1400px] mx-auto flex items-end justify-between gap-6">
            
            {/* Left: small text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="hidden md:block max-w-[170px] shrink-0"
            >
              <p className="text-[10px] tracking-[0.2em] text-foreground/35 uppercase leading-[1.9]">
                Senior-Level<br />Web Studio.<br />
                <span className="text-foreground/60">That&apos;s Webroco.</span>
              </p>
            </motion.div>

            {/* Center: Headline + CTAs */}
            <div className="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-[clamp(2.5rem,10vw,5rem)] md:text-[5.5vw] lg:text-[4vw]"
              >
                We Build the Web,<br />
                <span className="text-foreground/30">You Own the Results.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-7 flex flex-wrap items-center justify-center gap-3"
              >
                <a href="mailto:hello@webroco.xyz" className="group relative inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-sm font-semibold overflow-hidden transition-transform hover:scale-[1.03]">
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-0.5 transition-transform"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="absolute inset-0 bg-foreground translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                </a>
                <a href="/about" className="inline-flex items-center h-12 px-7 rounded-full border border-foreground/25 text-sm font-medium text-foreground/70 hover:text-foreground hover:border-foreground/50 transition-all duration-300">
                  About Us
                </a>
              </motion.div>
            </div>

            {/* Right: description + email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden lg:block max-w-[230px] shrink-0 text-right"
            >
              <p className="text-[12px] leading-[1.7] text-foreground/45">
                Full-stack web development, SEO & UI/UX design that drive growth, performance, and real results.
              </p>
              <button
                onClick={copyEmail}
                aria-label={emailCopied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                className="mt-3 text-[10px] tracking-[0.15em] text-foreground/35 uppercase hover:text-accent transition-colors cursor-pointer"
              >
                {emailCopied ? "Copied!" : "hello@webroco.xyz"}
              </button>
            </motion.div>
          </div>
        </div>

        {/* ─── Stats Cards (absolute — scroll away with hero, not fixed) ─── */}
        <div className="absolute top-1/2 right-[5%] xl:right-[8%] -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-foreground/[0.05] backdrop-blur-md border border-foreground/[0.08] rounded-xl p-5 min-w-[160px]"
          >
            <div className="flex items-end gap-6">
              <div>
                <div className="text-3xl font-extrabold tracking-tight">11+</div>
                <div className="text-[9px] tracking-[0.2em] text-foreground/35 uppercase mt-0.5">Projects</div>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight">8+</div>
                <div className="text-[9px] tracking-[0.2em] text-foreground/35 uppercase mt-0.5">Years</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="bg-foreground/[0.05] backdrop-blur-md border border-foreground/[0.08] rounded-xl p-4 min-w-[110px]"
          >
            <div className="flex flex-col gap-1.5">
              {["Creative", "Reliable", "Strategist", "Builder", "Efficient"].map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 + i * 0.06, duration: 0.4 }} className="text-[10px] tracking-[0.15em] text-foreground/40 uppercase">{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Scroll Indicator (fades on scroll) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.35em] text-foreground/25 uppercase">Scroll</span>
          <div className="w-px h-10 relative overflow-hidden">
            <motion.span
              className="absolute top-0 left-0 w-full bg-foreground/30"
              animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ============================ PARTNER MARQUEE ============================ */

const PARTNERS = ["dokey.", "SendGrid", "pingdom", "miro", "webflow", "Voiceflow", "monday", "Notion", "Slack", "Figma"];

function PartnerMarquee() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="relative py-10 md:py-14 border-t border-white/5 overflow-hidden">
      <p className="text-center text-[11px] tracking-[0.18em] uppercase text-foreground/40 mb-8 md:mb-10">
        Trusted by forward-thinking brands
      </p>
      <div className="relative" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {row.map((l, i) => (
            <span
              key={i}
              className="shrink-0 px-7 md:px-10 h-12 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-base md:text-lg text-foreground/45 font-medium hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== ABOUT SECTION ============================== */

function About() {
  const milestones = [
    { year: "'17", title: "Founded in Pakistan", desc: "Webroco was born out of a passion for building exceptional digital experiences. Starting as a small team with big ambitions, we set out to help brands transform their online presence with clean code and bold design.", tag: "@webroco" },
    { year: "'19", title: "First Major Client", desc: "Landing our first enterprise client was a turning point. We delivered a full-stack e-commerce platform that doubled their online revenue within six months, proving our senior-level execution could compete with any agency.", tag: "@ecommerce" },
    { year: "'21", title: "Expanding Services", desc: "We broadened our expertise into SEO strategy and UI/UX design, offering clients a complete digital solution. This expansion allowed us to take on more complex projects and deliver measurable growth across every channel.", tag: "@seo" },
    { year: "'23", title: "Global Reach", desc: "Our reputation crossed borders. We began working with international clients from the US, UK, and UAE, bringing the same dedicated approach and senior-level craftsmanship to every project regardless of time zone.", tag: "@global" },
    { year: "'25", title: "Present Day", desc: "With 11+ projects delivered and a growing roster of satisfied clients, Webroco continues to push boundaries. We are a senior-level team that treats every project like our own — building, optimizing, and launching with precision.", tag: "@webroco" },
  ];

  return (
    <section data-bg="light" className="relative px-5 md:px-10 py-20 md:py-28 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-[200px_1fr] gap-10 lg:gap-16">
        {/* Left sticky label */}
        <div className="lg:sticky lg:top-28 self-start">
          <span className="text-[11px] tracking-[0.18em] uppercase text-black/40 font-medium">About</span>
          <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-[200px]">
            Since 2017, crafting digital experiences with senior-level execution across development, SEO, and design.
          </p>
        </div>

        {/* Right content */}
        <div>
          {/* Heading */}
          <h2 className="font-['Instrument_Sans',sans-serif] font-normal text-[5vw] md:text-[3.2vw] leading-[1.08] tracking-[-0.02em] max-w-4xl mb-10 md:mb-14">
            <RevealWords text="Our Journey (&) What We Do" />
          </h2>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed text-black/55 max-w-2xl mb-14 md:mb-20"
          >
            Founded in 2017 in Pakistan, Webroco is a full-stack web development agency that delivers senior-level execution across development, SEO, and UI/UX design. We help brands build digital experiences that perform.
          </motion.p>

          {/* Timeline — text only */}
          <div className="relative">
            <div className="absolute left-[18px] md:left-[20px] top-0 bottom-0 w-px bg-black/10" />

            <div className="space-y-10 md:space-y-14">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-10 md:pl-12"
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-[12px] top-1.5 w-[10px] h-[10px] rounded-full bg-[#6d5dfc] ring-4 ring-[#6d5dfc]/15" />

                  {/* Year + Title */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <span className="font-['Instrument_Sans',sans-serif] text-[2.5rem] md:text-[3rem] leading-none font-bold tracking-[-0.04em] text-black/[0.08]">
                      {m.year}
                    </span>
                    <h3 className="font-['Instrument_Sans',sans-serif] text-xl md:text-2xl font-semibold tracking-tight text-black/85">
                      {m.title}
                    </h3>
                    <span className="text-[10px] tracking-wider uppercase text-[#6d5dfc]/60 font-medium">
                      {m.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base leading-relaxed text-black/50 max-w-2xl">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== STATS COUNTER ============================== */

function StatsCounter() {
  const stats = [
    { label: "Projects Delivered", value: 11, suffix: "+" },
    { label: "Years Experience", value: 8, suffix: "+" },
    { label: "Clients Worldwide", value: 170, suffix: "+" },
    { label: "Client Satisfaction", value: 95, suffix: "%" },
  ];

  return (
    <section className="relative px-5 md:px-10 py-16 md:py-20 border-t border-b border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:border-r lg:last:border-r-0 border-white/10 last:border-r-0"
          >
            <div className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-accent">
              <CounterNum to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-foreground/40">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================================ WORK SECTION ================================ */

const WORK = [
  { title: "E-Commerce Platform", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[16/10]", featured: true },
  { title: "SaaS Dashboard", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "AI Landing Page", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "Corporate Rebrand", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "SEO Campaign", year: "2025", cat: "SEO", img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "Mobile App UI", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "Marketing Site", year: "2025", cat: "Development", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
  { title: "Brand Identity", year: "2025", cat: "Design", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80", ratio: "aspect-[4/3]", featured: false },
];

function Work() {
  const featured = WORK.filter((w) => w.featured);
  const rest = WORK.filter((w) => !w.featured);

  return (
    <section data-bg="dark" className="relative px-5 md:px-10 py-16 md:py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-foreground/50 font-medium">Selected Work</span>
          <a href="/portfolio" className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-foreground/50 font-medium hover:text-foreground transition-colors duration-300">
            View All →
          </a>
        </div>

        {/* Featured item — full width */}
        {featured.map((w) => (
          <motion.a
            key={w.title}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group block mb-8 md:mb-12"
          >
            <div className={`relative overflow-hidden rounded-2xl ${w.ratio} bg-white/5`}>
              <img src={w.img} alt={w.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wider mb-2.5">{w.cat}</span>
                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">{w.title}</h3>
                <p className="text-white/50 text-sm mt-1">{w.year}</p>
              </div>
            </div>
          </motion.a>
        ))}

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {rest.map((w, i) => (
            <WorkCard key={w.title} w={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, index }: { w: typeof WORK[number]; index: number }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group block"
    >
      <div className={`relative overflow-hidden rounded-2xl ${w.ratio} bg-white/5`}>
        <img src={w.img} alt={w.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wider mb-2.5">{w.cat}</span>
          <h3 className="text-white text-lg md:text-xl font-semibold tracking-tight leading-tight">{w.title}</h3>
          <p className="text-white/50 text-sm mt-1">{w.year}</p>
        </div>
      </div>
    </motion.a>
  );
}

/* ================================ SERVICES ================================ */

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const capabilities = [
    { num: "01", title: "Web Development", description: "Full-stack React, Next.js, and TanStack Start applications built for scale and speed.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { num: "02", title: "UI/UX Design", description: "User-centered design systems and interfaces that feel intuitive and look premium.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
    { num: "03", title: "SEO & Growth", description: "Technical SEO, Core Web Vitals optimization, and content strategy that drives organic traffic.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { num: "04", title: "Brand Identity", description: "Logo systems, visual guidelines, and brand strategy that make you memorable.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
    { num: "05", title: "E-Commerce", description: "Shopify builds, custom stores, and payment integrations that convert browsers into buyers.", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
    { num: "06", title: "Performance", description: "Speed optimization, monitoring, and analytics that keep your site lightning fast.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  ];

  return (
    <section ref={sectionRef} className="relative px-5 md:px-10 py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[2px] bg-[var(--primary)]" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--muted-foreground)]">What We Offer</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[5vw] md:text-[3.2vw] leading-[1.08] tracking-[-0.02em] max-w-4xl mb-6 md:mb-8"
        >
          <RevealWords text="Our Capabilities" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground/45 text-base md:text-lg leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          From pixel-perfect design to production-grade code, we deliver end-to-end digital solutions that drive real business results.
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07 }}
              className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-[var(--primary)]/30 rounded-2xl p-7 md:p-8 transition-all duration-500 cursor-default"
            >
              {/* Number */}
              <span className="text-[var(--primary)] font-['Sequel_Sans_Roman_Body','Instrument_Sans',sans-serif] text-2xl md:text-3xl font-light tracking-[-0.03em] block mb-4">
                {cap.num}
              </span>

              {/* Icon */}
              <div className="mb-4">
                <svg className="w-6 h-6 text-foreground/20 group-hover:text-[var(--primary)]/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={cap.icon} />
                </svg>
              </div>

              {/* Title */}
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg md:text-xl font-medium tracking-[-0.01em] mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/40 text-sm leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== TESTIMONIALS ============================== */

const TESTIMONIALS = [
  {
    quote: "Webroco transformed our online presence. Strategy, craft and care from kick-off to launch — the results speak for themselves.",
    name: "Jonathan Reed",
    role: "CEO",
    company: "Northwind",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    featured: true,
  },
  {
    quote: "A rare team that pairs taste with execution. Every shipped pixel felt considered and perfectly aligned with our brand.",
    name: "Amelia Chen",
    role: "Head of Design",
    company: "Lumen",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "Senior-level partners — not vendors. They challenged our assumptions, then delivered beyond the brief.",
    name: "Marcus Hollis",
    role: "Founder",
    company: "Northshore",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote: "The attention to detail and strategic thinking elevated our entire digital experience. Highly recommend.",
    name: "Sarah Kim",
    role: "CTO",
    company: "Elevate",
    companyUrl: "#",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

function Testimonials() {
  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section data-bg="light" className="relative px-5 md:px-10 py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[11px] tracking-[0.18em] uppercase text-black/40 font-medium">Testimonials</span>
          <div className="w-12 h-px bg-black/10" />
        </motion.div>

        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[5vw] md:text-[3.2vw] leading-[1.08] tracking-[-0.02em] max-w-4xl mb-12 md:mb-16">
          <RevealWords text="What Our Clients Say" />
        </h2>

        {/* Featured testimonial — large */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 mb-8 md:mb-12 pb-10 md:pb-14 border-b border-black/8"
        >
          <div>
            <div className="text-5xl md:text-6xl leading-none text-[#6d5dfc]/20 font-serif mb-6 select-none">&ldquo;</div>
            <blockquote className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-black/80 font-light max-w-3xl">
              {featured.quote}
            </blockquote>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-4">
              <img src={featured.photo} alt={featured.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-black/10" loading="lazy" />
              <div>
                <div className="text-sm font-semibold text-black/90">{featured.name}</div>
                <div className="text-xs text-black/45">{featured.role}, <span className="underline decoration-black/20 underline-offset-2">{featured.company}</span></div>
              </div>
            </div>
            <div className="flex gap-0.5 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#6d5dfc]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
          </div>
        </motion.figure>

        {/* Smaller testimonials — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {rest.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 md:p-7 bg-black/[0.02] hover:bg-black/[0.04] transition-colors duration-500"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#6d5dfc]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <blockquote className="text-base md:text-lg leading-relaxed text-black/70 mb-6 font-light">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-black/8" loading="lazy" />
                <div>
                  <div className="text-sm font-semibold text-black/85">{t.name}</div>
                  <div className="text-xs text-black/40">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================= TEAM ================================= */

const TEAM = [
  { name: "Moazzam Ali", role: "Founder & Lead Developer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Sarah Chen", role: "Lead Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
  { name: "Alex Rivera", role: "SEO Specialist", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80" },
  { name: "Jordan Park", role: "Project Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" },
];

function Team() {
  return (
    <section className="relative px-5 md:px-10 py-20 md:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 mb-12 md:mb-16 items-end">
          <div>
            <span className="text-[11px] tracking-[0.18em] uppercase text-foreground/40 font-medium">Team</span>
            <p className="mt-3 text-sm text-foreground/45 leading-relaxed max-w-xs">
              A skilled and talented team behind the creativity and your digital craft.
            </p>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[5vw] md:text-[3vw] leading-[1.08] tracking-[-0.02em]">
            <RevealWords text="Meet the talented squad behind the creativity" />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default"
            >
              {/* Glass card with photo */}
              <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-base md:text-lg font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">{m.name}</h3>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] tracking-[0.1em] uppercase text-foreground/45">
                {m.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================ BIG CTA ================================ */

function BigCTA() {
  return (
    <section className="relative px-5 md:px-10 py-32 md:py-48 border-t border-white/5 overflow-hidden text-center">
      <div className="max-w-[900px] mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.04em] text-[8vw] md:text-[5vw] leading-[0.95]"
        >
          Ready to build<br />something exceptional?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 md:mt-8 text-foreground/50 text-base md:text-lg leading-relaxed max-w-lg mx-auto"
        >
          We&apos;re a senior-level team that treats every project like our own — building, optimizing, and launching with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="mailto:hello@webroco.xyz" className="group relative inline-flex items-center gap-2 h-12 px-8 rounded-full bg-accent text-accent-foreground text-sm font-medium overflow-hidden transition-transform hover:scale-[1.03]">
            <span className="relative z-10">Start a Project</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-0.5 transition-transform"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="absolute inset-0 bg-foreground translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a href="/portfolio" className="inline-flex items-center h-12 px-7 rounded-full border border-foreground/15 text-foreground/65 text-sm font-medium hover:text-foreground hover:border-foreground/35 transition-all duration-300">
            View Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
