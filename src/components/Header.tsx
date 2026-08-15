import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/service" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 h-16 md:h-20 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-background/90 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="display text-2xl tracking-tight shrink-0">
          webroco<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((l) => {
            const isActive = currentPath === l.to || (l.to !== "/" && currentPath.startsWith(l.to));
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`cursor-target transition-colors relative group ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@webroco.xyz"
            className="cursor-target hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all hover:scale-[1.02]"
          >
            Let's Talk
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="cursor-target size-10 rounded-full border border-border grid place-items-center hover:bg-muted transition-colors"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-4 h-px bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-4 h-px bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:gap-10"
          >
            {NAV_LINKS.map((l, i) => {
              const isActive = currentPath === l.to || (l.to !== "/" && currentPath.startsWith(l.to));
              return (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className={`text-4xl md:text-6xl font-bold tracking-tight transition-colors ${
                      isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}