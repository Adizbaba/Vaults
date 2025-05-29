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
  FileText
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "../icons/logo";
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
            {/* Simple logo for sidebar */}
             <svg className="h-8 w-8 text-primary group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.53L19.19 9L12 13.47L4.81 9L12 4.53ZM4 10.36L11 14.36V19.19L4 15.19V10.36ZM13 14.36L20 10.36V15.19L13 19.19V14.36Z"/></svg>
            <span className="font-semibold text-lg text-primary group-data-[collapsible=icon]:hidden">VaultbyChase</span>
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
