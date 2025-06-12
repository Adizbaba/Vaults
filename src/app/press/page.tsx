
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Download, Mail } from 'lucide-react';
import { format } from 'date-fns';

const pressReleases = [
  { id: 1, title: "VaultbyChase Launches New AI-Powered Financial Advisor Tool", date: "2024-07-15", summary: "Revolutionizing personal finance management with cutting-edge AI insights.", link: "/press/release-ai-advisor", aiHint: "AI finance technology" },
  { id: 2, title: "VaultbyChase Awarded 'Most Innovative Digital Bank 2024'", date: "2024-06-20", summary: "Recognized for excellence in digital banking solutions and customer experience.", link: "/press/release-award-2024", aiHint: "banking award ceremony" },
  { id: 3, title: "New Partnership to Enhance Security for VaultbyChase Customers", date: "2024-05-10", summary: "Collaborating with leading cybersecurity firms to bolster platform security.", link: "/press/release-security-partnership", aiHint: "cybersecurity partnership deal" },
];

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <section id="hero-press" className="text-center py-16 bg-muted rounded-lg shadow-inner mb-16">
          <Newspaper className="mx-auto h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            VaultbyChase Newsroom
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, press releases, and media resources from VaultbyChase.
          </p>
        </section>

        <section id="latest-releases" className="mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-10">Latest Press Releases</h2>
          {pressReleases.length > 0 ? (
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <Card key={release.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary hover:underline">
                      <Link href={release.link}>{release.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Published on: {format(new Date(release.date), 'MMMM dd, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 line-clamp-2">{release.summary}</p>
                  </CardContent>
                  <CardFooter>
                     <Button variant="link" asChild className="p-0 h-auto">
                        <Link href={release.link}>Read Full Release &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No recent press releases.</p>
          )}
          <div className="text-center mt-10">
            <Button variant="outline">View All Press Releases</Button>
          </div>
        </section>

        <section id="media-resources" className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-3xl font-bold text-secondary mb-4">Media Kit & Resources</h2>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                    Access our official logos, brand guidelines, executive bios, and other resources for media use. For specific inquiries or interview requests, please contact our media relations team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                        <Download className="mr-2 h-5 w-5" /> Download Media Kit
                    </Button>
                    <Button variant="outline" size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                        <Link href="mailto:press@vaultbychase.com">
                         <Mail className="mr-2 h-5 w-5" /> Contact Media Relations
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="VaultbyChase brand assets and media kit preview"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="media kit brand"
                />
            </div>
          </div>
        </section>
        
        <section id="contact-info" className="py-12 bg-muted rounded-lg shadow-inner text-center">
            <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-primary mb-3">Media Inquiries</h2>
            <p className="text-foreground/80 mb-1">For all media-related questions, please contact:</p>
            <p className="font-medium text-secondary">The VaultbyChase Communications Team</p>
            <Link href="mailto:press@vaultbychase.com" className="text-primary hover:underline">
                press@vaultbychase.com
            </Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
