
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ArrowRightLeft,
  CalendarCheck,
  CreditCard,
  Landmark,
  MessageSquare,
  Settings,
  PieChart,
  FileText,
  History // Added History icon
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "../icons/logo"; // Updated to import Logo
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Using the existing complex sidebar

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  matchExact?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, matchExact: true },
  { href: "/dashboard/accounts", label: "Accounts", icon: Users },
  { href: "/dashboard/transfer", label: "Transfers", icon: ArrowRightLeft },
  { href: "/dashboard/bills", label: "Bill Payments", icon: CalendarCheck },
  { href: "/dashboard/cards", label: "Credit Cards", icon: CreditCard },
  { href: "/dashboard/loans", label: "Loans", icon: Landmark },
];

const secondaryNavItems: NavItem[] = [
  { href: "/dashboard/transactions", label: "Transaction History", icon: History }, // Added Transaction History
  { href: "/dashboard/reports", label: "Reports", icon: PieChart },
  { href: "/dashboard/statements", label: "Statements", icon: FileText },
  { href: "/support", label: "Support", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


export function DashboardSidebarNav() {
  const pathname = usePathname();

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className={cn(
              isActive && "bg-primary/10 text-primary hover:bg-primary/20",
              "justify-start"
            )}
            tooltip={{ children: item.label, side: "right", align: "center" }}
          >
            <Link href={item.href} className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Logo 
              height={28} // Base height for next/image aspect ratio and quality
              className="h-7 group-data-[collapsible=icon]:h-5 w-auto transition-all duration-300" // CSS for display size
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <ScrollArea className="h-full">
            <SidebarMenu>
              {renderNavItems(mainNavItems)}
            </SidebarMenu>
            <div className="my-4 border-t border-sidebar-border mx-2 group-data-[collapsible=icon]:hidden"></div>
            <SidebarMenu className="group-data-[collapsible=icon]:mt-4">
              {renderNavItems(secondaryNavItems)}
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        {/* <SidebarFooter className="p-2 border-t border-sidebar-border">
          User profile / logout can go here if not in header
        </SidebarFooter> */}
      </Sidebar>
  );
}

