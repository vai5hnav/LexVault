"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  Database, 
  Upload, 
  CheckCircle, 
  GitCommit, 
  KeyRound, 
  Activity, 
  Link as LinkIcon, 
  ShieldAlert, 
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/lib/AppContext";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Evidence Vault", href: "/dashboard/vault", icon: Database },
  { name: "Register Evidence", href: "/dashboard/register", icon: Upload },
  { name: "Verification", href: "/dashboard/verification", icon: CheckCircle },
  { name: "Chain of Custody", href: "/dashboard/custody", icon: GitCommit },
  { name: "Discovery Requests", href: "/dashboard/discovery", icon: KeyRound },
  { name: "Audit HUD", href: "/dashboard/audit", icon: Activity },
  { name: "Blockchain Anchors", href: "/dashboard/blockchain", icon: LinkIcon },
  { name: "Security Center", href: "/dashboard/security", icon: ShieldAlert },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole, setRole } = useAppContext();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-border">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">LEXVAULT</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Evidence Infrastructure</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 px-1">Demo Role Switcher</div>
          <select 
            value={currentRole}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full bg-input border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Investigator">Investigator</option>
            <option value="Forensic Analyst">Forensic Analyst</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Custodian">Custodian</option>
            <option value="Authorized Reviewer">Authorized Reviewer</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-medium">
            {NAV_ITEMS.find((n) => pathname.startsWith(n.href))?.name || "LexVault"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-muted-foreground">System Online</span>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="text-sm font-medium">
              <span className="text-muted-foreground mr-2">Role:</span>
              <span className="text-primary">{currentRole}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
