import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleize(params.slug)} — Webroco Blog` },
      { name: "description", content: `${titleize(params.slug)} — insights and guides from the Webroco team.` },
      { property: "og:title", content: `${titleize(params.slug)} — Webroco Blog` },
      { property: "og:image", content: `https://picsum.photos/seed/${params.slug}/1200/630` },
    ],
  }),
  component: BlogPostPage,
});

function titleize(slug: string) {
  return slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");
}

const POSTS: Record<string, { category: string; author: string; date: string; content: string[] }> = {
  "future-of-web-development-2026": {
    category: "Development",
    author: "Moazzam Ali",
    date: "June 2026",
    content: [
      "The web development landscape is undergoing a seismic shift. AI-powered tools are no longer novelties — they're becoming integral to how we write, test, and deploy code. But the real revolution isn't just about automation; it's about amplification.",
      "Edge computing has moved from buzzword to baseline. When your code runs milliseconds from your users, the entire architecture conversation changes. We're no longer asking 'how do we scale?' but 'where should this logic live?'",
      "React Server Components have matured from experimental to essential. The mental model shift — thinking about where code runs rather than just how it renders — is reshaping how we architect applications from the ground up.",
      "TypeScript adoption has hit critical mass. It's no longer a choice but a expectation. The ecosystem has evolved to the point where JavaScript-only projects are increasingly rare in professional settings.",
      "The tools are better, the patterns are clearer, and the bar for what constitutes a 'good' web experience keeps rising. The developers who thrive will be those who embrace continuous learning while staying grounded in fundamentals.",
    ],
  },
};

const DEFAULT_POST = {
  category: "Development",
  author: "Moazzam Ali",
  date: "June 2026",
  content: [
    "This is a placeholder blog post. The full content for this article is coming soon. In the meantime, explore our other articles or get in touch to discuss your next project.",
    "At Webroco, we believe in sharing knowledge and insights from our daily work. Every project teaches us something new, and we want to pass those lessons on to you.",
    "Stay tuned for the full article. In the meantime, check out our portfolio or reach out to us for a consultation on your next web project.",
  ],
};

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = POSTS[slug] || DEFAULT_POST;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <section className="pt-28 md:pt-36">
        {/* Hero */}
        <div ref={heroRef} className="max-w-[1600px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase">{post.category}</span>
            <h1 className="display text-[clamp(2rem,6vw,5rem)] leading-[0.95] mt-4 max-w-5xl">
              {titleize(slug)}
            </h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20" />
              <span>{post.date}</span>
            </div>
          </motion.div>

          {/* Feature Image */}
          <motion.div
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="mt-10 md:mt-16 rounded-xl overflow-hidden aspect-[16/8]"
          >
            <img
              src={`https://picsum.photos/seed/${slug}/1600/800`}
              alt={titleize(slug)}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-[900px] mx-auto px-6 md:px-10 mt-16 md:mt-24">
          {post.content.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg leading-relaxed text-foreground/80 mb-8"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Link to="/blog" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-1 transition-transform">
                <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Articles
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
