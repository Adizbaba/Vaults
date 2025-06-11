
"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, CheckCircle, BarChart2, ShieldCheck } from 'lucide-react'; // Example icons

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  mockupSrc: string;
  mockupAlt: string;
}

const keyFeaturesList: FeatureItem[] = [
  {
    icon: ArrowRightLeft,
    title: 'Instant Transfers',
    description: 'Seamlessly send and receive money with Zelle® and internal transfers, lightning fast.',
    mockupSrc: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602193/transfer_mwpzuk.png', 
    mockupAlt: 'VaultbyChase app transfer screen',
  },
  {
    icon: CheckCircle,
    title: 'Mobile Deposits',
    description: 'Deposit checks anytime, anywhere using your smartphone camera with ease.',
    mockupSrc: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749682909/check_xv21op.png', 
    mockupAlt: 'VaultbyChase app check deposit flow',
  },
  {
    icon: BarChart2,
    title: 'Smart Insights',
    description: 'Understand spending and reach goals with personalized AI-driven analytics.',
    mockupSrc: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602190/smart_awpmgy.png', 
    mockupAlt: 'VaultbyChase app budget/analytics screen',
  },
  {
    icon: ShieldCheck,
    title: 'Fortress Security',
    description: 'Multi-layered security, biometric access, and 24/7 fraud monitoring for your peace of mind.',
    mockupSrc: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602194/sec_kar3vk.png', 
    mockupAlt: 'VaultbyChase app security feature',
  },
];

const FeatureCard = ({ feature, index }: { feature: FeatureItem; index: number }) => {
  const { ref, isInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transform translate-y-10 transition-all duration-700 ease-out group',
        isInView && 'opacity-100 translate-y-0',
        `delay-${index * 150}` // Staggered delay
      )}
    >
      <Card className="shadow-lg hover:shadow-xl hover:border-primary/30 border border-transparent transition-all duration-300 flex flex-col bg-card overflow-hidden h-full group">
        <div className="p-6 bg-muted/50 w-full flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
          <Icon className="w-16 h-16 text-primary mb-4 absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
          <Image 
            src={feature.mockupSrc} 
            alt={feature.mockupAlt} 
            width={150} // Adjusted for smaller mockup inside card
            height={300} // Adjusted
            className="rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300 z-0"
          />
        </div>
        <CardHeader className="pb-3 pt-6">
          <CardTitle className="text-xl font-semibold text-secondary">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export function KeyFeatures() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.5 });
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Features That Empower You
          </h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover a suite of innovative tools designed for modern banking – intuitive, secure, and always at your fingertips.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {keyFeaturesList.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
