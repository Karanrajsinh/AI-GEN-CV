"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
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
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div className={cn("relative block md:hidden", className)}>
      <div className="absolute bottom-0 right-0 flex flex-col gap-2 p-2">
        {items.map((item) => (
          <motion.div
            key={item.title}
            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
          >
            <Link href={item.href}>
              <div className="h-5 w-5">{item.icon}</div>
            </Link>
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
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto hidden md:flex flex-col gap-4 items-center bg-gray-50 dark:bg-neutral-900 px-4 py-3",
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
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ translateX: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-12 w-12 bg-gray-900 dark:bg-neutral-800 flex items-center justify-center rounded-full"
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
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
            className="absolute px-2 py-1 bg-gray-100 text-xs text-gray-900 rounded-md dark:bg-neutral-800 dark:text-white left-full ml-2 whitespace-nowrap"
          >
            {title}
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}
