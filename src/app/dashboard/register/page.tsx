"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, CheckCircle2, Loader2, File, Lock, Hash, Network, Shield, Fingerprint, Link as LinkIcon, ShieldCheck } from "lucide-react";
import { hashFile, generateCommitment, generateId, generateDemoMerkleTree } from "@/lib/cryptoService";
import { useAppContext } from "@/lib/AppContext";
import { useRouter } from "next/navigation";

const PROCESSING_STEPS = [
  { id: 1, label: "FILE RECEIVED", icon: File },
  { id: 2, label: "CLIENT-SIDE ENCRYPTION", icon: Lock },
  { id: 3, label: "SHA-256 HASH GENERATION", icon: Hash },
  { id: 4, label: "MERKLE TREE CONSTRUCTION", icon: Network },
  { id: 5, label: "CRYPTOGRAPHIC COMMITMENT", icon: Shield },
  { id: 6, label: "ZERO-KNOWLEDGE PROOF GENERATION", icon: Fingerprint },
  { id: 7, label: "BLOCKCHAIN ANCHORING", icon: LinkIcon },
  { id: 8, label: "REGISTRATION COMPLETE", icon: ShieldCheck },
];

export default function RegisterEvidencePage() {
  const router = useRouter();
  const { addAuditLog } = useAppContext();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cryptoData, setCryptoData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRegister = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setCurrentStep(1);
    
    // Simulate File Received
    await new Promise(r => setTimeout(r, 600));
    
    setCurrentStep(2);
    // Simulate Client-side encryption
    await new Promise(r => setTimeout(r, 800));

    setCurrentStep(3);
    // Real SHA-256
    const fileHash = await hashFile(file);
    await new Promise(r => setTimeout(r, 500));

    setCurrentStep(4);
    // Merkle construction
    const tree = await generateDemoMerkleTree(fileHash);
    await new Promise(r => setTimeout(r, 800));

    setCurrentStep(5);
    // Commitment
    const commitment = await generateCommitment(tree.hash);
    await new Promise(r => setTimeout(r, 600));

    setCurrentStep(6);
    // Simulate ZK proof
    await new Promise(r => setTimeout(r, 1200));

    setCurrentStep(7);
    // Simulate Blockchain anchor
    const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    await new Promise(r => setTimeout(r, 1000));

    setCurrentStep(8);
    
    const newId = generateId();
    
    setCryptoData({
      id: newId,
      sha256: fileHash,
      merkleRoot: tree.hash,
      commitment: commitment,
      blockchainTx: txHash,
      timestamp: new Date().toISOString()
    });
    
    addAuditLog(`[${new Date().toLocaleTimeString()}] Evidence ${newId} registered`);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Register Evidence</h1>
        <p className="text-muted-foreground mt-1">Upload files for cryptographic processing and secure registration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-6">
          <Card className={`border-2 border-dashed ${file ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center h-64">
              {!file ? (
                <>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Drag & Drop Evidence</h3>
                  <p className="text-sm text-muted-foreground mb-4">Supported: PDF, JPG, PNG, DOCX, ZIP</p>
                  <label className="cursor-pointer">
                    <Button asChild>
                      <span>Browse Files</span>
                    </Button>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </>
              ) : (
                <>
                  <File className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2 truncate max-w-[250px]">{file.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {!isProcessing && !cryptoData && (
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setFile(null)}>Cancel</Button>
                      <Button onClick={handleRegister}>Process & Register</Button>
                    </div>
                  )}
                  {cryptoData && (
                    <Button variant="outline" onClick={() => router.push(`/dashboard/vault/${cryptoData.id}`)}>
                      View in Vault
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Cryptographic Values Result */}
          {cryptoData && (
            <Card className="bg-card border-green-500/50">
              <CardHeader className="pb-3 border-b border-border bg-green-500/5">
                <CardTitle className="text-lg text-green-500 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Registration Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border font-mono text-xs">
                  <div className="p-3 flex justify-between">
                    <span className="text-muted-foreground">Evidence ID</span>
                    <span className="text-primary font-bold">{cryptoData.id}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="success">REGISTERED ✓</Badge>
                  </div>
                  <div className="p-3 flex flex-col space-y-1">
                    <span className="text-muted-foreground">SHA-256</span>
                    <span className="text-foreground truncate">{cryptoData.sha256}</span>
                  </div>
                  <div className="p-3 flex flex-col space-y-1">
                    <span className="text-muted-foreground">Merkle Root</span>
                    <span className="text-foreground truncate">{cryptoData.merkleRoot}</span>
                  </div>
                  <div className="p-3 flex flex-col space-y-1">
                    <span className="text-muted-foreground">Commitment</span>
                    <span className="text-foreground truncate">{cryptoData.commitment}</span>
                  </div>
                  <div className="p-3 flex flex-col space-y-1">
                    <span className="text-muted-foreground">Blockchain Tx</span>
                    <span className="text-blue-500 truncate">{cryptoData.blockchainTx}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Processing Animation */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground mb-4">Cryptographic Pipeline</h3>
          <div className="space-y-3">
            {PROCESSING_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id || cryptoData;
              
              return (
                <div 
                  key={step.id} 
                  className={`flex items-center p-3 rounded-lg border transition-all duration-300 ${
                    isActive ? 'bg-primary/10 border-primary text-primary' :
                    isCompleted ? 'bg-card border-border text-muted-foreground' :
                    'bg-card/30 border-transparent text-muted-foreground/30'
                  }`}
                >
                  <div className="w-8 flex justify-center mr-3">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : (
                      <Icon className="w-5 h-5 opacity-50" />
                    )}
                  </div>
                  <span className={`text-sm font-medium tracking-wide ${isActive ? 'text-primary' : ''}`}>
                    Step {step.id}: {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
