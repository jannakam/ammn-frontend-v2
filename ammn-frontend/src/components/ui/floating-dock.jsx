import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.01,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.01 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="h-10 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center"
                >
                  <div className="h-4 w-4 text-foreground dark:text-muted-foreground">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-background dark:bg-background flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-foreground dark:text-muted-foreground" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-muted px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
    let ref = useRef(null);
  
    let distance = useTransform(mouseX, (val) => {
      let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
  
      return val - bounds.x - bounds.width / 2;
    });
  
    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  
    let widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  
    let width = useSpring(widthTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
    let height = useSpring(heightTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
  
    let widthIcon = useSpring(widthIconTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
    let heightIcon = useSpring(heightIconTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
  
    const [hovered, setHovered] = useState(false);
  
    return (
      <Link href={href}>
        <motion.div
          ref={ref}
          style={{ width, height }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center justify-center"
        >
          {/* Background image */}
          <img
            src="/shapes/Sphere-light.png"
            alt={title}
            className="w-full h-full rounded-full object-cover dark:hidden"
            />
            <img
            src="/shapes/Sphere-dark.png"
            alt={title}
            className="w-full h-full rounded-full object-cover hidden dark:block"
            />
  
          {/* Icon on top of the image */}
          <motion.div
            style={{ width: widthIcon, height: heightIcon }}
            className="absolute flex items-center justify-center text-primary dark:text-foreground"
          >
            {icon}
          </motion.div>
  
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                transition={{ duration: 0.00001 }} // Faster transition
                className="px-2 py-0.5 whitespace-pre rounded-md bg-card text-foreground border border-border dark:border-muted-foreground absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    );
  }
  
