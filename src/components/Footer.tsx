import { Link } from "@tanstack/react-router";

const LINK_COLS = [
  {
    h: "Company",
    items: [
      { label: "Agency", to: "/" },
      { label: "Services", to: "/service" },
      { label: "Portfolio", to: "/portfolio" },
      { label: "Contact", to: "mailto:hello@webroco.xyz" },
    ],
  },
  {
    h: "Social",
    items: [
      { label: "LinkedIn", to: "#" },
      { label: "Instagram", to: "#" },
      { label: "Dribbble", to: "#" },
      { label: "Behance", to: "#" },
      { label: "YouTube", to: "#" },
    ],
  },
  {
    h: "Locations",
    items: [
      { label: "Rawalpindi", to: "#" },
      { label: "Islamabad", to: "#" },
      { label: "Dubai", to: "#" },
      { label: "Remote Worldwide", to: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 px-5 md:px-10 pt-16 pb-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-14">
          <div className="shrink-0">
            <Link to="/" className="display text-2xl tracking-tight">
              webroco<span className="text-accent">.</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <p className="max-w-md leading-relaxed">
              Webroco is a startup digital agency of design, development and marketing that works friendly with global clients.
            </p>
            <a href="mailto:hello@webroco.xyz" className="underline underline-offset-4 hover:text-accent transition-colors shrink-0">
              hello@webroco.xyz
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="flex items-center border border-border/60 rounded-full overflow-hidden mb-3"
            >
              <input
                type="email" required placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit" aria-label="Subscribe"
                className="size-10 rounded-full bg-accent text-accent-foreground grid place-items-center mr-1 shrink-0 hover:scale-105 transition-transform"
              >
                &rarr;
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
              By subscribing you agree with our <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
            </p>
          </div>
          {LINK_COLS.map((col) => (
            <div key={col.h}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">{col.h}</h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.to.startsWith("mailto:") ? (
                      <a href={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </a>
                    ) : item.to.startsWith("#") ? (
                      <a href={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <span>&copy; {new Date().getFullYear()} Webroco. All rights reserved.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-foreground hover:text-background transition-colors"
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