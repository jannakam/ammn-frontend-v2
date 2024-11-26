"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children, ...props }) {
  const pathname = usePathname();
  const disableTransitionOnChange = pathname === "/";
  return <NextThemesProvider {...props} disableTransitionOnChange={disableTransitionOnChange}
  >{children}</NextThemesProvider>;
}
