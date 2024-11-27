import clsx from "clsx";
import Image from "next/image";

export function Logo({inverted = false}) {
  return (
    <div className="z-40">
      <Image
        src="/logo_white.svg"
        alt="hero"
        height={200}
        width={200}
        className={clsx("mx-auto  h-full rounded-2xl object-cover object-left-top ", inverted ? "dark:hidden" : "hidden dark:block" )}
        draggable={false}
      />
      <Image
        src="/logo_black.svg"
        alt="hero"
        height={200}
        width={200}
        className={clsx("mx-auto  h-full rounded-2xl object-cover object-left-top ", inverted ?"hidden dark:block": "dark:hidden" )}
        draggable={false}
      />
    </div>
  );
}
