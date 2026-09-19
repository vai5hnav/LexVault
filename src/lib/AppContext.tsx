"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Evidence, CustodyEvent, AccessRequest, SEED_EVIDENCE, SEED_CUSTODY_EVENTS, SEED_ACCESS_REQUESTS } from "./mockDb";

type Role = "Investigator" | "Forensic Analyst" | "Lawyer" | "Custodian" | "Authorized Reviewer";

interface AppState {
  currentRole: Role;
  evidenceList: Evidence[];
  custodyEvents: CustodyEvent[];
  accessRequests: AccessRequest[];
  auditLogs: string[];
}

interface AppContextType extends AppState {
  setRole: (role: Role) => void;
  simulateTampering: (evidenceId: string) => void;
  restoreState: (evidenceId: string) => void;
  addAuditLog: (log: string) => void;
  approveAccessRequest: (requestId: string, role: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentRole: "Investigator",
    evidenceList: SEED_EVIDENCE,
    custodyEvents: SEED_CUSTODY_EVENTS,
    accessRequests: SEED_ACCESS_REQUESTS,
    auditLogs: [
      "[14:32:11] Evidence LV-2026-00124 registered",
      "[15:08:42] Custody transfer signed",
      "[16:20:04] Forensic analysis event recorded",
    ],
  });

  const setRole = (role: Role) => setState((s) => ({ ...s, currentRole: role }));

  const addAuditLog = (log: string) => {
    setState((s) => ({ ...s, auditLogs: [log, ...s.auditLogs] }));
  };

  const simulateTampering = (evidenceId: string) => {
    setState((s) => ({
      ...s,
      evidenceList: s.evidenceList.map((e) =>
        e.id === evidenceId ? { ...e, status: "COMPROMISED" } : e
      ),
      custodyEvents: s.custodyEvents.map((ce) =>
        ce.evidenceId === evidenceId ? { ...ce, status: "ALERT" } : ce
      ),
    }));
    addAuditLog(`[${new Date().toLocaleTimeString()}] 🚨 INTEGRITY ALERT on ${evidenceId}`);
  };

  const restoreState = (evidenceId: string) => {
    setState((s) => ({
      ...s,
      evidenceList: s.evidenceList.map((e) =>
        e.id === evidenceId ? { ...e, status: "VERIFIED" } : e
      ),
      custodyEvents: s.custodyEvents.map((ce) =>
        ce.evidenceId === evidenceId ? { ...ce, status: "VERIFIED" } : ce
      ),
    }));
    addAuditLog(`[${new Date().toLocaleTimeString()}] System state restored for ${evidenceId}`);
  };

  const approveAccessRequest = (requestId: string, role: string) => {
    setState((s) => {
      const newRequests = s.accessRequests.map((req) => {
        if (req.id === requestId) {
          const newApprovals = req.approvals.map((app) =>
            app.role === role ? { ...app, status: "Approved" as const } : app
          );
          const approvedCount = newApprovals.filter((a) => a.status === "Approved").length;
          const newStatus: "AUTHORIZED" | "PENDING" = approvedCount >= req.requiredApprovals ? "AUTHORIZED" : "PENDING";
          if (newStatus === "AUTHORIZED" && req.status !== "AUTHORIZED") {
             setTimeout(() => addAuditLog(`[${new Date().toLocaleTimeString()}] Access REQUEST AUTHORIZED for ${req.evidenceId}`), 10);
          }
          return { ...req, approvals: newApprovals, status: newStatus };
        }
        return req;
      });
      return { ...s, accessRequests: newRequests };
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setRole,
        simulateTampering,
        restoreState,
        addAuditLog,
        approveAccessRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
