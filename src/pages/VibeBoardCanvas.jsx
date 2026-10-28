import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { ArrowLeft, Loader2 } from "lucide-react";
import VibeShell from "@/components/vibe/VibeShell";
import AddElementPanel from "@/components/vibe/AddElementPanel";
import ElementCard from "@/components/vibe/ElementCard";
import FontPairCard from "@/components/vibe/FontPairCard";
import { useVibeBoard } from "@/hooks/useVibeBoard";

/** Board canvas: input panel on the left, live element grid on the right. */
export default function VibeBoardCanvas() {
  const { boardId } = useParams();
  const { board, elements, addElement, deleteElement, updateBoard } = useVibeBoard(boardId);

  if (board === null) {
    return (
      <VibeShell>
        <div className="flex justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-[#9a9a9a]" />
        </div>
      </VibeShell>
    );
  }

  if (board === false) {
    return (
      <VibeShell>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-[15px] font-medium text-white">Board not found</p>
          <Link to="/vibe" className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-[#00E676] hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
          </Link>
        </div>
      </VibeShell>
    );
  }

  return (
    <VibeShell>
      <div className="fade-in flex min-h-[calc(100vh-0px)] flex-col md:flex-row">
        {/* Input control panel */}
        <aside className="w-full shrink-0 border-b border-[#2A2A2A] bg-[#181818] md:sticky md:top-0 md:h-screen md:w-72 md:overflow-y-auto md:border-b-0 md:border-r">
          <div className="border-b border-[#2A2A2A] px-4 py-4">
            <Link to="/vibe" className="inline-flex items-center gap-1.5 text-[12px] text-[#9a9a9a] hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> All boards
            </Link>
            <h1 className="mt-2 truncate text-[16px] font-bold tracking-tight text-white">{board.name}</h1>
            <p className="mt-0.5 text-[12px] text-[#9a9a9a]">
              Created {moment(board.created_date).format("MMM D, YYYY")} · syncs live
            </p>
          </div>
          <AddElementPanel
            fonts={{ heading_font: board.heading_font, body_font: board.body_font }}
            onFontsChange={(next) => updateBoard(next)}
            onAddText={(word) => addElement({ type: "text", value: word })}
            onAddColor={(hex, label) => addElement({ type: "color", value: hex, label: label || undefined })}
            onAddImage={(url) => addElement({ type: "image", value: url })}
          />
        </aside>

        {/* Canvas grid */}
        <div className="min-w-0 flex-1 px-4 py-5 md:px-6">
          {elements.length === 0 && !board.heading_font && !board.body_font ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#2A2A2A] py-24 text-center">
              <p className="text-[15px] font-medium text-white">The canvas is empty</p>
              <p className="mt-1 max-w-xs text-[13px] text-[#9a9a9a]">
                Add words, colors, images, and a font pairing from the panel — they appear here instantly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <FontPairCard
                board={board}
                onClear={() => updateBoard({ heading_font: null, body_font: null })}
              />
              {elements.map((el) => (
                <ElementCard key={el.id} element={el} onDelete={deleteElement} />
              ))}
            </div>
          )}
        </div>
      </div>
    </VibeShell>
  );
}