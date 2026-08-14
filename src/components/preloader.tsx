"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
              webroco
            </div>
            <div className="text-[10px] font-mono tracking-[0.5em] text-foreground/40 mb-12">
              X · Y · Z
            </div>
            <div className="w-48 h-px bg-foreground/10 mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-foreground/60"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-4 text-xs font-mono text-foreground/30">
              {Math.min(Math.round(progress), 100)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
