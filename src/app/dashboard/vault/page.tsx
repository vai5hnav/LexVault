"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/lib/AppContext";
import { format } from "date-fns";

export default function EvidenceVaultPage() {
  const { evidenceList } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evidence Vault</h1>
          <p className="text-muted-foreground mt-1">Manage and verify registered digital evidence.</p>
        </div>
        <Link href="/dashboard/register">
          <Button>Register New Evidence</Button>
        </Link>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by Evidence ID, Case ID, or keyword..." 
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      <div className="space-y-4">
        {evidenceList.map((evidence) => (
          <Link href={`/dashboard/vault/${evidence.id}`} key={evidence.id} className="block">
            <Card className="hover:border-primary/50 transition-colors bg-card cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {evidence.status === "VERIFIED" ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                      </div>
                    ) : evidence.status === "PENDING REVIEW" ? (
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{evidence.id}</h3>
                      <Badge variant={
                        evidence.classification === "CONFIDENTIAL" ? "destructive" : 
                        evidence.classification === "RESTRICTED" ? "warning" : "secondary"
                      }>
                        {evidence.classification}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{evidence.filename} • {evidence.type}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Case: <span className="font-mono text-foreground">{evidence.caseId}</span></span>
                      <span>Registered: {format(new Date(evidence.registeredAt), "dd MMM yyyy")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-3">
                  <Badge variant={
                    evidence.status === "VERIFIED" ? "success" : 
                    evidence.status === "PENDING REVIEW" ? "warning" : "destructive"
                  }>
                    {evidence.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details &rarr;
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
