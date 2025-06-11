
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function DownloadAppCTA() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3, rootMargin: "-100px 0px" });

  return (
    <section id="download-app" className="py-20 md:py-32 bg-gradient-to-br from-primary via-secondary to-primary/80 text-primary-foreground overflow-hidden relative">
       {/* Subtle animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 mix-blend-overlay">
        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-white/10 rounded-full animate-pulse_slow_cta"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-white/15 rounded-full animate-pulse_slower_cta"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full animate-pulse_slow_cta animation-delay-3000_cta"></div>
      </div>
      <style jsx>{`
        @keyframes pulse_slow_cta { 0%, 100% { opacity: 0.3; transform: scale(0.9) rotate(0deg); } 50% { opacity: 0.6; transform: scale(1.1) rotate(10deg); } }
        @keyframes pulse_slower_cta { 0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); } 50% { opacity: 0.4; transform: scale(0.85) rotate(-10deg); } }
        .animate-pulse_slow_cta { animation: pulse_slow_cta 15s infinite ease-in-out; }
        .animate_pulse_slower_cta { animation: pulse_slower_cta 18s infinite ease-in-out; } /* Corrected class name */
        .animation-delay-3000_cta { animation-delay: -3s; }
      `}</style>
      <div
        ref={sectionRef}
        className={cn(
          "container mx-auto px-4 md:px-6 text-center opacity-0 transform translate-y-12 transition-all duration-1000 ease-out relative z-10",
          sectionInView && "opacity-100 translate-y-0"
        )}
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
          Ready to Elevate Your Banking?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-primary-foreground/90">
          Join thousands of satisfied customers. Download our award-winning app to manage your finances on the go, with cutting-edge security and intelligent tools at your fingertips.
        </p>
        
        <div className="mt-12 mb-10">
          <Button
            size="lg"
            asChild
            className="bg-background text-primary hover:bg-muted/90 transition-all duration-300 shadow-2xl hover:shadow-primary/30 px-10 py-7 text-lg font-semibold hover:scale-105 transform"
          >
            <Link href="/signup">
              Create Your Free Account <ArrowRight className="ml-2 h-5 w-5"/>
            </Link>
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-16">
          <Link href="#" aria-label="Download on the App Store">
            <Image src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/App_Store_c47thz.png" alt="App Store badge" width={180} height={60} className="rounded-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
          </Link>
          <Link href="#" aria-label="Get it on Google Play">
            <Image src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/Google_Play_o4ehxz.png" alt="Google Play badge" width={180} height={60} className="rounded-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300"/>
          </Link>
        </div>
        
        <div
          ref={imageRef}
          className={cn(
            "relative flex justify-center items-end max-w-xs sm:max-w-sm mx-auto opacity-0 transform translate-y-12 transition-all duration-1000 ease-out",
            imageInView && "opacity-100 translate-y-0 delay-300"
          )}
        >
          <Image 
            src="https://placehold.co/320x600.png" 
            alt="VaultbyChase App interface on a smartphone" 
            width={320} 
            height={600} 
            className="rounded-t-[2.5rem] shadow-2xl z-10 border-4 border-black/30"
            data-ai-hint="phone app interface finance dark"
          />
           {/* Placeholder for Lottie Animation: Could be a subtle animation of money or data flowing into the phone. */}
           {/* <div className="absolute -bottom-5 -left-5 w-24 h-24">
             <Image src="https://placehold.co/100x100.png" alt="Lottie CTA Animation" width={100} height={100} data-ai-hint="lottie animation money flow"/>
           </div> */}
        </div>
      </div>
    </section>
  );
}
