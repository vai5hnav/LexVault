"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/lib/AppContext";
import { format } from "date-fns";
import { CheckCircle, AlertTriangle, ArrowDown } from "lucide-react";

export default function ChainOfCustodyPage() {
  const { evidenceList, custodyEvents } = useAppContext();
  const [selectedId, setSelectedId] = useState<string>("LV-2026-00124");
  
  const events = custodyEvents.filter(e => e.evidenceId === selectedId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chain of Custody</h1>
        <p className="text-muted-foreground mt-1">Cryptographically verified timeline of evidence possession and interaction.</p>
      </div>

      <div className="flex items-center space-x-4 mb-8 bg-card p-4 rounded-lg border border-border">
        <span className="text-sm font-medium text-muted-foreground">Evidence Record:</span>
        <select 
          className="bg-background border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {evidenceList.map(e => (
            <option key={e.id} value={e.id}>{e.id} - {e.caseId} ({e.filename})</option>
          ))}
        </select>
      </div>

      <div className="relative pl-8 space-y-8">
        {/* Vertical Timeline Line */}
        <div className="absolute top-4 bottom-4 left-[2.25rem] w-px bg-border z-0"></div>
        
        {events.map((event, index) => (
          <div key={event.id} className="relative z-10 flex items-start group">
            {/* Timeline node */}
            <div className={`mt-5 -ml-[1.3rem] mr-6 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center shrink-0 ${
              event.status === "VERIFIED" ? 'bg-green-500' : 'bg-destructive'
            } shadow-lg transition-transform duration-100 group-hover:scale-110`}>
              {event.status === "VERIFIED" ? (
                <CheckCircle className="w-4 h-4 text-background" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-background" />
              )}
            </div>

            <Card className={`flex-1 transition-all duration-100 ${event.status === "VERIFIED" ? 'hover:border-primary/50 bg-card' : 'border-destructive/50 bg-destructive/5'}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center">
                      {event.action}
                      {event.status !== "VERIFIED" && (
                        <Badge variant="destructive" className="ml-3">INTEGRITY ALERT</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(event.timestamp), "dd MMM yyyy, HH:mm:ss 'UTC'")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{event.actor}</p>
                    <p className="text-xs text-primary font-mono">{event.role}</p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-md p-4 border border-border grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Previous Hash</p>
                    <p className="truncate text-foreground/80">{event.previousHash}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Current Hash</p>
                    <p className="truncate text-foreground">{event.eventHash}</p>
                  </div>
                  <div className="md:col-span-2 pt-3 border-t border-border mt-1 flex justify-between items-center">
                    <span className="text-muted-foreground">Digital Signature</span>
                    <span className={event.signature.includes("VALID") ? "text-green-500 font-bold" : "text-destructive font-bold"}>
                      {event.signature}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {/* End of chain indicator */}
        <div className="relative z-10 flex items-start justify-center pt-4">
          <div className="flex flex-col items-center text-muted-foreground/50">
            <ArrowDown className="w-5 h-5 mb-2" />
            <span className="text-xs tracking-widest uppercase">End of Chain</span>
          </div>
        </div>
      </div>
    </div>
  );
}
