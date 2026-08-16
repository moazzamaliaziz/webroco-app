import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "../components/smooth-scroll";
import TargetCursor from "../components/TargetCursor/TargetCursor";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";



function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Webroco — We Build the Web. You Own the Results." },
      { name: "description", content: "Full-stack web development, SEO & UI/UX design that drive growth, performance, and real results. Senior-level execution — no juniors, no outsourcing." },
      { name: "author", content: "Webroco" },
      { property: "og:title", content: "Webroco — Senior-Level Web Studio" },
      { property: "og:description", content: "Full-stack web development, SEO & UI/UX design that drive growth, performance, and real results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@webroco" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


const HERO_NAV = [
  { label: "Home", to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "About", to: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Services", to: "/service", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Portfolio", to: "/portfolio", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Blog", to: "/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { label: "Contact", to: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

function PersistentSidebar() {
  const [pathname, setPathname] = useState("/");
  useEffect(() => {
    setPathname(window.location.pathname);
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-[9998] hidden lg:flex flex-col gap-0.5"
    >
      <div className="absolute inset-0 -inset-x-3 -inset-y-2 bg-foreground/[0.03] backdrop-blur-sm rounded-2xl border border-foreground/[0.06]" />
      {HERO_NAV.map((item, i) => {
        const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
        return (
          <motion.a
            key={item.label}
            href={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
            className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl overflow-hidden z-10"
          >
            <span className={"absolute inset-0 rounded-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 " + (isActive ? "bg-foreground/[0.08] scale-100 opacity-100" : "bg-foreground/[0.06]")} />
            <svg className={"w-3.5 h-3.5 transition-colors duration-300 relative z-10 shrink-0 " + (isActive ? "text-accent" : "text-foreground/35 group-hover:text-accent")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span className="relative overflow-hidden h-[16px] w-[72px] z-10">
              <span className={"block text-[10px] tracking-[0.15em] uppercase transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 " + (isActive ? "text-accent" : "text-foreground/45")}>
                {item.label}
              </span>
              <span className="block absolute top-full left-0 text-[10px] tracking-[0.15em] text-accent uppercase transition-all duration-300 group-hover:top-0">
                {item.label}
              </span>
            </span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PersistentSidebar />
      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} hoverDuration={0.2} cursorColor="#e8452a" cursorColorOnTarget="#ffffff" />
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
