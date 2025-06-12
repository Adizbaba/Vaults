
"use client";

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, CheckCircle } from 'lucide-react'; // Added CheckCircle for verified
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  avatarFallback: string;
  quote: string;
  rating: number;
  aiHint?: string; // Made optional
  verified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Fintech Startup CEO',
    avatar: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602190/test1_rq02jq.png',
    avatarFallback: 'SC',
    quote: "VaultbyChase has revolutionized how I manage my business finances. The intelligent insights and seamless Zelle® integration are game-changers!",
    rating: 5,
    verified: true,
  },
  {
    name: 'David Miller',
    role: 'Freelance Developer',
    avatar: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602190/test2_mv4ydt.png',
    avatarFallback: 'DM',
    quote: "The mobile app is incredibly intuitive, and the multi-layered security features give me complete peace of mind. Highly recommended for modern banking.",
    rating: 5,
  },
  {
    name: 'Linda Rodriguez',
    role: 'E-commerce Entrepreneur',
    avatar: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1749602192/test3_md1v2w.png',
    avatarFallback: 'LR',
    quote: "Managing investments and transferring funds has never been this easy or secure. VaultbyChase offers top-notch service and a truly digital-first experience.",
    rating: 5,
    verified: true,
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const { ref, isInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transform translate-y-10 transition-all duration-700 ease-out',
        isInView && 'opacity-100 translate-y-0',
        `delay-${index * 150}`
      )}
    >
      <Card className="shadow-xl hover:shadow-2xl border border-border/20 transition-all duration-300 bg-card h-full flex flex-col rounded-xl overflow-hidden">
        <CardContent className="pt-8 px-6 pb-6 flex-grow">
          <div className="flex mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/20'}`} />
            ))}
          </div>
          <blockquote className="text-foreground/90 italic text-base leading-relaxed mb-6">
            "{testimonial.quote}"
          </blockquote>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 border-t border-border/20">
          <div className="flex items-center">
            <Avatar className="h-14 w-14 mr-4 border-2 border-primary/30 shadow-sm">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
              <AvatarFallback className="text-lg">{testimonial.avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg text-secondary">{testimonial.name}</p>
              <div className="flex items-center">
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                {testimonial.verified && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export function Testimonials() {
  const { ref: sectionTitleRef, isInView: sectionTitleInView } = useInViewAnimation({ triggerOnce: true, threshold: 0.4 });

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={sectionTitleRef}
          className={cn(
            "text-center mb-16 opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
            sectionTitleInView && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
            Trusted by Innovators & Professionals
          </h2>
          <p className="mt-5 text-lg text-foreground/80 max-w-xl mx-auto">
            Hear what our satisfied customers are saying about their VaultbyChase experience.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
