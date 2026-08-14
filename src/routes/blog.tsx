import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Webroco" },
      { name: "description", content: "Insights, guides and stories from the Webroco team on web development, design and digital strategy." },
      { property: "og:title", content: "Blog — Webroco" },
      { property: "og:description", content: "Insights, guides and stories from the Webroco team." },
    ],
  }),
  component: BlogPage,
});

const BLOG_POSTS = [
  {
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development: What's Coming in 2026",
    excerpt: "From AI-powered code generation to edge computing, the web landscape is shifting faster than ever. Here's what senior developers need to know.",
    category: "Development",
    author: "Moazzam Ali",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "design-systems-at-scale",
    title: "Building Design Systems That Actually Scale",
    excerpt: "Why most design systems fail and the patterns that make them endure across teams and products.",
    category: "Design",
    author: "Ayesha Khan",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "seo-core-web-vitals",
    title: "Core Web Vitals in 2026: The Complete Optimization Guide",
    excerpt: "LCP, INP, CLS — everything you need to know about Google's ranking factors and how to nail them.",
    category: "SEO",
    author: "Moazzam Ali",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "react-server-components",
    title: "React Server Components: A Practical Deep Dive",
    excerpt: "Server components change everything about how we think about rendering. Here's how to use them right.",
    category: "Development",
    author: "Moazzam Ali",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "brand-identity-startups",
    title: "Brand Identity for Startups: Less Is Always More",
    excerpt: "Why the best startup brands are the simplest — and how to strip your identity down to what matters.",
    category: "Branding",
    author: "Ayesha Khan",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ecommerce-performance",
    title: "E-Commerce Performance: Shaving Seconds Off Your Checkout",
    excerpt: "Every 100ms of latency costs you revenue. Here are the proven techniques to speed up your store.",
    category: "Performance",
    author: "Moazzam Ali",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = ["All", "Development", "Design", "SEO", "Branding", "Performance"];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlogPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <PageTitle />
      <FeaturedPost post={BLOG_POSTS[0]} />
      <BlogGrid posts={BLOG_POSTS.slice(1)} />
      <Footer />
    </main>
  );
}

function PageTitle() {
  return (
    <section className="pt-28 md:pt-36 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <FadeIn>
          <h1 className="display text-[clamp(3rem,10vw,10rem)] leading-[0.85]">Journals</h1>
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturedPost({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <FadeIn>
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Featured</span>
          <h2 className="display text-[clamp(2rem,5vw,5rem)] leading-[0.95] mt-4 max-w-4xl">
            Learn our recent journal
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 md:mt-16">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
              <div className="overflow-hidden rounded-xl aspect-[16/10]">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs tracking-[0.2em] text-accent uppercase mb-4">{post.category}</span>
                <h3 className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground/20" />
                  <span>{post.date}</span>
                </div>
                <div className="mt-8 flex items-center gap-3 text-sm group-hover:text-accent transition-colors">
                  <span>Read article</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function BlogGrid({ posts }: { posts: typeof BLOG_POSTS }) {
  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Category Filter */}
        <FadeIn className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm border transition-all duration-300 ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: typeof BLOG_POSTS[0]; index: number }) {
  return (
    <FadeIn delay={index * 0.08}>
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
        <div className="overflow-hidden rounded-xl aspect-[4/3]">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="mt-5">
          <span className="text-[11px] tracking-[0.2em] text-accent uppercase">{post.category}</span>
          <h3 className="display text-xl md:text-2xl leading-tight mt-2 group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>{post.date}</span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
