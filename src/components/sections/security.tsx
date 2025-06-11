
"use client";

import Image from 'next/image';
import { ShieldCheck, Lock, Fingerprint, AlertTriangle, Network } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

const securityFeaturesList = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Encryption",
    description: "Your data is protected with AES-256 bit end-to-end encryption, safeguarding your information in transit and at rest."
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Enhance account security with an extra layer of verification using OTPs or biometric authentication."
  },
  {
    icon: Fingerprint,
    title: "Biometric Access",
    description: "Utilize fingerprint or facial recognition for quick, secure access to your accounts on compatible devices."
  },
  {
    icon: AlertTriangle,
    title: "Real-Time Fraud Alerts",
    description: "Our intelligent systems proactively monitor for suspicious activity 24/7 and notify you instantly."
  },
  {
    icon: Network,
    title: "Secure Network Infrastructure",
    description: "Built on a robust and resilient infrastructure, designed to protect against modern cyber threats."
  }
];

export function Security() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.1 });
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.4 }); // Adjusted threshold for earlier trigger
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2, rootMargin: "-50px 0px" });
  const { ref: featuresRef, isInView: featuresInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="security"
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 overflow-hidden",
        "bg-background text-foreground", // Light mode default
        "dark:bg-background dark:text-primary-foreground" // Dark mode section background (using theme's dark background)
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-16 md:mb-20 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out",
            titleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
            "text-primary", // Light mode title
            "dark:text-primary-foreground" // Dark mode title
            )}
          >
            Your Security, Our Utmost Priority
          </h2>
          <p className={cn(
            "mt-5 text-lg max-w-3xl mx-auto",
            "text-foreground/80", // Light mode description
            "dark:text-primary-foreground/80" // Dark mode description
          )}>
            At VaultbyChase, we employ state-of-the-art security measures to protect your
            information and transactions. Bank with confidence knowing your financial well-
            being is safeguarded by multiple layers of defense.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className={cn(
              "relative h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-xl opacity-0 transform -translate-x-12 transition-all duration-1000 ease-out",
              "bg-muted dark:bg-secondary/20", // Placeholder background for the image container
              imageInView && "opacity-100 translate-x-0 delay-200"
            )}
          >
            <Image
              src="https://placehold.co/600x450.png"
              alt="Abstract cybersecurity visual representing data protection and network security"
              data-ai-hint="abstract security network digital"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            {/* Subtle overlay to blend image if needed */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-30"></div>
          </div>

          {/* Features Column */}
          <ul
            ref={featuresRef}
            className="space-y-5 md:space-y-6"
          >
            {securityFeaturesList.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <li
                  key={index}
                  className={cn(
                    "flex items-start p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out opacity-0 transform translate-y-8",
                    "bg-card dark:bg-secondary", // Card: light=card_bg, dark=secondary_color (e.g. #1c4778)
                    "border border-transparent hover:border-primary/30 dark:hover:border-primary-foreground/20", // Primary is light blue in dark mode
                    "hover:-translate-y-1.5", // Slightly more lift
                    featuresInView && `opacity-100 translate-y-0 delay-${150 + index * 150}`
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-lg mr-4 md:mr-5 flex-shrink-0",
                    "bg-primary/10 dark:bg-primary-foreground/10" // Icon background: Light primary/10, Dark primary-fg/10
                  )}>
                     <IconComponent className={cn(
                       "h-6 w-6 md:h-7 md:w-7",
                       "text-primary dark:text-primary" // Icon color: Light primary, Dark primary (primary in dark is light blue)
                       )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-lg md:text-xl mb-1",
                      "text-secondary dark:text-secondary-foreground" // Title: Light secondary, Dark secondary-fg (white)
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-sm md:text-base leading-relaxed",
                      "text-muted-foreground dark:text-secondary-foreground/70" // Description: Light muted-fg, Dark secondary-fg/70
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
