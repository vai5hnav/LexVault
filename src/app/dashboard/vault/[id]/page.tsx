"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileText, Activity, Key, ChevronLeft } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { ThinkingLoader } from "@/components/ui/thinking-loader";

export default function EvidenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { evidenceList, currentRole } = useAppContext();
  const [isVerifying, setIsVerifying] = useState(false);
  
  const id = params.id as string;
  const evidence = evidenceList.find(e => e.id === id);

  if (!evidence) {
    return <div className="p-8 text-center">Evidence not found.</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <Button variant="ghost" className="mb-2 -ml-4" onClick={() => router.back()}>
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Vault
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">EVIDENCE {evidence.id}</h1>
            <Badge variant={evidence.status === "VERIFIED" ? "success" : "destructive"}>
              {evidence.status}
            </Badge>
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <span>Case: <span className="font-mono text-foreground">{evidence.caseId}</span></span>
            <span>Type: {evidence.type}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => {
              setIsVerifying(true);
              setTimeout(() => {
                router.push("/dashboard/verification");
              }, 6000);
            }} 
            disabled={isVerifying}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            {isVerifying ? "Processing..." : "Verify Zero-Knowledge Proof"}
          </Button>
        </div>
      </div>

      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <ThinkingLoader />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Metadata & Security */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {['Authenticity', 'Integrity', 'Provenance', 'Timestamp'].map((check) => (
                  <li key={check} className="px-6 py-3 flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{check}</span>
                    <span className={evidence.status === "VERIFIED" ? "text-green-500 font-medium flex items-center" : "text-destructive font-medium flex items-center"}>
                      {evidence.status === "VERIFIED" ? "VERIFIED ✓" : "INVALID ✗"}
                    </span>
                  </li>
                ))}
                <li className="px-6 py-3 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">ZK Proof</span>
                  <span className="text-purple-500 font-medium">VALID ✓</span>
                </li>
                <li className="px-6 py-3 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="text-blue-500 font-medium">ANCHORED ✓</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Registered By</p>
                <p className="font-medium">{evidence.registeredBy}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Timestamp</p>
                <p className="font-medium">{format(new Date(evidence.registeredAt), "dd MMM yyyy, HH:mm:ss 'UTC'")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Classification</p>
                <Badge variant={evidence.classification === "CONFIDENTIAL" ? "destructive" : "warning"}>
                  {evidence.classification}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Confidential Content & Crypto Identifiers */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card border-border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-10" />
            <CardHeader className="pb-4 border-b border-border bg-card/50 relative z-20">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Evidence Content
                </span>
                <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                  {evidence.filename}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 flex flex-col items-center justify-center min-h-[300px] relative z-20 text-center">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">CONFIDENTIAL CONTENT PROTECTED</h3>
              <p className="text-muted-foreground max-w-md mb-8">
                This evidence is encrypted and access-controlled. You do not have the required decryption keys in your current role.
              </p>
              <Link href="/dashboard/discovery">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Key className="w-4 h-4 mr-2" />
                  Request Authorized Access
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg flex items-center">
                <Key className="w-5 h-5 mr-2 text-primary" />
                Cryptographic Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border font-mono text-xs">
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <span className="text-muted-foreground md:col-span-1">SHA-256</span>
                  <span className="text-foreground md:col-span-3 break-all">{evidence.sha256}</span>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <span className="text-muted-foreground md:col-span-1">Merkle Root</span>
                  <span className="text-foreground md:col-span-3 break-all">{evidence.merkleRoot}</span>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <span className="text-muted-foreground md:col-span-1">Commitment</span>
                  <span className="text-foreground md:col-span-3 break-all">{evidence.commitment}</span>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <span className="text-muted-foreground md:col-span-1">Storage CID</span>
                  <span className="text-foreground md:col-span-3 break-all">{evidence.storageCid}</span>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <span className="text-muted-foreground md:col-span-1">Blockchain Tx</span>
                  <span className="text-blue-400 md:col-span-3 break-all">{evidence.blockchainTx}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
