"use client";

import { useState } from "react";
import { User, Mail, Globe, Lock, Trash2, Camera, Shield, Bell } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("general");

  const menuItems = [
    { id: "general", label: "General Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar Menu */}
        <aside className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium text-sm",
                  activeTab === item.id 
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="space-y-8 animate-fade-in">
          {activeTab === "general" && (
            <>
              {/* Profile Header */}
              <Card className="border-none shadow-sm glass rounded-[32px] overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-4 border-white dark:border-stone-800 shadow-xl">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-4xl font-bold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8" />
                      </button>
                    </div>
                    
                    <div className="text-center md:text-left space-y-2">
                      <h2 className="text-3xl font-bold font-display">{user?.firstName} {user?.lastName}</h2>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                        <Badge variant="secondary" className="bg-muted px-4 py-1 rounded-full">
                          Member since May 2024
                        </Badge>
                        <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-none px-4 py-1 rounded-full">
                          12 Trips Planned
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* General Form */}
              <Card className="border-none shadow-sm glass rounded-[32px]">
                <CardHeader className="px-8 pt-8">
                  <CardTitle className="font-display font-bold text-2xl">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and how others see you.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue={user?.firstName} className="h-12 rounded-2xl bg-muted/50 border-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue={user?.lastName} className="h-12 rounded-2xl bg-muted/50 border-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input id="email" defaultValue={user?.email} className="pl-12 h-12 rounded-2xl bg-muted/50 border-none" disabled />
                    </div>
                    <p className="text-[10px] text-muted-foreground ml-2">Email cannot be changed manually. Contact support for help.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                      <select className="w-full pl-12 pr-4 h-12 rounded-2xl bg-muted/50 border-none text-sm appearance-none outline-none focus:ring-2 focus:ring-brand-primary/20">
                        <option>English (US)</option>
                        <option>Japanese</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-8 pb-8 justify-end">
                  <Button className="rounded-2xl h-12 px-8 bg-brand-primary hover:bg-brand-primary/90">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {activeTab === "security" && (
            <Card className="border-none shadow-sm glass rounded-[32px]">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="font-display font-bold text-2xl">Security Settings</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="h-12 rounded-2xl bg-muted/50 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="h-12 rounded-2xl bg-muted/50 border-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="h-12 rounded-2xl bg-muted/50 border-none" />
                  </div>
                </div>
                
                <Separator />

                <div className="space-y-4 pt-4">
                   <h4 className="font-bold text-destructive flex items-center gap-2">
                     <Trash2 className="h-5 w-5" />
                     Danger Zone
                   </h4>
                   <p className="text-sm text-muted-foreground">
                     Once you delete your account, there is no going back. Please be certain.
                   </p>
                   <Button variant="destructive" className="rounded-2xl h-12 px-6">
                     Delete My Account
                   </Button>
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-8 justify-end">
                <Button className="rounded-2xl h-12 px-8 bg-brand-primary hover:bg-brand-primary/90">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-px bg-stone-100 dark:bg-stone-800 w-full" />;
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
