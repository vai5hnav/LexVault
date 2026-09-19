"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Fingerprint, ShieldCheck, FileText, CheckCircle2, ChevronRight, Download } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";
import { generateProof } from "@/lib/zkEngine";
import { format } from "date-fns";

export default function VerificationPage() {
  const { evidenceList, currentRole, addAuditLog } = useAppContext();
  const [selectedId, setSelectedId] = useState<string>("LV-2026-00124");
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [proofProgress, setProofProgress] = useState<{step: string, percent: number} | null>(null);
  const [proofResult, setProofResult] = useState<any | null>(null);

  const evidence = evidenceList.find(e => e.id === selectedId);

  const handleGenerateProof = async () => {
    if (!evidence) return;
    if (evidence.status === "COMPROMISED" || evidence.status === "INTEGRITY ALERT") {
      alert("Cannot generate proof: Evidence integrity violation detected.");
      return;
    }
    
    setIsVerifying(true);
    setProofResult(null);
    setProofProgress({ step: "Initializing ZK Engine...", percent: 0 });
    
    const result = await generateProof(evidence.id, evidence.commitment, (step, percent) => {
      setProofProgress({ step, percent });
    });
    
    setProofResult(result);
    setProofProgress(null);
    setIsVerifying(false);
    
    addAuditLog(`[${new Date().toLocaleTimeString()}] ZK Proof generated for ${evidence.id}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">ZERO-KNOWLEDGE EVIDENCE VERIFICATION</h1>
        <p className="text-xl text-muted-foreground">Verify the evidence without revealing the evidence.</p>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-8">
        <span className="text-sm font-medium text-muted-foreground">Select Evidence to Verify:</span>
        <select 
          className="bg-card border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setProofResult(null);
          }}
        >
          {evidenceList.map(e => (
            <option key={e.id} value={e.id}>{e.id} - {e.caseId}</option>
          ))}
        </select>
      </div>

      {evidence && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: CONFIDENTIAL EVIDENCE */}
          <Card className="bg-card border-border overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-10" />
            <CardHeader className="pb-4 border-b border-border bg-card/50 relative z-20">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Confidential Evidence
                </span>
                <Badge variant="outline" className="font-mono text-xs">{evidence.id}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px] relative z-20 text-center">
              {/* Fake blurred background document */}
              <div className="absolute inset-8 bg-foreground/5 blur-sm rounded-lg border border-foreground/10 flex flex-col p-4 gap-2 overflow-hidden opacity-50">
                <div className="h-4 bg-foreground/20 rounded w-3/4"></div>
                <div className="h-4 bg-foreground/20 rounded w-full"></div>
                <div className="h-4 bg-foreground/20 rounded w-5/6"></div>
                <div className="h-32 bg-foreground/10 rounded w-full my-4"></div>
                <div className="h-4 bg-foreground/20 rounded w-full"></div>
                <div className="h-4 bg-foreground/20 rounded w-2/3"></div>
              </div>
              
              <div className="relative z-30 flex flex-col items-center">
                <div className="w-24 h-24 bg-background/80 backdrop-blur-md rounded-full border border-border flex items-center justify-center mb-6 shadow-2xl">
                  <Lock className="w-12 h-12 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground tracking-tight">CONTENT HIDDEN</h3>
                <p className="text-muted-foreground font-medium bg-background/80 px-4 py-1 rounded-full backdrop-blur-md">
                  Sensitive evidence remains encrypted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: PROOF REQUEST */}
          <Card className={`bg-card shadow-lg transition-all duration-500 ${proofResult ? 'border-green-500 shadow-green-500/10' : 'border-border'}`}>
            <CardHeader className="pb-4 border-b border-border bg-card/50">
              <CardTitle className="text-lg flex items-center">
                <Fingerprint className="w-5 h-5 mr-2 text-purple-500" />
                Cryptographic Proof Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 min-h-[400px] flex flex-col justify-center">
              
              {!isVerifying && !proofResult && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-muted p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium italic">
                      "Is this the same evidence originally registered by the forensic lab?"
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target Commitment:</span>
                      <span className="font-mono text-primary truncate max-w-[200px]">{evidence.commitment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Verifier Role:</span>
                      <span className="font-medium">{currentRole}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                    onClick={handleGenerateProof}
                  >
                    GENERATE PROOF
                  </Button>
                </div>
              )}

              {isVerifying && proofProgress && (
                <div className="space-y-6 w-full max-w-xs mx-auto animate-in fade-in duration-300">
                  <div className="flex justify-center mb-8">
                    <Fingerprint className="w-16 h-16 text-purple-500 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-primary">{proofProgress.step}</span>
                      <span>{proofProgress.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-300 ease-out" 
                        style={{ width: `${proofProgress.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="font-mono text-xs text-muted-foreground/50 h-24 overflow-hidden flex flex-col-reverse">
                    {proofProgress.step}
                  </div>
                </div>
              )}

              {proofResult && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-700">
                  <div className="border border-green-500/50 rounded-lg overflow-hidden bg-background">
                    <div className="bg-green-500/10 p-4 border-b border-green-500/20 text-center flex flex-col items-center">
                      <ShieldCheck className="w-12 h-12 text-green-500 mb-2" />
                      <h2 className="text-2xl font-bold text-green-500 tracking-tight">ZK PROOF VALID ✓</h2>
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Authenticity</span>
                        <span className="text-green-500 font-bold tracking-widest">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Integrity</span>
                        <span className="text-green-500 font-bold tracking-widest">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Provenance</span>
                        <span className="text-green-500 font-bold tracking-widest">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Custodian Rights</span>
                        <span className="text-green-500 font-bold tracking-widest">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Timestamp</span>
                        <span className="text-green-500 font-bold tracking-widest">VERIFIED</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm bg-destructive/5 -mx-6 px-6 py-3">
                        <span className="text-muted-foreground font-medium">Underlying content</span>
                        <span className="text-destructive font-bold tracking-widest">NOT DISCLOSED</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-muted-foreground font-medium">
                    Verification succeeded without revealing the confidential evidence.
                  </p>
                  
                  <div className="flex space-x-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setProofResult(null)}>
                      Verify Another
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                  </div>
                </div>
              )}
              
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
