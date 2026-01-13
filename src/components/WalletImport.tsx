"use client";

import { useState } from "react";
import { Position } from "../types/position";

interface WalletImportProps {
  onPositionLoaded: (position: Position) => void;
}

export default function WalletImport({
  onPositionLoaded,
}: WalletImportProps) {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosition = async () => {
    if (!wallet) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/position?wallet=${wallet}`);
      if (!res.ok) throw new Error("Failed to fetch position");

      const data: Position = await res.json();
      onPositionLoaded(data);
    } catch (err) {
      setError("Could not load wallet position");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl border border-white/10 space-y-3">
      <h2 className="text-sm font-semibold opacity-80">
        Import Wallet Position
      </h2>

      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Wallet address"
        className="w-full px-3 py-2 rounded bg-black border border-white/10 outline-none"
      />

      <button
        onClick={loadPosition}
        disabled={loading}
        className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Import Position"}
      </button>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
