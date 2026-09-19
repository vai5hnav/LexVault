"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppContext";
import { KeyRound, ShieldAlert, CheckCircle2, CircleDashed, Users, Unlock } from "lucide-react";
import { format } from "date-fns";

export default function DiscoveryRequestsPage() {
  const { accessRequests, currentRole, approveAccessRequest } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discovery Access Requests</h1>
        <p className="text-muted-foreground mt-1">Multi-signature authorization workflows for sensitive evidence release.</p>
      </div>

      <div className="space-y-6">
        {accessRequests.map((request) => {
          const approvedCount = request.approvals.filter(a => a.status === "Approved").length;
          const isAuthorized = request.status === "AUTHORIZED";
          const progressPercent = (approvedCount / request.requiredApprovals) * 100;
          
          // Check if current user role has a pending approval in this request
          const userApprovalIndex = request.approvals.findIndex(a => a.role.toLowerCase() === currentRole.toLowerCase());
          const canApprove = userApprovalIndex !== -1 && request.approvals[userApprovalIndex].status === "Pending";

          return (
            <Card key={request.id} className={`overflow-hidden transition-all duration-500 ${isAuthorized ? 'border-green-500/50 shadow-green-500/5' : 'border-border'}`}>
              <div className={`h-1 w-full ${isAuthorized ? 'bg-green-500' : 'bg-primary/20'}`}>
                <div 
                  className={`h-full ${isAuthorized ? 'bg-green-500' : 'bg-primary'} transition-all duration-1000`} 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left panel: Details */}
                  <div className="p-6 md:w-2/3 border-r border-border">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-xl font-bold">{request.id}</h2>
                          <Badge variant={isAuthorized ? "success" : "warning"}>{request.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Requested {format(new Date(request.createdAt), "dd MMM yyyy, HH:mm")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Target Evidence</p>
                        <p className="font-mono text-primary">{request.evidenceId}</p>
                      </div>
                    </div>

                    <div className="space-y-4 bg-background/50 p-4 rounded-md border border-border">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="col-span-1 text-muted-foreground">Requested By</div>
                        <div className="col-span-2 font-medium">{request.requestedBy}</div>
                        
                        <div className="col-span-1 text-muted-foreground">Reason</div>
                        <div className="col-span-2">{request.reason}</div>
                        
                        <div className="col-span-1 text-muted-foreground">Resource</div>
                        <div className="col-span-2">{request.resource}</div>
                        
                        <div className="col-span-1 text-muted-foreground">Security Policy</div>
                        <div className="col-span-2 flex items-center text-primary font-mono text-xs">
                          <Users className="w-4 h-4 mr-1" />
                          {request.requiredApprovals}-of-{request.approvals.length} Signatures Required
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right panel: Approvals */}
                  <div className="p-6 md:w-1/3 bg-card/30 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium flex items-center mb-4">
                        <ShieldAlert className="w-4 h-4 mr-2 text-muted-foreground" />
                        Approval Status ({approvedCount}/{request.requiredApprovals})
                      </h3>
                      <div className="space-y-3">
                        {request.approvals.map((approval) => (
                          <div key={approval.id} className="flex items-center justify-between text-sm">
                            <span className={`font-medium ${approval.status === 'Approved' ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {approval.role}
                            </span>
                            {approval.status === "Approved" ? (
                              <span className="flex items-center text-green-500 font-medium">
                                <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
                              </span>
                            ) : (
                              <span className="flex items-center text-amber-500">
                                <CircleDashed className="w-4 h-4 mr-1 animate-spin-slow" /> Pending
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      {isAuthorized ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white animate-in slide-in-from-bottom-2">
                          <Unlock className="w-4 h-4 mr-2" />
                          RELEASE ENCRYPTED EVIDENCE
                        </Button>
                      ) : canApprove ? (
                        <Button 
                          className="w-full" 
                          onClick={() => approveAccessRequest(request.id, currentRole)}
                        >
                          <KeyRound className="w-4 h-4 mr-2" />
                          Sign & Approve Release
                        </Button>
                      ) : (
                        <div className="text-center text-sm text-muted-foreground p-3 border border-dashed border-border rounded-md bg-background/50">
                          Awaiting other signatures. Your current role ({currentRole}) cannot authorize at this time.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
