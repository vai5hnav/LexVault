"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/lib/AppContext";
import { Activity, ShieldAlert, Zap, Server, Network, Fingerprint, Lock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function AuditHudPage() {
  const { auditLogs, simulateTampering, restoreState, evidenceList } = useAppContext();
  const logsEndRef = useRef<HTMLDivElement>(null);

  const demoEvidenceId = "LV-2026-00124";
  const isCompromised = evidenceList.find(e => e.id === demoEvidenceId)?.status === "COMPROMISED";

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [auditLogs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Activity className="w-8 h-8 mr-3 text-primary" />
            Security Operations: Audit HUD
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-mono uppercase tracking-widest">Global Immutable Ledger Stream</p>
        </div>
        
        <div className="flex space-x-3">
          {isCompromised ? (
            <Button 
              variant="outline" 
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => restoreState(demoEvidenceId)}
            >
              <Zap className="w-4 h-4 mr-2" />
              RESTORE VERIFIED STATE
            </Button>
          ) : (
            <Button 
              variant="destructive" 
              className="animate-pulse shadow-lg shadow-destructive/20"
              onClick={() => simulateTampering(demoEvidenceId)}
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              SIMULATE EVIDENCE TAMPERING
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <GlassCard className={isCompromised ? "border-destructive/30 hover:border-destructive/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"}>
          <GlassCard.Header>
            <GlassCard.Title className={isCompromised ? "text-destructive" : "text-green-500"}>CUSTODY INTEGRITY</GlassCard.Title>
            <GlassCard.Icon className={isCompromised ? "text-destructive" : "text-green-500"}>
              {isCompromised ? <ShieldAlert className="h-4 w-4" /> : <Network className="h-4 w-4" />}
            </GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className={isCompromised ? "text-destructive" : "text-green-500"}>
            {isCompromised ? 'COMPROMISED' : '100%'}
          </GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-purple-500">ZK PROOFS</GlassCard.Title>
            <GlassCard.Icon className="text-purple-500"><Fingerprint className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-purple-500">18 VALID</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-blue-500/30 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-blue-500">BLOCKCHAIN NODES</GlassCard.Title>
            <GlassCard.Icon className="text-blue-500"><Server className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-blue-500">SYNCED</GlassCard.Body>
        </GlassCard>
        
        <GlassCard className="border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <GlassCard.Header>
            <GlassCard.Title className="text-amber-500">ACCESS REQUESTS</GlassCard.Title>
            <GlassCard.Icon className="text-amber-500"><Lock className="h-4 w-4" /></GlassCard.Icon>
          </GlassCard.Header>
          <GlassCard.Body className="text-amber-500">1 PENDING</GlassCard.Body>
        </GlassCard>
      </div>

      <Card className={`flex-1 flex flex-col overflow-hidden transition-colors duration-500 ${isCompromised ? 'border-destructive bg-destructive/5' : 'bg-[#050B14] border-border'}`}>
        <CardHeader className={`border-b shrink-0 py-3 ${isCompromised ? 'border-destructive/30' : 'border-[#1E293B]'}`}>
          <CardTitle className="text-sm font-mono flex justify-between items-center text-muted-foreground">
            <span>// SYSTEM EVENT STREAM</span>
            {isCompromised && (
              <Badge variant="destructive" className="animate-pulse">CRITICAL: INTEGRITY VIOLATION DETECTED</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0 font-mono text-xs sm:text-sm">
          <div className="p-4 space-y-2">
            {[...auditLogs].reverse().map((log, i) => {
              const isAlert = log.includes("🚨") || log.includes("ALERT") || log.includes("COMPROMISED");
              const isSuccess = log.includes("AUTHORIZED") || log.includes("restored") || log.includes("registered");
              return (
                <div 
                  key={i} 
                  className={`p-2 border-l-2 ${isAlert ? 'border-destructive text-destructive bg-destructive/10' : isSuccess ? 'border-green-500/50 text-green-400' : 'border-primary/30 text-muted-foreground hover:bg-white/5'} transition-colors`}
                >
                  {log}
                  {isAlert && (
                    <div className="mt-2 text-xs opacity-80 pl-4 border-l border-destructive/30 ml-2 py-1">
                      <div><span className="text-muted-foreground">Evidence:</span> {demoEvidenceId}</div>
                      <div><span className="text-muted-foreground">Expected SHA-256:</span> <span className="line-through opacity-50">7a918f8e02d3c9...</span></div>
                      <div><span className="text-muted-foreground">Received SHA-256:</span> 91f3a18e000000...</div>
                      <div className="font-bold mt-1">Merkle Root: INVALID</div>
                    </div>
                  )}
                </div>
              )
            })}
            <div ref={logsEndRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
