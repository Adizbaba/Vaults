
"use client";

import Image from 'next/image';
import { CheckCircle, Zap, Shield, MessageCircle } from 'lucide-react'; // Added more diverse icons
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

const benefits = [
  { text: "FDIC Insured Deposits up to $250,000", icon: Shield },
  { text: "Zero Hidden Fees & Transparent Pricing", icon: CheckCircle },
  { text: "Lightning-Fast Transactions & Mobile Deposits", icon: Zap },
  { text: "24/7 Human & AI Powered Customer Support", icon: MessageCircle },
];

export function WhyVaultbyChase() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.4 });
  const { ref: textContentRef, isInView: textContentInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="why-vaultbychase" className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Why Choose VaultbyChase?
          </h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-2xl mx-auto">
            Experience banking that's built around you – secure, intelligent, and always accessible. We're not just a bank; we're your financial partner.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <div
            ref={textContentRef}
            className={cn(
              "space-y-8 opacity-0 transform -translate-x-12 transition-all duration-700 ease-out",
              textContentInView && "opacity-100 translate-x-0 delay-100"
            )}
          >
            <h3 className="text-2xl font-semibold text-secondary md:text-3xl">Your Financial Future, Reimagined</h3>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to providing you with a banking experience that's not only secure and reliable but also intuitive and empowering. VaultbyChase leverages cutting-edge technology to simplify your financial life.
            </p>
            <ul className="space-y-5">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start p-4 bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out opacity-0 transform translate-y-5",
                    textContentInView && `opacity-100 translate-y-0 delay-${200 + index * 150}` // Staggered delay for list items
                  )}
                >
                  <benefit.icon className="h-7 w-7 text-primary mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground font-medium text-base">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            ref={imageRef}
            className={cn(
              "relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-6 opacity-0 transform translate-x-12 transition-all duration-700 ease-out",
              imageInView && "opacity-100 translate-x-0 delay-300"
            )}
          >
            {/* Placeholder for a Lottie animation or dynamic dashboard graphic */}
            <Image
              src="https://res.cloudinary.com/dse63uv5p/image/upload/v1749602191/dash_t6p9fc.png"
              alt="VaultbyChase dashboard on a smartphone"
              width={250}
              height={500}
              className="rounded-lg shadow-2xl object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
            />
             {/* To use Lottie: npm install react-lottie-player. Then:
             <div className="w-full h-full">
                <Lottie animationData={yourLottieJson} play loop />
             </div>
             */}
          </div>
        </div>
      </div>
    </section>
  );
}
