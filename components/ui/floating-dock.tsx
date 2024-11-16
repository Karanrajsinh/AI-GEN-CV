"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; target: string }[]; // Updated to target
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; target: string }[]; // Updated to target
  className?: string;
}) => {
  return (
    <div className={cn("relative block md:hidden", className)}>
      <div className="absolute bottom-0 right-0 flex flex-col gap-2 p-2">
        {items.map((item) => (
          <motion.div
            key={item.title}
            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
          // Add scroll on click
          >
            <div className="h-5 w-5">{item.icon}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; target: string }[]; // Updated to target
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto hidden xl:flex flex-col gap-4 justify-center items-center bg-gray-50 dark:bg-neutral-900 p-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  );
};

function IconContainer({
  title,
  icon,
  target, // Changed from href to target
}: {
  title: string;
  icon: React.ReactNode;
  target: string; // Changed from href to target
}) {
  const [hovered, setHovered] = useState(false);

  // Function to handle smooth scrolling
  const handleScroll = (target: string) => {
    const scrollArea = document.getElementById('sidebar-scroll')
    const section = document.getElementById(target);
    if (section) {
      const offsetTop = section.offsetTop;
      console.log(offsetTop)
      setTimeout(() => {
        scrollArea?.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }, 100);
    }
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ translateX: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative h-8 w-8 bg-transparent flex items-center justify-center"
      onClick={() => handleScroll(target)}
    // Add scroll on click
    >
      {/* Icon */}
      <motion.div
        className="flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
        onClick={() => handleScroll(target)}
      >
        {icon}
      </motion.div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute px-2 py-1 border border-cyan-600 bg-slate-900 text-[0.7rem] text-white dark:bg-neutral-800 dark:text-white left-full ml-2 whitespace-nowrap"
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
}
