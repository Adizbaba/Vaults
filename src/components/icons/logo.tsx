import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  height: number; // Explicit height is required
  alt?: string;
  priority?: boolean;
}

const LOGO_URL = "https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/lightmode_u0v8oq.png";
const ASPECT_RATIO = 150 / 36; // Aspect ratio based on a common desired proportion for logos like this

export function Logo({
  className,
  height,
  alt = "VaultbyChase Logo",
  priority = false, // Default to false, can be overridden
}: LogoProps) {
  const width = Math.round(height * ASPECT_RATIO);
  return (
    <Image
      src={LOGO_URL}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      priority={priority}
    />
  );
}
