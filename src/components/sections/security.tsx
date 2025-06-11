
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
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.4 });
  const { ref: imageRef, isInView: imageInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2, rootMargin: "-50px 0px" });
  const { ref: featuresRef, isInView: featuresInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="security"
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 overflow-hidden",
        "bg-background text-foreground",
        "dark:bg-background" // Main section background for dark mode
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
            "text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl",
            "text-primary",
            "dark:text-primary-foreground" // White text in dark mode
            )}
          >
            Your Security, Our Utmost Priority
          </h2>
          <p className={cn(
            "mt-4 text-sm max-w-3xl mx-auto md:text-base", // Reduced font size
            "text-foreground/80",
            "dark:text-primary-foreground/90" // White text (slightly less opacity) in dark mode
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
              "bg-muted dark:bg-secondary/20", // Image container background
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-30"></div>
          </div>

          {/* Features Column */}
          <ul
            ref={featuresRef}
            className="space-y-3 md:space-y-4" // Reduced spacing
          >
            {securityFeaturesList.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <li
                  key={index}
                  className={cn(
                    "flex items-start p-3 md:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out opacity-0 transform translate-y-8", // Reduced padding
                    "bg-card dark:bg-secondary", // Card background
                    "border border-transparent hover:border-primary/30 dark:hover:border-primary-foreground/20",
                    "hover:-translate-y-1",
                    featuresInView && `opacity-100 translate-y-0 delay-${150 + index * 150}`
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg mr-3 md:mr-4 flex-shrink-0", // Reduced padding & margin
                    "bg-primary/10 dark:bg-primary-foreground/10" // Icon container background
                  )}>
                     <IconComponent className={cn(
                       "h-4 w-4 md:h-5 md:w-5", // Reduced icon size
                       "text-primary dark:text-primary-foreground" // Icon color: themed in light, white in dark
                       )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-sm md:text-base mb-0.5", // Reduced font size
                      "text-secondary dark:text-secondary-foreground" // Title color: themed in light, white in dark
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-xs md:text-sm leading-relaxed", // Reduced font size
                      "text-muted-foreground dark:text-secondary-foreground/80" // Description color: themed in light, white (less opacity) in dark
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
