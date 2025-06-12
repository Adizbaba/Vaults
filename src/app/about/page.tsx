
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Target, Eye, Briefcase, Building } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <section id="hero-about" className="text-center py-16 bg-muted rounded-lg shadow-inner mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            About VaultbyChase
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of finance by empowering individuals and businesses with intelligent, secure, and accessible financial solutions.
          </p>
        </section>

        <section id="our-story" className="mb-16">
          <Card className="shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt="VaultbyChase team collaborating in a modern office"
                  width={800}
                  height={600}
                  className="object-cover h-full w-full"
                  data-ai-hint="team collaboration office"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl text-secondary mb-2">Our Journey</CardTitle>
                  <CardDescription className="text-md text-muted-foreground">
                    Founded on the principles of innovation and customer-centricity, VaultbyChase began with a vision to demystify finance and make sophisticated banking tools available to everyone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    From our humble beginnings, we've grown into a trusted financial partner for thousands, constantly evolving to meet the dynamic needs of the digital age. We believe in leveraging technology not just for convenience, but to build a more inclusive and empowering financial ecosystem.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Our commitment is to provide transparent, secure, and forward-thinking financial services that help you achieve your goals, whether personal or professional.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>

        <section id="mission-vision-values" className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-primary"><Target className="mr-2 h-6 w-6" />Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To empower our customers with intelligent, secure, and accessible financial solutions, fostering growth and confidence in their financial future through innovative technology and dedicated support.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-primary"><Eye className="mr-2 h-6 w-6" />Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To be the leading digital-first financial partner, recognized globally for innovation, unwavering trustworthiness, and a steadfast commitment to our customers' long-term success and financial well-being.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-primary"><Briefcase className="mr-2 h-6 w-6" />Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Customer Centricity</li>
                  <li>Integrity & Transparency</li>
                  <li>Innovation & Excellence</li>
                  <li>Security & Reliability</li>
                  <li>Community Focus</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="meet-the-team" className="text-center py-12 bg-muted rounded-lg shadow-inner mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Meet the Leadership</h2>
          <p className="text-foreground/80 max-w-xl mx-auto mb-8">
            Our experienced leadership team is dedicated to guiding VaultbyChase towards a future of financial innovation and customer success. (Further details coming soon).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
            {[
              { name: "Alex Johnson", title: "CEO & Founder", hint: "ceo portrait" },
              { name: "Maria Garcia", title: "CTO", hint: "cto portrait"  },
              { name: "David Lee", title: "CFO", hint: "cfo portrait"  },
              { name: "Sophia Chen", title: "COO", hint: "coo portrait"  }
            ].map(member => (
              <div key={member.name}>
                <Image src="https://placehold.co/300x300.png" alt={member.name} width={300} height={300} className="rounded-full mx-auto mb-3 shadow-md" data-ai-hint={member.hint} />
                <h4 className="font-semibold text-secondary">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="company-info" className="text-center py-12">
           <Building className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">VaultbyChase Headquarters</h2>
          <p className="text-foreground/80 max-w-xl mx-auto mb-2">
            123 Finance Avenue, Innovation City, Digital State, 90210
          </p>
          <p className="text-muted-foreground">
            For inquiries, please visit our <Link href="/support" className="text-primary hover:underline">Support Page</Link>.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
