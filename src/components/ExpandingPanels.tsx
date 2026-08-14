import { useState } from "react";
import { motion } from "framer-motion";

export interface PanelItem {
  title: string;
  image: string;
  year?: string;
}

const DEFAULT_ITEMS: PanelItem[] = [
  { title: "Velvet ® Dreams Studio", image: "https://skiper-ui.com/images/lummi/imgp3.png" },
  { title: "Neon Pulse ® Agency", image: "https://skiper-ui.com/images/lummi/illstration15.png" },
  { title: "Midnight Canvas", image: "https://skiper-ui.com/images/lummi/img32.png" },
  { title: "Echo Digital Lab", image: "https://skiper-ui.com/images/lummi/img27.png" },
  { title: "Skiper Creative ® Co", image: "https://skiper-ui.com/skiperv1/common/img5.webp" },
  { title: "Cosmic Brew Studios", image: "https://skiper-ui.com/images/lummi/illstration12.png" },
  { title: "Horizon Typography", image: "https://skiper-ui.com/images/lummi/illstration13.png" },
  { title: "Waves & ® Motion", image: "https://skiper-ui.com/skiperv1/common/img8.webp" },
  { title: "Stellar Workshop", image: "https://skiper-ui.com/images/lummi/illstration9.png" },
  { title: "Prism ® Media House", image: "https://skiper-ui.com/images/lummi/img17.png" },
  { title: "Aurora Design Co ™", image: "https://skiper-ui.com/images/lummi/illstration5.png" },
  { title: "Flux Interactive", image: "https://skiper-ui.com/images/lummi/img12.png" },
  { title: "Ember Creative Lab ™", image: "https://skiper-ui.com/images/lummi/illstration3.png" },
  { title: "Zenith Brand Studio", image: "https://skiper-ui.com/images/lummi/img15.png" },
  { title: "Quantum Visual Arts", image: "https://skiper-ui.com/images/lummi/img21.png" },
  { title: "Quantum Visual Arts", image: "https://skiper-ui.com/images/lummi/img8.png", year: "2022—2023" },
  { title: "Quantum Visual Arts", image: "https://skiper-ui.com/images/lummi/img1.png" },
];

export function ExpandingPanels({
  items = DEFAULT_ITEMS,
  defaultIndex = 15,
}: {
  items?: PanelItem[];
  defaultIndex?: number;
}) {
  const [active, setActive] = useState<number>(defaultIndex);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={i}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className="relative h-full cursor-pointer border-r border-border/40 overflow-hidden"
            animate={{ flex: isActive ? 14 : 1 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Image */}
            <motion.img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              draggable={false}
            />
            {/* Dark overlay when inactive (subtle gradient) */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

            {/* Vertical title bottom-left */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 pointer-events-none">
              <span
                className={`whitespace-nowrap text-sm tracking-tight transition-colors duration-500 ${
                  isActive ? "text-foreground" : "text-foreground/40"
                }`}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {item.title}
              </span>
            </div>

            {/* Year top */}
            {item.year && (
              <motion.span
                className="absolute top-6 left-1/2 -translate-x-1/2 text-sm text-foreground whitespace-nowrap pointer-events-none"
                style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {item.year}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
