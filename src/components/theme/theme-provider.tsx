'use client';

import { useEffect,useState } from 'react';
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="opacity-0 fixed inset-0 bg-background" />; // Prevents flicker
  }
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
