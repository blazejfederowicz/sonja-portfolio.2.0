"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type ZoomProps = {
  source: string;
  alt?: string;
  className?: string;
};

const transition = { type: "spring" as const, damping: 25, stiffness: 120 };

export const Zoom: React.FC<ZoomProps> = ({ source, alt, className }) => {
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const portalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let root = document.getElementById("zoom-portal-root") as HTMLElement | null;
    if (!root) {
      root = document.createElement("div");
      root.id = "zoom-portal-root";
      document.body.appendChild(root);
    }
    portalRootRef.current = root;
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

   useEffect(() => {
    const handleScroll = () => isOpen && setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);


  const portalRoot = portalRootRef.current;

  return (
    <div className="image-container">
      <motion.img
        src={source}
        alt={alt}
        className={className}
        loading="lazy"
        onClick={() => setOpen(true)}
        initial={{ scale: 1 }}
        animate={{ scale: isOpen ? 1.02 : 1 }}
        transition={transition}
        style={{ cursor: "zoom-in" }}
      />

      {mounted && portalRoot &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="zoom-portal-shade"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.25 }}
                  onClick={() => setOpen(false)}
                />
                <motion.img
                  className="zoom-portal-img"
                  src={source}
                  alt={alt}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }} 
                  transition={transition}
                  onClick={() => setOpen(false)}
                />
              </>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </div>
  );
};
