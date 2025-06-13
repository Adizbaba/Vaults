
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

export function Hero() {
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageContainerRef, isInView: imageContainerInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3, rootMargin: "-100px 0px" });

  return (
    <section id="home" className="relative bg-gradient-to-br from-muted via-background to-primary/5 py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-50 dark:opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <style jsx>{`
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: -2s;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={textContentRef}
            className={cn(
              "text-center lg:text-left opacity-0 transform translate-y-10 transition-all duration-1000 ease-out lg:col-span-1",
              textContentInView && "opacity-100 translate-y-0"
            )}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Banking Reimagined. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary/80">
                Smart, Secure, Seamless.
              </span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              VaultbyChase empowers you with intelligent financial tools, bank-grade security, and real-time access to manage your money with confidence, anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transform duration-300 px-8 py-6 text-base font-semibold">
                <Link href="/signup">
                  Open Your Account <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow border-primary/50 text-primary hover:bg-primary/5 hover:scale-105 transform duration-300 px-8 py-6 text-base font-semibold">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4 opacity-80">
              <Link href="#" aria-label="Download on the App Store">
                <Image src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/App_Store_c47thz.png" alt="App Store" width={135} height={40} className="rounded-md hover:opacity-100 transition-opacity filter grayscale-[50%] hover:grayscale-0"/>
              </Link>
              <Link href="#" aria-label="Get it on Google Play">
                <Image src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602189/Google_Play_o4ehxz.png" alt="Google Play" width={135} height={40} className="rounded-md hover:opacity-100 transition-opacity filter grayscale-[50%] hover:grayscale-0"/>
              </Link>
            </div>
          </div>
          <div
            ref={imageContainerRef}
            className={cn(
              "relative flex justify-center items-center mt-12 lg:mt-0 opacity-0 transform scale-90 transition-all duration-1000 ease-out lg:col-span-1",
              imageContainerInView && "opacity-100 scale-100 delay-200"
            )}
          >
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749689624/hero_xzgmvb.png"
                alt="VaultbyChase platform overview"
                width={1200}
                height={800}
                priority
                className="rounded-xl shadow-2xl z-10 transform transition-transform duration-500 hover:scale-105 border-4 border-foreground/5 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
