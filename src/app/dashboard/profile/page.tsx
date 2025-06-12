
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3, Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { auth, storage } from '@/lib/firebase/clientApp'; 
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState({
    fullName: "User", 
    email: "user@example.com", 
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    memberSince: new Date().toISOString(), 
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        setUser(prev => ({
          ...prev,
          fullName: firebaseUser.displayName || "User",
          email: firebaseUser.email || "user@example.com",
          memberSince: firebaseUser.metadata.creationTime || new Date().toISOString(),
        }));
        setAvatarPreview(firebaseUser.photoURL);
      } else {
        setCurrentUser(null);
        // Handle logged out state if necessary, e.g., redirect
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentUser) {
      if (file.size > 2 * 1024 * 1024) { // Max 2MB
        toast({
          title: "Image Too Large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a JPG, PNG, GIF, or WEBP image.",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      try {
        const imageRef = storageRef(storage, `avatars/${currentUser.uid}/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        
        await updateProfile(currentUser, { photoURL: downloadURL });
        setAvatarPreview(downloadURL);

        // Dispatch a custom event so the header can update if it's listening
        window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: { photoURL: downloadURL } }));

        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been successfully uploaded.",
        });
      } catch (error: any) {
        console.error("Error uploading avatar:", error);
        let description = "Could not upload your avatar. Please try again.";
        switch (error.code) {
          case 'storage/retry-limit-exceeded':
            description = "Upload failed: The operation timed out. Please check your internet connection and try again. If the problem persists, ensure Firebase Storage is correctly configured.";
            break;
          case 'storage/unauthorized':
            description = "Upload failed: You are not authorized to upload this file. Please check Firebase Storage security rules.";
            break;
          case 'storage/object-not-found': // Should not happen with uploads, but good to cover
            description = "Upload failed: The file path could not be found. This is an unexpected error.";
            break;
          case 'storage/quota-exceeded':
            description = "Upload failed: Firebase Storage quota has been exceeded. Please check your Firebase plan and usage.";
            break;
          case 'storage/canceled':
            description = "Upload canceled. Please try again if this was unintentional.";
            break;
        }
        toast({
          title: "Upload Failed",
          description: description,
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      }
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'VC';
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [id]: value }));
  };

  const handleProfileUpdate = async () => {
    if (!currentUser) {
      toast({ title: "Error", description: "You are not logged in.", variant: "destructive" });
      return;
    }
    setIsUploading(true); // Use same state to disable button
    try {
      if (user.fullName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: user.fullName });
         // Dispatch a custom event so the header can update if it's listening
        window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: { photoURL: currentUser.photoURL } }));
      }
      // In a real app, you'd also send other user data (phone, address) to your backend/database
      // For this example, we're only updating displayName in Firebase Auth.
      // The other fields (phone, address) are only in local state.
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved (Display Name updated in Firebase).",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">View and update your personal information.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary shadow-md">
              <AvatarImage 
                src={avatarPreview || "https://res.cloudinary.com/dse63uv5p/image/upload/v1749602191/dash_t6p9fc.png"} 
                alt={user.fullName}
                key={avatarPreview || "default-avatar"} 
              />
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/png, image/jpeg, image/gif, image/webp"
              style={{ display: 'none' }}
              disabled={isUploading}
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full bg-background hover:bg-muted"
              onClick={handleCameraClick}
              aria-label="Change Avatar"
              disabled={isUploading}
            >
              {isUploading && !fileInputRef.current?.files?.length ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
            </Button>
          </div>
          <CardTitle className="text-2xl text-secondary mt-4">{user.fullName}</CardTitle>
          <CardDescription>Member since {user.memberSince ? format(new Date(user.memberSince), 'MMMM yyyy') : 'N/A'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">Full Name</Label>
              <Input id="fullName" value={user.fullName} onChange={handleInputChange} className="mt-1 text-lg" disabled={isUploading} />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" value={user.email} onChange={handleInputChange} className="mt-1 text-lg" disabled={isUploading || !!currentUser?.email} readOnly={!!currentUser?.email} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone Number</Label>
              <Input id="phone" type="tel" value={user.phone} onChange={handleInputChange} className="mt-1 text-lg" disabled={isUploading}/>
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-muted-foreground">Mailing Address</Label>
              <Input id="address" value={user.address} onChange={handleInputChange} className="mt-1 text-lg" disabled={isUploading}/>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="ml-auto" onClick={handleProfileUpdate} disabled={isUploading}>
            {isUploading && !fileInputRef.current?.files?.length ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Edit3 className="mr-2 h-4 w-4" />}
            {isUploading && !fileInputRef.current?.files?.length ? "Saving..." : "Update Profile"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl text-secondary">Account Activity</CardTitle>
            <CardDescription>Recent login activity and security events.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Last login: {currentUser?.metadata.lastSignInTime ? format(new Date(currentUser.metadata.lastSignInTime), 'PPpp') : 'N/A'}</p>
            <p className="text-muted-foreground mt-2">Password changed: {currentUser?.providerData.some(p => p.providerId === 'password') ? 'Enabled' : 'Using social login'}</p>
            <Button variant="link" className="p-0 h-auto mt-2">View full activity log</Button>
        </CardContent>
      </Card>
    </div>
  );
}

