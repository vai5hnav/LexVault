"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Database, ArrowDown, Activity } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";

export default function BlockchainPage() {
  const { evidenceList } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blockchain Anchors</h1>
        <p className="text-muted-foreground mt-1">Verifiable state commitments anchored to a decentralized ledger.</p>
        <Badge variant="warning" className="mt-2">DEMO NETWORK / LOCAL TESTNET</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {evidenceList.map((evidence) => (
          <Card key={evidence.id} className="bg-card border-border overflow-hidden relative">
            <CardHeader className="pb-3 border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex justify-between items-center">
                <span className="flex items-center text-primary">
                  <Database className="w-5 h-5 mr-2" />
                  Evidence Registration Anchor
                </span>
                <span className="font-mono text-sm text-muted-foreground">{evidence.id}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Local State */}
                <div className="p-6 md:w-1/2 space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex items-center">
                    <Activity className="w-4 h-4 mr-2" /> Local State
                  </h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <p className="text-muted-foreground mb-1">Merkle Root</p>
                      <p className="break-all p-2 bg-background rounded border border-border">{evidence.merkleRoot}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Cryptographic Commitment</p>
                      <p className="break-all p-2 bg-background rounded border border-border">{evidence.commitment}</p>
                    </div>
                  </div>
                </div>

                {/* Blockchain Anchor */}
                <div className="p-6 md:w-1/2 space-y-4 relative">
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-card border border-border rounded-full hidden md:flex items-center justify-center z-10">
                    <LinkIcon className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-card border border-border rounded-full flex md:hidden items-center justify-center z-10">
                    <ArrowDown className="w-4 h-4 text-primary" />
                  </div>

                  <h3 className="font-semibold text-sm text-blue-500 uppercase tracking-wider mb-4 flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2" /> On-Chain Anchor
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Network</span>
                      <span className="col-span-2 font-medium">Polygon Testnet (Simulated)</span>
                      
                      <span className="text-muted-foreground">Contract</span>
                      <span className="col-span-2 font-mono text-blue-400">LexVaultRegistry</span>
                      
                      <span className="text-muted-foreground">Block #</span>
                      <span className="col-span-2 font-mono">5829142</span>
                      
                      <span className="text-muted-foreground">Timestamp</span>
                      <span className="col-span-2">{new Date(evidence.registeredAt).toLocaleString()}</span>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1 text-xs">Transaction Hash</p>
                      <p className="break-all font-mono text-xs p-2 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                        {evidence.blockchainTx}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">CONFIRMED ✓</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
