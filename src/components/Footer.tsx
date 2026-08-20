import { Link } from "@tanstack/react-router";

const QUICK_NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/service" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "Web Development", to: "/service" },
  { label: "UI/UX Design", to: "/service" },
  { label: "SEO & Growth", to: "/service" },
  { label: "E-Commerce", to: "/service" },
  { label: "Brand Identity", to: "/service" },
];

const COMPANY = [
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const CONNECT = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-10 pt-16 md:pt-20 pb-6 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">

        {/* ─── Tier 1: Brand + CTA + Quick Nav ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-8 mb-14 md:mb-16">
          <div className="shrink-0">
            <Link to="/" className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold uppercase tracking-[-0.03em] text-[6vw] md:text-[4vw] leading-none">
              webroco<span className="text-accent">.</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 md:gap-14">
            <a href="mailto:hello@webroco.xyz" className="text-lg md:text-xl text-foreground/70 hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/15 hover:decoration-accent/50 shrink-0">
              hello@webroco.xyz
            </a>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {QUICK_NAV.map((l) => (
                <Link key={l.label} to={l.to} className="text-sm text-foreground/40 hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ─── Tier 2: Info Columns ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-14 pt-8 border-t border-white/5">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-4">Services</h4>
            <ul className="flex flex-col gap-2 list-none">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-foreground/45 hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-4">Company</h4>
            <ul className="flex flex-col gap-2 list-none">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-foreground/45 hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-4">Connect</h4>
            <ul className="flex flex-col gap-2 list-none">
              {CONNECT.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-foreground/45 hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Tier 3: Bottom Bar ─── */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-foreground/30">
          <span>&copy; {new Date().getFullYear()} Webroco. All rights reserved.</span>
          <span>Crafted in Pakistan 🇵🇰</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:bg-foreground hover:text-background transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
