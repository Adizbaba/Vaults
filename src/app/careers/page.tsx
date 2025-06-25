
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Users, Sparkles, Coffee, Heart } from 'lucide-react';

const jobOpenings = [
  { id: 1, title: 'Senior Frontend Engineer', location: 'Remote / Innovation City', department: 'Engineering', type: 'Full-time', aiHint: "software engineer job" },
  { id: 2, title: 'Product Manager - Mobile Banking', location: 'Innovation City', department: 'Product', type: 'Full-time', aiHint: "product manager job" },
  { id: 3, title: 'Cybersecurity Analyst', location: 'Innovation City', department: 'Security', type: 'Full-time', aiHint: "cybersecurity job" },
  { id: 4, title: 'Customer Success Specialist', location: 'Remote', department: 'Support', type: 'Full-time', aiHint: "customer support job" },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <section id="hero-careers" className="text-center py-16 bg-muted rounded-lg shadow-inner mb-16">
          <Briefcase className="mx-auto h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Shape the Future of Finance
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Join VaultbyChase and be part of a passionate team dedicated to building innovative financial solutions that empower people worldwide.
          </p>
          <Button size="lg" asChild className="mt-8 shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transform duration-300 px-8 py-6 text-base font-semibold">
            <Link href="#open-positions">View Open Positions</Link>
          </Button>
        </section>

        <section id="why-work-here" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">Why VaultbyChase?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <Sparkles className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl text-secondary">Innovate & Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Work on cutting-edge projects that redefine banking. Your contributions will directly impact millions of users.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <Users className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl text-secondary">Collaborative Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Join a diverse and inclusive team that values collaboration, continuous learning, and mutual respect.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <Coffee className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl text-secondary">Growth & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">We invest in your growth with competitive salaries, comprehensive benefits, and opportunities for professional development.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section id="culture-image" className="mb-16">
            <Image
                src="https://res.cloudinary.com/dse63uv5p/image/upload/v1750884140/steptodown.com790820_frpmac.jpg"
                alt="A professional working on a laptop, representing a career at VaultbyChase"
                width={1200}
                height={500}
                className="rounded-lg shadow-xl object-cover w-full"
            />
        </section>


        <section id="open-positions" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center text-secondary mb-10">Current Openings</h2>
          {jobOpenings.length > 0 ? (
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <CardTitle className="text-xl text-primary">{job.title}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {job.department} &bull; {job.location} &bull; {job.type}
                            </CardDescription>
                        </div>
                        <Button asChild className="mt-3 sm:mt-0">
                            <Link href={`/careers/apply?jobId=${job.id}`}>Apply Now</Link>
                        </Button>
                    </div>
                  </CardHeader>
                  {/* Optional: Add short job description here if needed 
                  <CardContent>
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      We are looking for a talented {job.title.toLowerCase()} to join our {job.department.toLowerCase()} team. If you are passionate about technology and finance, this is the role for you...
                    </p>
                  </CardContent>
                  */}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              We currently don't have any open positions, but we're always looking for talented individuals. 
              Feel free to <Link href="/contact" className="text-primary hover:underline">get in touch</Link>!
            </p>
          )}
        </section>

        <section id="employee-perks" className="py-12 bg-muted rounded-lg shadow-inner text-center">
            <Heart className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-6">Perks & Benefits</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
                We care about our team. VaultbyChase offers a comprehensive benefits package designed to support your well-being and professional growth.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
                <div className="p-3 bg-background rounded shadow">Comprehensive Health Insurance</div>
                <div className="p-3 bg-background rounded shadow">Generous Paid Time Off</div>
                <div className="p-3 bg-background rounded shadow">401(k) Matching</div>
                <div className="p-3 bg-background rounded shadow">Wellness Programs</div>
                <div className="p-3 bg-background rounded shadow">Parental Leave</div>
                <div className="p-3 bg-background rounded shadow">Professional Development Budget</div>
                <div className="p-3 bg-background rounded shadow">Flexible Work Arrangements</div>
                <div className="p-3 bg-background rounded shadow">Team Events & Activities</div>
            </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
