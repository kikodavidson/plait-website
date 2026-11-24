import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { STATUS, OWNERS } from "@/lib/salesFunnel";

const selectClass =
  "rounded-lg border border-[#e5e2dc] bg-white px-2 py-1.5 text-[12px] font-semibold outline-none focus:border-[#619e80]";

export default function ItemCard({ item, editor, onSave }) {
  const [answer, setAnswer] = useState(item.answer || "");
  const [discuss, setDiscuss] = useState(!!item.need_discuss);
  const timer = useRef(null);
  const area = useRef(null);
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setAnswer(item.answer || "");
  }, [item.answer]);

  useEffect(() => {
    setDiscuss(!!item.need_discuss);
  }, [item.need_discuss]);

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 96)}px`;
  }, [answer]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const change = (value) => {
    setAnswer(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onSave({ answer: value }, editor), 600);
  };

  const flush = () => {
    focused.current = false;
    clearTimeout(timer.current);
    if ((item.answer || "") !== answer) onSave({ answer }, editor);
  };

  const meta =
    item.last_editor && item.edited_at
      ? `${item.last_editor} · ${moment(item.edited_at).fromNow()}`
      : "No edits yet";

  return (
    <div
      id={`item-${item.id}`}
      className={`scroll-mt-24 rounded-xl border p-3 transition-colors ${
        discuss ? "border-[#f0b27a] bg-[#fffaf3]" : "border-[#efece8] bg-[#faf9f7]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-[14px] font-bold leading-snug text-[#1a1a1a]">{item.title}</p>
        <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-[11px] text-[#6b6b6b]">
          <input
            type="checkbox"
            checked={discuss}
            onChange={(e) => {
              setDiscuss(e.target.checked);
              onSave({ need_discuss: e.target.checked }, editor);
            }}
            className="h-3.5 w-3.5 accent-[#d97706]"
          />
          Need to discuss
        </label>
      </div>

      <textarea
        ref={area}
        value={answer}
        placeholder="Type your answer…"
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={flush}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full resize-none rounded-lg border border-[#e5e2dc] bg-white px-3 py-2 text-[14px] leading-relaxed text-[#1a1a1a] outline-none focus:border-[#619e80]"
      />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <select
          value={item.status || "not_started"}
          onChange={(e) => onSave({ status: e.target.value }, editor)}
          className={selectClass}
          style={{ color: (STATUS[item.status] || STATUS.not_started).text }}
        >
          {Object.entries(STATUS).map(([key, meta2]) => (
            <option key={key} value={key}>
              {meta2.label}
            </option>
          ))}
        </select>

        <select
          value={item.owner || "Both"}
          onChange={(e) => onSave({ owner: e.target.value }, editor)}
          className={selectClass}
          style={{ color: "#3a3a3a" }}
        >
          {OWNERS.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>

        <span className="ml-auto text-[11px] text-[#9a9a9a]">{meta}</span>
      </div>
    </div>
  );
}