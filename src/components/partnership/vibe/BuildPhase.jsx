import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const hexOk = (v) => /^#[0-9a-fA-F]{3,8}$/.test(v.trim());

/** Phase 5 — build the chosen direction out into colors and fonts. */
export default function BuildPhase({ items, data, userName }) {
  const colors = items.filter((it) => it.phase === "build" && it.item_type === "color");
  const fonts = items.filter((it) => it.phase === "build" && it.item_type === "font");
  const [cName, setCName] = useState("");
  const [cHex, setCHex] = useState("#");
  const [fName, setFName] = useState("");
  const [fNote, setFNote] = useState("");

  const addColor = async () => {
    const title = cName.trim();
    const hex = cHex.trim();
    if (!title || !hexOk(hex)) return;
    await data.addVibeItem({
      phase: "build", item_type: "color", title, color_hex: hex, added_by: userName,
    });
    setCName("");
    setCHex("#");
  };

  const addFont = async () => {
    const title = fName.trim();
    if (!title) return;
    await data.addVibeItem({
      phase: "build", item_type: "font", title, body: fNote.trim(), added_by: userName,
    });
    setFName("");
    setFNote("");
  };

  return (
    <div className="space-y-8">
      <section>
        <h4 className="text-[15px] font-semibold text-[#1a1a1a]">Colors</h4>
        {colors.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map((c) => (
              <div key={c.id} className="group relative">
                <div
                  className="flex h-24 w-24 flex-col justify-end rounded-xl border border-[#e5e2dc] p-2"
                  style={{ backgroundColor: c.color_hex }}
                >
                  <span
                    className="truncate text-[11.5px] font-semibold"
                    style={{ color: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c.color_hex) ? pickInk(c.color_hex) : "#fff" }}
                  >
                    {c.title}
                  </span>
                </div>
                <button
                  onClick={() => data.deleteVibeItem(c.id)}
                  className="absolute -right-1.5 -top-1.5 rounded-md bg-white p-1 text-[#c4c4c4] opacity-0 shadow-sm transition-opacity hover:text-[#b0532f] group-hover:opacity-100"
                  aria-label="Remove color"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={cName}
            onChange={(e) => setCName(e.target.value)}
            placeholder="Color name, e.g. Moss"
            className="w-40 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
          />
          <input
            value={cHex}
            onChange={(e) => setCHex(e.target.value)}
            placeholder="#619e80"
            className="w-28 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 font-mono text-[13px] outline-none focus:border-[#619e80]"
          />
          <span
            className="h-6 w-6 rounded-full border border-[#e5e2dc]"
            style={{ backgroundColor: hexOk(cHex) ? cHex.trim() : "#fff" }}
          />
          <button
            onClick={addColor}
            disabled={!cName.trim() || !hexOk(cHex)}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" /> Add color
          </button>
        </div>
      </section>

      <section>
        <h4 className="text-[15px] font-semibold text-[#1a1a1a]">Fonts</h4>
        {fonts.length > 0 && (
          <div className="mt-3 space-y-2">
            {fonts.map((f) => (
              <div
                key={f.id}
                className="group flex items-center justify-between rounded-xl border border-[#e5e2dc] bg-white px-4 py-3"
              >
                <div>
                  <p className="text-[15px] font-semibold text-[#1a1a1a]">{f.title}</p>
                  {f.body && <p className="text-[13px] text-[#6b6b6b]">{f.body}</p>}
                </div>
                <button
                  onClick={() => data.deleteVibeItem(f.id)}
                  className="rounded-md p-1 text-[#c4c4c4] opacity-0 transition-opacity hover:text-[#b0532f] group-hover:opacity-100"
                  aria-label="Remove font"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="Font name, e.g. Mavora Sans"
            className="w-48 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
          />
          <input
            value={fNote}
            onChange={(e) => setFNote(e.target.value)}
            placeholder="Usage note (headings, body…)"
            className="min-w-[160px] flex-1 rounded-lg border border-[#dcd5c9] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#619e80]"
          />
          <button
            onClick={addFont}
            disabled={!fName.trim()}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#00E676] px-2.5 text-[12px] font-semibold text-[#0c130e] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" /> Add font
          </button>
        </div>
      </section>
    </div>
  );
}

/** Rough luminance check so the color name reads on its swatch. */
function pickInk(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#1a1a1a" : "#ffffff";
}