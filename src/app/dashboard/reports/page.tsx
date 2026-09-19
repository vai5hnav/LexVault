"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppContext";
import { format } from "date-fns";
import { FileText, Download, ShieldCheck } from "lucide-react";

export default function VerificationReportsPage() {
  const { evidenceList, currentRole } = useAppContext();
  const [selectedId, setSelectedId] = useState<string>("LV-2026-00124");
  
  const evidence = evidenceList.find(e => e.id === selectedId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and export cryptographic proof of evidence integrity.</p>
      </div>

      <div className="flex items-center space-x-4 mb-8 bg-card p-4 rounded-lg border border-border">
        <span className="text-sm font-medium text-muted-foreground">Select Evidence:</span>
        <select 
          className="bg-background border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {evidenceList.map(e => (
            <option key={e.id} value={e.id}>{e.id} - {e.caseId}</option>
          ))}
        </select>
        <Button variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {evidence && (
        <Card className="bg-white text-black p-8 shadow-xl print:shadow-none print:p-0 font-sans mx-auto max-w-3xl">
          <div className="border-b-2 border-black pb-6 mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">LEXVAULT</h1>
              <p className="text-sm font-bold tracking-widest mt-1 text-gray-500">DIGITAL EVIDENCE VERIFICATION REPORT</p>
            </div>
            <div className="text-right text-sm">
              <p>Generated: {format(new Date(), "dd MMM yyyy HH:mm:ss")}</p>
              <p>Verifier Role: {currentRole}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Evidence ID</p>
              <p className="font-bold text-lg">{evidence.id}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Case ID</p>
              <p className="font-bold text-lg">{evidence.caseId}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Evidence Type</p>
              <p className="font-medium">{evidence.type}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Classification</p>
              <p className="font-medium">{evidence.classification}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Verification Results</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Authenticity</span>
                <span className="font-bold text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> VERIFIED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Integrity</span>
                <span className="font-bold text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> VERIFIED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Provenance</span>
                <span className="font-bold text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> VERIFIED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Timestamp</span>
                <span className="font-bold text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> VERIFIED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Custody Chain</span>
                <span className="font-bold text-green-600 flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> VERIFIED</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span className="font-semibold">Zero-Knowledge Proof</span>
                <span className="font-bold text-purple-600">VALID</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span className="font-semibold">Blockchain Anchor</span>
                <span className="font-bold text-blue-600">CONFIRMED</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Cryptographic Identifiers</h2>
            <div className="space-y-4 font-mono text-xs break-all">
              <div>
                <p className="font-bold text-gray-500 mb-1 font-sans">SHA-256 Hash</p>
                <p className="bg-gray-50 p-2 border border-gray-200 rounded">{evidence.sha256}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 mb-1 font-sans">Merkle Root</p>
                <p className="bg-gray-50 p-2 border border-gray-200 rounded">{evidence.merkleRoot}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 mb-1 font-sans">Cryptographic Commitment</p>
                <p className="bg-gray-50 p-2 border border-gray-200 rounded">{evidence.commitment}</p>
              </div>
              <div>
                <p className="font-bold text-gray-500 mb-1 font-sans">Blockchain Transaction</p>
                <p className="bg-gray-50 p-2 border border-gray-200 rounded">{evidence.blockchainTx}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 border-t-2 border-black text-center text-sm text-gray-600 font-medium">
            "This prototype demonstrates cryptographic verification concepts and is not by itself a determination of legal admissibility."
          </div>
        </Card>
      )}
    </div>
  );
}
