
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, UserCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { auth } from "@/lib/firebase/clientApp"; 
import { signOut, onAuthStateChanged, User } from "firebase/auth"; 
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const [userDisplayName, setUserDisplayName] = useState("User");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setCurrentUser(firebaseUser);
      if (firebaseUser) {
        setUserDisplayName(firebaseUser.displayName?.split(' ')[0] || "User");
        setUserAvatarUrl(firebaseUser.photoURL);
      } else {
        setUserDisplayName("User");
        setUserAvatarUrl(null);
      }
    });

    const handleAvatarUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ photoURL: string | null }>;
      if (customEvent.detail?.photoURL !== undefined) { // Check if photoURL is explicitly passed
        setUserAvatarUrl(customEvent.detail.photoURL);
      } else if (auth.currentUser?.photoURL) { // Fallback to current user's photoURL if not in detail
        setUserAvatarUrl(auth.currentUser.photoURL);
      }
    };
    

    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    
    return () => {
      unsubscribe();
      window.removeEventListener('avatarUpdated', handleAvatarUpdate);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  let title = pageTitle;
  if (!title) {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      title = pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1);
      if (title === "Page") title = "Overview"; 
    } else {
      title = "Dashboard";
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'VC';
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
         <SidebarTrigger />
        </div>
        <h1 className="text-xl font-semibold text-foreground hidden md:block">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggleButton />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full" disabled={isLoggingOut}>
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={userAvatarUrl || "https://res.cloudinary.com/dse63uv5p/image/upload/v1749602191/dash_t6p9fc.png"} 
                  alt={userDisplayName}
                  key={userAvatarUrl || "default-avatar"} 
                />
                <AvatarFallback>{getInitials(userDisplayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild disabled={isLoggingOut}>
              <Link href="/dashboard/profile">
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled={isLoggingOut}>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10" disabled={isLoggingOut}>
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

