"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users, Shield, Database, Fingerprint, Link as LinkIcon, Lock } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-8 flex justify-between items-center">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">LexVault Architecture</h1>
        <div className="w-24"></div> {/* spacer */}
      </div>

      <div className="flex flex-col items-center space-y-4 w-full max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
        
        {/* USERS */}
        <div className="w-64 p-4 border border-border bg-card rounded-lg text-center shadow-lg relative">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-bold">USERS</h3>
          <p className="text-xs text-muted-foreground mt-1">Investigators, Lawyers, Analysts</p>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/50 animate-pulse"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping"></div>
        </div>

        {/* WEB APP & RBAC */}
        <div className="w-80 p-6 border border-border bg-card rounded-lg text-center shadow-lg relative mt-8">
          <h3 className="font-bold text-lg mb-2 text-foreground">LEXVAULT WEB APP</h3>
          <div className="bg-muted p-2 rounded text-sm mb-2 border border-border">RBAC + Audit HUD</div>
          <p className="text-xs text-muted-foreground">Next.js + Tailwind CSS</p>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/50 animate-pulse"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping"></div>
        </div>

        {/* SECURITY LAYER */}
        <div className="w-96 p-6 border border-border bg-[#050B14] rounded-lg text-center shadow-lg relative mt-8">
          <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-lg mb-4 text-foreground">SECURITY LAYER</h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-card p-3 rounded border border-border text-xs flex flex-col items-center">
              <Lock className="w-4 h-4 mb-1 text-destructive" />
              AES Encryption
            </div>
            <div className="bg-card p-3 rounded border border-border text-xs flex flex-col items-center">
              <Database className="w-4 h-4 mb-1 text-blue-500" />
              SHA-256
            </div>
            <div className="bg-card p-3 rounded border border-border text-xs flex flex-col items-center">
              <Shield className="w-4 h-4 mb-1 text-green-500" />
              Digital Signatures
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-primary/50 animate-pulse"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping"></div>
        </div>

        <div className="flex gap-8 mt-8 relative">
          <div className="absolute -top-6 left-[25%] w-[50%] h-0.5 bg-primary/50"></div>
          <div className="absolute -top-6 left-[25%] w-0.5 h-6 bg-primary/50"></div>
          <div className="absolute -top-6 right-[25%] w-0.5 h-6 bg-primary/50"></div>
          
          {/* STORAGE */}
          <div className="w-64 p-6 border border-border bg-card rounded-lg text-center shadow-lg relative">
            <Database className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-2 text-foreground">ENCRYPTED STORAGE</h3>
            <div className="space-y-2">
              <div className="bg-muted p-2 rounded text-xs border border-border">IPFS</div>
              <div className="bg-muted p-2 rounded text-xs border border-border">Arweave</div>
            </div>
          </div>

          {/* ZK ENGINE */}
          <div className="w-64 p-6 border border-purple-500/30 bg-purple-500/5 rounded-lg text-center shadow-lg relative flex flex-col items-center">
            <Fingerprint className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-bold text-lg mb-2 text-foreground">ZERO-KNOWLEDGE ENGINE</h3>
            <div className="bg-card p-2 rounded text-xs border border-border w-full">Merkle Tree</div>
            <div className="bg-card p-2 rounded text-xs border border-border w-full mt-2">ZK Proof Generation</div>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-purple-500/50 animate-pulse"></div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
          </div>
        </div>

        {/* BLOCKCHAIN */}
        <div className="w-80 p-6 border border-blue-500/30 bg-blue-500/5 rounded-lg text-center shadow-lg relative mt-8">
          <LinkIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-bold text-lg mb-2 text-foreground">SMART CONTRACT</h3>
          <div className="bg-card p-2 rounded text-sm mb-2 border border-border text-blue-400 font-mono">LexVaultRegistry.sol</div>
          <p className="text-xs text-muted-foreground">Polygon / Demo Network</p>
        </div>

      </div>
    </div>
  );
}
