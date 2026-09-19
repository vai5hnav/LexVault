export type EvidenceStatus = "VERIFIED" | "PENDING REVIEW" | "INTEGRITY ALERT" | "COMPROMISED";
export type CustodyEventStatus = "VERIFIED" | "ALERT";

export interface Evidence {
  id: string;
  caseId: string;
  filename: string;
  type: string;
  classification: string;
  sha256: string;
  merkleRoot: string;
  commitment: string;
  storageCid: string;
  blockchainTx: string;
  registeredBy: string;
  registeredAt: string;
  status: EvidenceStatus;
}

export interface CustodyEvent {
  id: string;
  evidenceId: string;
  actor: string;
  role: string;
  action: string;
  timestamp: string;
  previousHash: string;
  eventHash: string;
  signature: "VALID ✓" | "INVALID ✗";
  status: CustodyEventStatus;
}

export interface Approval {
  id: string;
  role: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface AccessRequest {
  id: string;
  evidenceId: string;
  requestedBy: string;
  reason: string;
  resource: string;
  createdAt: string;
  requiredApprovals: number;
  approvals: Approval[];
  status: "PENDING" | "AUTHORIZED" | "REJECTED";
}

// Initial Seed Data
export const SEED_EVIDENCE: Evidence[] = [
  {
    id: "LV-2026-00124",
    caseId: "CASE-AX47",
    filename: "forensic_financial_report.pdf",
    type: "Financial Forensic Report",
    classification: "CONFIDENTIAL",
    sha256: "7a918f8e02d3c9a4b8f7e6d5c4b3a2910f9e8d7c6b5a4938271605f4e3d2c1b0",
    merkleRoot: "91ab6d92f039c2758164b910e5d4a3182746f5c8b21a09d8e7f6c5b4a3928170",
    commitment: "c8f49a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f",
    storageCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    blockchainTx: "0x7fd89a21b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
    registeredBy: "Investigator Demo",
    registeredAt: "2026-09-07T14:32:11Z",
    status: "VERIFIED",
  },
  {
    id: "LV-2026-00125",
    caseId: "CASE-ZK19",
    filename: "digital_image_evidence.jpg",
    type: "Digital Image",
    classification: "RESTRICTED",
    sha256: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    merkleRoot: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    commitment: "f1e2d3c4b5a69788796a5b4c3d2e1f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    storageCid: "bafybeihdwdcefgh4qtxw3x5v2u6oq5g3vjk4klyhfxr32k6h5ywxmxyz",
    blockchainTx: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    registeredBy: "Officer Sarah Jenkins",
    registeredAt: "2026-09-08T09:15:00Z",
    status: "PENDING REVIEW",
  },
  {
    id: "LV-2026-00126",
    caseId: "CASE-FR52",
    filename: "forensic_lab_report.pdf",
    type: "Lab Report",
    classification: "CONFIDENTIAL",
    sha256: "e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    merkleRoot: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    commitment: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    storageCid: "bafybeigzxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcde",
    blockchainTx: "0x9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f",
    registeredBy: "Dr. A. Sharma",
    registeredAt: "2026-09-08T11:42:30Z",
    status: "INTEGRITY ALERT",
  },
];

export const SEED_CUSTODY_EVENTS: CustodyEvent[] = [
  {
    id: "CE-1001",
    evidenceId: "LV-2026-00124",
    actor: "Investigator Demo",
    role: "Investigator",
    action: "Evidence Registered",
    timestamp: "2026-09-07T14:32:11Z",
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    eventHash: "53ac...21d",
    signature: "VALID ✓",
    status: "VERIFIED",
  },
  {
    id: "CE-1002",
    evidenceId: "LV-2026-00124",
    actor: "Forensic Lab",
    role: "Forensic Analyst",
    action: "Custody Transferred",
    timestamp: "2026-09-07T15:08:42Z",
    previousHash: "53ac...21d",
    eventHash: "7ab29...e11",
    signature: "VALID ✓",
    status: "VERIFIED",
  },
  {
    id: "CE-1003",
    evidenceId: "LV-2026-00124",
    actor: "Forensic Lab",
    role: "Forensic Analyst",
    action: "Forensic Analysis Completed",
    timestamp: "2026-09-07T16:20:04Z",
    previousHash: "7ab29...e11",
    eventHash: "9cd34...f22",
    signature: "VALID ✓",
    status: "VERIFIED",
  },
  {
    id: "CE-1004",
    evidenceId: "LV-2026-00124",
    actor: "Lawyer C",
    role: "Lawyer",
    action: "Verification Requested",
    timestamp: "2026-09-07T17:03:18Z",
    previousHash: "9cd34...f22",
    eventHash: "b1e45...a33",
    signature: "VALID ✓",
    status: "VERIFIED",
  },
];

export const SEED_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: "AR-5092",
    evidenceId: "LV-2026-00124",
    requestedBy: "Lawyer C",
    reason: "Court-authorized disclosure",
    resource: "Original forensic report",
    createdAt: "2026-09-07T18:10:00Z",
    requiredApprovals: 3,
    status: "PENDING",
    approvals: [
      { id: "app-1", role: "INVESTIGATOR", status: "Approved" },
      { id: "app-2", role: "CUSTODIAN", status: "Pending" },
      { id: "app-3", role: "AUTHORIZED REVIEWER", status: "Pending" },
    ],
  },
];
