import React, { useState } from "react";
import VibeDashboardContent from "@/components/vibe/VibeDashboardContent";
import VibeBoardContent from "@/components/vibe/VibeBoardContent";

/** Brand Vibe Board section of the partnership HQ: board list, then the live canvas. */
export default function VibeBoardsTab() {
  const [boardId, setBoardId] = useState(null);

  return (
    <div className="fade-in overflow-hidden rounded-2xl border border-[#e5e2dc] bg-[#121212] text-white">
      {boardId ? (
        <VibeBoardContent boardId={boardId} onBack={() => setBoardId(null)} />
      ) : (
        <VibeDashboardContent onOpen={setBoardId} />
      )}
    </div>
  );
}