import React, { useEffect, useRef, useState } from "react";

export default function FunnelAnswer({ item, editor, onSave }) {
  const [answer, setAnswer] = useState(item.answer || "");
  const timer = useRef(null);
  const area = useRef(null);
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setAnswer(item.answer || "");
  }, [item.answer]);

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 40)}px`;
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

  return (
    <div className="border-b border-[#efece8] py-4 last:border-b-0">
      <p className="text-[14px] font-bold leading-snug text-[#1a1a1a]">{item.title}</p>
      <textarea
        ref={area}
        value={answer}
        placeholder="Type your answer…"
        rows={1}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={flush}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full resize-none rounded-lg border border-[#e5e2dc] bg-white px-3 py-2 text-[14px] leading-relaxed text-[#1a1a1a] outline-none placeholder:text-[#b3aea6] focus:border-[#619e80]"
      />
    </div>
  );
}