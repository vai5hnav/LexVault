import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, CheckCircle2, Shield } from "lucide-react";

const THREAT_MODELS = [
  {
    risk: "Evidence Modification",
    mitigation: "SHA-256 + Merkle verification",
    status: "Active",
    description: "Any change to the underlying file immediately invalidates the Merkle Root and fails ZK verification."
  },
  {
    risk: "Custody Log Tampering",
    mitigation: "Hash-linked append-only ledger",
    status: "Active",
    description: "Events are cryptographically chained. Modifying a past event breaks all subsequent event signatures."
  },
  {
    risk: "Unauthorized Access",
    mitigation: "Encryption + RBAC",
    status: "Active",
    description: "Raw files are AES-256 encrypted before storage. Decryption keys are governed by Role-Based Access Control."
  },
  {
    risk: "Single-Key Compromise",
    mitigation: "Multi-signature approval",
    status: "Active",
    description: "Discovery and release require m-of-n cryptographic signatures from distinct authorized roles."
  },
  {
    risk: "Evidence Exposure During Verification",
    mitigation: "Zero-Knowledge verification",
    status: "Active",
    description: "Cryptographic proofs allow third parties to verify integrity without accessing the plaintext evidence."
  },
  {
    risk: "Storage Failure",
    mitigation: "Content-addressed decentralized storage + redundancy",
    status: "Active",
    description: "Evidence is stored using IPFS/Arweave abstractions to prevent single point of failure."
  },
  {
    risk: "Metadata Leakage",
    mitigation: "Minimize public metadata",
    status: "Active",
    description: "Identities and sensitive case details are stored off-chain or encrypted."
  },
  {
    risk: "Circuit Soundness Risk",
    mitigation: "Constrained demo circuit & deterministic verification",
    status: "Active",
    description: "ZK proofs are constrained to verifying the witness corresponds to the registered cryptographic commitment."
  }
];

export default function SecurityCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground mt-1">Threat model mapping and mitigation strategies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THREAT_MODELS.map((threat, idx) => (
          <Card key={idx} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2 border-b border-border bg-muted/10">
              <CardTitle className="text-base flex justify-between items-start">
                <span className="text-destructive flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  {threat.risk}
                </span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> {threat.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">Mitigation Strategy</p>
                <p className="font-medium text-primary flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  {threat.mitigation}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {threat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
