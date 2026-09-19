"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ShieldCheck, AlertTriangle, Fingerprint, Link as LinkIcon, Server, CheckCircle } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";
import { format } from "date-fns";

import { GlassCard } from "@/components/ui/glass-card";

export default function DashboardPage() {
  const { evidenceList, custodyEvents } = useAppContext();

  const totalEvidence = evidenceList.length;
  const verifiedCount = evidenceList.filter(e => e.status === "VERIFIED").length;
  const pendingCount = evidenceList.filter(e => e.status === "PENDING REVIEW").length;
  const alertCount = evidenceList.filter(e => e.status === "INTEGRITY ALERT" || e.status === "COMPROMISED").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <GlassCard>
          <GlassCard.Header>
            <GlassCard.Title>TOTAL EVIDENCE</GlassCard.Title>
            <GlassCard.Icon className="text-muted-foreground"><Database className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body>{totalEvidence}</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-green-500">VERIFIED</GlassCard.Title>
            <GlassCard.Icon className="text-green-500"><ShieldCheck className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-green-500">{verifiedCount}</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-amber-500">PENDING</GlassCard.Title>
            <GlassCard.Icon className="text-amber-500"><AlertTriangle className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-amber-500">{pendingCount}</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-red-500/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-red-500">ALERTS</GlassCard.Title>
            <GlassCard.Icon className="text-red-500"><AlertTriangle className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-red-500">{alertCount}</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-purple-500">ZK PROOFS</GlassCard.Title>
            <GlassCard.Icon className="text-purple-500"><Fingerprint className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-purple-500">18</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-blue-500/30 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-blue-500">ANCHORED</GlassCard.Title>
            <GlassCard.Icon className="text-blue-500"><LinkIcon className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-blue-500">{totalEvidence}</GlassCard.Body>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Evidence */}
        <div className="col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Recent Evidence</h3>
          <div className="rounded-md border border-border bg-card">
            <div className="p-4">
              <div className="space-y-4">
                {evidenceList.map((evidence) => (
                  <div key={evidence.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-primary">{evidence.id}</span>
                        <span className="text-xs text-muted-foreground">• {evidence.caseId}</span>
                      </div>
                      <p className="text-sm font-medium">{evidence.type}</p>
                      <p className="text-xs text-muted-foreground">Registered by {evidence.registeredBy} • {format(new Date(evidence.registeredAt), "dd MMM yyyy HH:mm")}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={evidence.status === "VERIFIED" ? "success" : evidence.status === "PENDING REVIEW" ? "warning" : "destructive"}>
                        {evidence.status}
                      </Badge>
                      <div className="flex space-x-2 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">ZK VALID</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">ANCHORED</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Chain of Custody & System Status */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Live Custody Activity</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                {custodyEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 text-sm">
                    <div className="mt-0.5">
                      {event.status === "VERIFIED" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{event.action}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(event.timestamp), "HH:mm:ss")}</span>
                      </div>
                      <div className="text-muted-foreground flex justify-between">
                        <span>{event.actor}</span>
                        <span className={event.signature.includes("VALID") ? "text-green-500" : "text-destructive"}>
                          {event.signature}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">System Security Status</h3>
            <Card>
              <CardContent className="p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center"><Server className="w-3 h-3 mr-2"/> Cryptographic Engine</span>
                  <span className="text-green-500">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center"><Server className="w-3 h-3 mr-2"/> ZK Proof Engine</span>
                  <span className="text-green-500">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center"><Server className="w-3 h-3 mr-2"/> Blockchain Anchor</span>
                  <span className="text-green-500">CONNECTED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center"><Server className="w-3 h-3 mr-2"/> Encrypted Storage</span>
                  <span className="text-green-500">HEALTHY</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-3 mt-3">
                  <span className="text-muted-foreground flex items-center"><Database className="w-3 h-3 mr-2"/> Audit Ledger</span>
                  <span className="text-green-500">INTEGRITY VERIFIED</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
