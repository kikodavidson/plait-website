import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FONT_OPTIONS } from "@/lib/vibeFonts";

const inputCls =
  "w-full rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] px-3 py-2 text-[13.5px] text-white placeholder:text-[#6b6b6b] outline-none transition-colors focus:border-[#00E676]";
const addBtnCls =
  "inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#00E676] text-[13px] font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40";
const sectionTitle = "mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9a9a9a]";

function Section({ title, children }) {
  return (
    <div className="border-b border-[#2A2A2A] px-4 py-5 last:border-b-0">
      <h4 className={sectionTitle}>{title}</h4>
      {children}
    </div>
  );
}

/** Left-column input controls that push new elements onto the canvas. */
export default function AddElementPanel({ fonts, onFontsChange, onAddText, onAddColor, onAddImage }) {
  const [word, setWord] = useState("");
  const [hex, setHex] = useState("#619E80");
  const [colorLabel, setColorLabel] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addWord = () => {
    const v = word.trim();
    if (!v) return;
    onAddText(v);
    setWord("");
  };

  const addColor = () => {
    onAddColor(hex, colorLabel.trim());
    setColorLabel("");
  };

  const addImage = () => {
    const v = imageUrl.trim();
    if (!v) return;
    onAddImage(v);
    setImageUrl("");
  };

  return (
    <div className="divide-y divide-[#2A2A2A]">
      <Section title="Add Word / Keyword">
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addWord()}
          placeholder="Bold, Minimal, Organic…"
          className={inputCls}
        />
        <button onClick={addWord} disabled={!word.trim()} className={`mt-2 ${addBtnCls}`}>
          Add to board
        </button>
      </Section>

      <Section title="Add Color Swatch">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-9 w-12 shrink-0 cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-1"
          />
          <input
            value={colorLabel}
            onChange={(e) => setColorLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addColor()}
            placeholder="Label, e.g. Moss"
            className={inputCls}
          />
        </div>
        <p className="mt-1.5 font-mono text-[12px] text-[#9a9a9a]">{hex.toUpperCase()}</p>
        <button onClick={addColor} className={`mt-2 ${addBtnCls}`}>
          Add to board
        </button>
      </Section>

      <Section title="Add Image URL">
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addImage()}
          placeholder="https://…"
          className={inputCls}
        />
        <button
          onClick={addImage}
          disabled={!/^https?:\/\/.+/i.test(imageUrl.trim())}
          className={`mt-2 ${addBtnCls}`}
        >
          Add to board
        </button>
      </Section>

      <Section title="Font Pairings">
        <label className="mb-1 block text-[12px] text-[#9a9a9a]">Heading font</label>
        <Select
          value={fonts.heading_font || ""}
          onValueChange={(v) => onFontsChange({ ...fonts, heading_font: v })}
        >
          <SelectTrigger className="h-9 w-full rounded-lg border-[#2A2A2A] bg-[#1C1C1C] text-[13.5px] text-white">
            <SelectValue placeholder="Select heading font" />
          </SelectTrigger>
          <SelectContent className="border-[#2A2A2A] bg-[#1C1C1C] text-white">
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value} className="text-[13.5px]">
                <span style={{ fontFamily: f.stack }}>{f.value}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label className="mb-1 mt-3 block text-[12px] text-[#9a9a9a]">Body font</label>
        <Select
          value={fonts.body_font || ""}
          onValueChange={(v) => onFontsChange({ ...fonts, body_font: v })}
        >
          <SelectTrigger className="h-9 w-full rounded-lg border-[#2A2A2A] bg-[#1C1C1C] text-[13.5px] text-white">
            <SelectValue placeholder="Select body font" />
          </SelectTrigger>
          <SelectContent className="border-[#2A2A2A] bg-[#1C1C1C] text-white">
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value} className="text-[13.5px]">
                <span style={{ fontFamily: f.stack }}>{f.value}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mt-2 text-[11.5px] leading-relaxed text-[#6b6b6b]">
          Selections preview as a pairing card on the canvas.
        </p>
      </Section>
    </div>
  );
}