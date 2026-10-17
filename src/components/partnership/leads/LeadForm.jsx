import React from "react";
import { INDUSTRIES, OWNERS, SOURCES, STATUSES } from "./leadMeta";

const INPUT =
  "w-full rounded-lg border border-[#dcd5c9] px-3 py-2 text-[14px] outline-none focus:border-[#619e80]";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-semibold text-[#6b6b6b]">{label}</span>
      {children}
    </label>
  );
}

/** Controlled lead fields, shared by the add dialog and the detail panel. */
export default function LeadForm({ value, onChange }) {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value });
  return (
    <div className="space-y-3">
      <Field label="Brand name *">
        <input
          value={value.brand_name || ""}
          onChange={set("brand_name")}
          placeholder="Acme Skincare"
          className={INPUT}
        />
      </Field>
      <Field label="Website">
        <input
          value={value.website || ""}
          onChange={set("website")}
          placeholder="acme.com"
          className={INPUT}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Contact name">
          <input value={value.contact_name || ""} onChange={set("contact_name")} className={INPUT} />
        </Field>
        <Field label="Contact email">
          <input
            type="email"
            value={value.contact_email || ""}
            onChange={set("contact_email")}
            className={INPUT}
          />
        </Field>
        <Field label="Contact phone">
          <input value={value.contact_phone || ""} onChange={set("contact_phone")} className={INPUT} />
        </Field>
        <Field label="Social link (Instagram etc.)">
          <input
            value={value.social_link || ""}
            onChange={set("social_link")}
            placeholder="instagram.com/acme"
            className={INPUT}
          />
        </Field>
        <Field label="Industry">
          <input
            list="lead-industries"
            value={value.industry || ""}
            onChange={set("industry")}
            className={INPUT}
          />
        </Field>
        <Field label="Source">
          <select value={value.source || ""} onChange={set("source")} className={INPUT}>
            <option value="">—</option>
            {SOURCES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Owner">
          <select value={value.owner || ""} onChange={set("owner")} className={INPUT}>
            <option value="">—</option>
            {OWNERS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select value={value.status || "new"} onChange={set("status")} className={INPUT}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Next follow up">
          <input
            type="date"
            value={value.next_follow_up || ""}
            onChange={set("next_follow_up")}
            className={INPUT}
          />
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          rows={3}
          value={value.notes || ""}
          onChange={set("notes")}
          className={`${INPUT} resize-none`}
        />
      </Field>
      <datalist id="lead-industries">
        {INDUSTRIES.map((i) => (
          <option key={i} value={i} />
        ))}
      </datalist>
    </div>
  );
}