import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ImageOff, Loader2, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VibeShell from "@/components/vibe/VibeShell";
import { useVibeBoardList } from "@/hooks/useVibeBoard";

function BoardCard({ board, thumb, count, onEdit }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] transition-colors hover:border-[#3d3d3d]">
      <div className="relative aspect-[16/10] bg-[#161616]">
        {thumb ? (
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#4a4a4a]">
            <ImageOff className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate text-[15px] font-semibold text-white">{board.name}</h3>
        <p className="mt-0.5 text-[12px] text-[#9a9a9a]">
          {moment(board.created_date).format("MMM D, YYYY")} · {count} element{count === 1 ? "" : "s"}
        </p>
        <Button
          onClick={() => onEdit(board)}
          variant="outline"
          className="mt-3 h-9 w-full rounded-lg border-[#3d3d3d] bg-transparent text-[13px] font-medium text-white hover:bg-[#242424] hover:text-white"
        >
          <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit Board
        </Button>
      </div>
    </div>
  );
}

/** Grid of existing vibe boards with thumbnails, plus board creation. */
export default function VibeDashboard() {
  const navigate = useNavigate();
  const { boards, elements, loading, createBoard } = useVibeBoardList();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const byBoard = useMemo(() => {
    const map = {};
    for (const e of elements) {
      if (!map[e.board_id]) map[e.board_id] = [];
      map[e.board_id].push(e);
    }
    return map;
  }, [elements]);

  const create = async () => {
    const n = name.trim();
    if (!n) return;
    setBusy(true);
    try {
      const board = await createBoard(n);
      setOpen(false);
      navigate(`/vibe/${board.id}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <VibeShell>
      <div className="fade-in px-5 py-6 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[20px] font-bold tracking-tight text-white">Vibe Boards</h1>
            <p className="mt-0.5 text-[13px] text-[#9a9a9a]">
              Mood boards for the new brand — built together, synced live.
            </p>
          </div>
          <Button
            onClick={() => {
              setName("");
              setOpen(true);
            }}
            className="h-10 rounded-lg bg-[#00E676] px-4 text-[13.5px] font-semibold text-black transition-opacity hover:bg-[#00E676] hover:opacity-90"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Create New Board
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#9a9a9a]" />
          </div>
        ) : boards.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#2A2A2A] py-20 text-center">
            <p className="text-[15px] font-medium text-white">No boards yet</p>
            <p className="mt-1 max-w-xs text-[13px] text-[#9a9a9a]">
              Create your first board and start collecting words, colors, images, and fonts.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boards.map((b) => {
              const els = byBoard[b.id] || [];
              const thumb = els.find((e) => e.type === "image")?.value;
              return (
                <BoardCard
                  key={b.id}
                  board={b}
                  thumb={thumb}
                  count={els.length}
                  onEdit={(bd) => navigate(`/vibe/${bd.id}`)}
                />
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm border-[#2A2A2A] bg-[#1C1C1C] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Create a new board</DialogTitle>
            <DialogDescription className="text-[#9a9a9a]">
              Name it, then open the empty canvas and start adding elements.
            </DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && create()}
            placeholder="Board name, e.g. 'Quiet Luxury'"
            className="h-10 rounded-lg border-[#2A2A2A] bg-[#161616] text-white placeholder:text-[#6b6b6b]"
          />
          <DialogFooter>
            <Button
              onClick={create}
              disabled={busy || !name.trim()}
              className="h-9 rounded-lg bg-[#00E676] px-4 text-[13px] font-semibold text-black hover:bg-[#00E676] hover:opacity-90"
            >
              {busy && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              Create board
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VibeShell>
  );
}