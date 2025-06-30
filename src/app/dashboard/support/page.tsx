
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LifeBuoy, MessageSquare, BookOpen, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase/clientApp';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { FaqModal } from '@/components/dashboard/faq-modal';


export default function DashboardSupportPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
        title: "Support Ticket Submitted",
        description: "Thank you! Our team will get back to you within 24 hours.",
    });

    // Reset form fields
    (event.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  const userName = user?.displayName?.split(' ')[0] || 'User';

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
          {isLoading ? (
             <p className="text-muted-foreground">Loading your information...</p>
          ) : (
            <p className="text-muted-foreground">Welcome, {userName}. We're here to help you.</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl text-secondary">Submit a Support Ticket</CardTitle>
              </div>
              <CardDescription>Experiencing an issue? Let us know the details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="general" name="category" disabled={isSubmitting}>
                          <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category"/>
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="transactions">Transaction Issue</SelectItem>
                              <SelectItem value="transfers">Transfer Problem</SelectItem>
                              <SelectItem value="security">Security Concern</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                   <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="E.g., Issue with recent transfer" required disabled={isSubmitting} />
                  </div>
                <div>
                  <Label htmlFor="message">Describe your issue</Label>
                  <Textarea id="message" placeholder="Please provide as much detail as possible..." rows={6} required disabled={isSubmitting} />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                      <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                      </>
                  ) : (
                      "Submit Ticket"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
              <Card className="shadow-lg">
                  <CardHeader>
                      <div className="flex items-center gap-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                          <CardTitle className="text-xl text-secondary">Knowledge Base</CardTitle>
                      </div>
                      <CardDescription>Find answers to common questions yourself.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="mb-4 text-muted-foreground">
                          Our comprehensive FAQ page covers a wide range of topics from account management to security.
                      </p>
                      <Button variant="outline" onClick={() => setIsFaqModalOpen(true)}>
                          Browse FAQs
                      </Button>
                  </CardContent>
              </Card>
               <Card className="shadow-lg">
                  <CardHeader>
                      <div className="flex items-center gap-3">
                          <LifeBuoy className="h-6 w-6 text-primary" />
                          <CardTitle className="text-xl text-secondary">Emergency Contact</CardTitle>
                      </div>
                      <CardDescription>For urgent issues like a lost card or suspected fraud.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">
                          Call us 24/7 at: <strong className="text-foreground">1-800-VAULT-CH</strong>
                      </p>
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
      <FaqModal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)} />
    </>
  );
}
