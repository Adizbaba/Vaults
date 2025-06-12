
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search, Edit2, Rss } from 'lucide-react';
import { format } from 'date-fns';

const blogPosts = [
  { id: 1, title: "Understanding Compound Interest: Your Key to Wealth", date: "2024-07-28", category: "Personal Finance", summary: "Dive deep into how compound interest works and how you can make it work for you.", imageHint: "compound interest graph", slug: "understanding-compound-interest" },
  { id: 2, title: "Top 5 Security Tips for Online Banking in 2024", date: "2024-07-22", category: "Security", summary: "Protect your financial information with these essential online banking security practices.", imageHint: "online banking security", slug: "top-5-security-tips" },
  { id: 3, title: "The Future of FinTech: Trends to Watch", date: "2024-07-15", category: "Technology", summary: "Explore the exciting advancements shaping the future of financial technology.", imageHint: "fintech technology future", slug: "future-of-fintech" },
  { id: 4, title: "Budgeting 101: A Beginner's Guide to Managing Your Money", date: "2024-07-08", category: "Personal Finance", summary: "Learn the fundamentals of budgeting and take control of your finances with simple, effective strategies.", imageHint: "budgeting planning money", slug: "budgeting-101-guide" },
  { id: 5, title: "How AI is Revolutionizing Loan Applications", date: "2024-07-01", category: "Technology", summary: "Discover how artificial intelligence is streamlining the loan application process for faster, fairer decisions.", imageHint: "AI loan application", slug: "ai-loan-applications" },
  { id: 6, title: "Investing for Millennials: Where to Start?", date: "2024-06-24", category: "Investing", summary: "A comprehensive guide for millennials looking to start their investment journey and build long-term wealth.", imageHint: "millennial investing chart", slug: "investing-for-millennials" },
];

const categories = ["All", "Personal Finance", "Security", "Technology", "Investing", "Company News"];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <section id="hero-blog" className="text-center py-16 bg-muted rounded-lg shadow-inner mb-16">
          <Edit2 className="mx-auto h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            VaultbyChase Insights
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Your source for the latest news, tips, and insights on finance, technology, security, and how to make the most of your money with VaultbyChase.
          </p>
        </section>

        <section id="blog-filters" className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 border rounded-lg bg-card shadow">
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="search" placeholder="Search articles..." className="pl-10 w-full" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section id="blog-posts" className="mb-16">
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 transform">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="overflow-hidden">
                        <Image
                        src={`https://placehold.co/600x400.png`}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="rounded-t-lg object-cover h-56 w-full group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={post.imageHint}
                        />
                    </div>
                  </Link>
                  <CardHeader className="flex-grow">
                    <Link href={`/blog/${post.slug}`}>
                      <CardTitle className="text-xl text-primary group-hover:underline">{post.title}</CardTitle>
                    </Link>
                    <CardDescription className="text-sm text-muted-foreground">
                      {format(new Date(post.date), 'MMMM dd, yyyy')} &bull; {post.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80 text-sm line-clamp-3">{post.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="p-0 h-auto text-primary">
                      <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          )}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">Load More Posts</Button>
          </div>
        </section>

        <section id="subscribe-cta" className="py-16 bg-primary text-primary-foreground rounded-lg shadow-xl text-center">
            <Rss className="mx-auto h-12 w-12 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="max-w-xl mx-auto mb-8 text-primary-foreground/90">
                Subscribe to our newsletter to get the latest articles, financial tips, and VaultbyChase updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-grow bg-primary-foreground/10 border-primary-foreground/30 placeholder:text-primary-foreground/60 text-primary-foreground focus:bg-primary-foreground/20" 
                />
                <Button type="submit" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Subscribe
                </Button>
            </form>
        </section>

      </main>
      <Footer />
    </>
  );
}
