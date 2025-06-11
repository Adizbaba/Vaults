
"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  height: number; // Explicit height is required
  alt?: string;
  priority?: boolean;
}

const LIGHT_MODE_LOGO_URL = "https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/lightmode_u0v8oq.png";
const DARK_MODE_LOGO_URL = "https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/darkmode_ujcvqe.png";
const ASPECT_RATIO = 150 / 36; // Aspect ratio based on a common desired proportion for logos like this

export function Logo({
  className,
  height,
  alt = "VaultbyChase Logo",
  priority = false,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before relying on resolvedTheme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const width = Math.round(height * ASPECT_RATIO);

  // Determine logo URL based on theme
  // Default to light mode logo if theme is not resolved yet or component not mounted client-side
  const logoUrl = (mounted && resolvedTheme === 'dark') ? DARK_MODE_LOGO_URL : LIGHT_MODE_LOGO_URL;
  
  // If not mounted, you could return a placeholder or the light logo to prevent layout shift.
  // For simplicity and to ensure an image is always rendered, we use the logic above which defaults to light.

  return (
    <Image
      key={logoUrl} // Important: Forces re-render when src changes due to theme switch
      src={logoUrl}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      priority={priority}
    />
  );
}
