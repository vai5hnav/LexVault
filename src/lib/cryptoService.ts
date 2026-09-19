// LexVault Cryptographic Service
// Note: This is for the hackathon prototype. It uses the real Web Crypto API for hashing,
// but abstracts some complexities like actual zero-knowledge circuit compilation.

export async function sha256(message: string | ArrayBuffer): Promise<string> {
  let buffer: ArrayBuffer;
  if (typeof message === "string") {
    const msgBuffer = new TextEncoder().encode(message);
    buffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  } else {
    buffer = await crypto.subtle.digest("SHA-256", message);
  }
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function hashFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  return sha256(arrayBuffer);
}

// Generate a cryptographic commitment (simplified as H(hash + salt))
export async function generateCommitment(hash: string, salt: string = "lexvault-demo-salt"): Promise<string> {
  return sha256(hash + salt);
}

// Mock structure for Merkle Tree visualization
export interface MerkleNode {
  id: string;
  hash: string;
  status: "VALID" | "INVALID";
  position?: "left" | "right" | "root";
  children?: MerkleNode[];
  label: string;
}

export async function generateDemoMerkleTree(fileHash: string): Promise<MerkleNode> {
  // For the demo, we derive deterministic fake "chunk" hashes from the file hash
  const chunk1 = await sha256(fileHash + "-chunk1");
  const chunk2 = await sha256(fileHash + "-chunk2");
  const chunk3 = await sha256(fileHash + "-chunk3");
  const chunk4 = await sha256(fileHash + "-chunk4");

  const hashAB = await sha256(chunk1 + chunk2);
  const hashCD = await sha256(chunk3 + chunk4);
  const rootHash = await sha256(hashAB + hashCD);

  return {
    id: "root",
    label: "Merkle Root",
    hash: rootHash,
    status: "VALID",
    position: "root",
    children: [
      {
        id: "nodeAB",
        label: "Hash AB",
        hash: hashAB,
        status: "VALID",
        children: [
          { id: "chunk1", label: "Chunk 1", hash: chunk1, status: "VALID", position: "left" },
          { id: "chunk2", label: "Chunk 2", hash: chunk2, status: "VALID", position: "right" },
        ],
      },
      {
        id: "nodeCD",
        label: "Hash CD",
        hash: hashCD,
        status: "VALID",
        children: [
          { id: "chunk3", label: "Chunk 3", hash: chunk3, status: "VALID", position: "left" },
          { id: "chunk4", label: "Chunk 4", hash: chunk4, status: "VALID", position: "right" },
        ],
      },
    ],
  };
}

export function generateId(): string {
  return "LV-2026-" + Math.floor(Math.random() * 90000 + 10000).toString();
}
