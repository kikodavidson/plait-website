import moment from "moment";

export const STATUSES = [
  { value: "new", label: "New", color: "#9a9a9a" },
  { value: "researching", label: "Researching", color: "#2c5aa8" },
  { value: "reached_out", label: "Reached Out", color: "#d9a400" },
  { value: "replied", label: "Replied", color: "#6a4bab" },
  { value: "call_booked", label: "Call Booked", color: "#b0568f" },
  { value: "proposal_sent", label: "Proposal Sent", color: "#b0532f" },
  { value: "won", label: "Won", color: "#0c5c34" },
  { value: "lost", label: "Lost", color: "#6b6b6b" },
  { value: "not_a_fit", label: "Not a Fit", color: "#c4c4c4" },
];
export const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.value, s]));
export const statusLabel = (v) => STATUS_MAP[v]?.label || v || "";

export const SOURCES = [
  { value: "max_list", label: "Max's list" },
  { value: "luke_list", label: "Luke's list" },
  { value: "referral", label: "Referral" },
  { value: "inbound", label: "Inbound" },
  { value: "other", label: "Other" },
];
export const SOURCE_MAP = Object.fromEntries(SOURCES.map((s) => [s.value, s]));

export const OWNERS = ["Luke", "Max"];

export const INDUSTRIES = [
  "Beauty",
  "Supplements",
  "Home",
  "Apps",
  "Fashion",
  "Fitness",
  "Food & Beverage",
  "Health",
  "SaaS",
  "Services",
  "Pet",
  "Jewelry",
  "Other",
];

const CONTACTED_STATUSES = [
  "reached_out",
  "replied",
  "call_booked",
  "proposal_sent",
  "won",
  "lost",
  "not_a_fit",
];

/** Leads that nobody has reached out to yet — used for the sidebar badge. */
export const notContacted = (lead) => !CONTACTED_STATUSES.includes(lead.status);

/** Follow up date is today or earlier. */
export const isDue = (lead) =>
  !!lead.next_follow_up && lead.next_follow_up <= moment().format("YYYY-MM-DD");

export function websiteHost(raw) {
  const v = (raw || "").trim();
  if (!v) return "";
  try {
    return new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
      .hostname.replace(/^www\./, "")
      .toLowerCase();
  } catch (e) {
    return v.toLowerCase();
  }
}

export function faviconUrl(raw) {
  const host = websiteHost(raw);
  return host ? `https://www.google.com/s2/favicons?domain=${host}&sz=32` : null;
}

export function normalizeWebsite(raw) {
  const v = (raw || "").trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

/** Match a candidate lead against existing leads by brand name or website. */
export function dupeMatch(lead, leads) {
  const brand = (lead.brand_name || "").trim().toLowerCase();
  const host = websiteHost(lead.website);
  if (!brand && !host) return null;
  return (
    (leads || []).find((l) => {
      const lb = (l.brand_name || "").trim().toLowerCase();
      const lh = websiteHost(l.website);
      return (brand && lb === brand) || (host && lh === host);
    }) || null
  );
}

/** Map a free-text value (label or value) to one of the option values. */
export function mapChoice(options, raw) {
  const v = (raw || "").trim().toLowerCase();
  if (!v) return null;
  return (
    options.find((o) => o.value.toLowerCase() === v || o.label.toLowerCase() === v)?.value ||
    options.find((o) => o.label.toLowerCase().includes(v) || v.includes(o.label.toLowerCase()))
      ?.value ||
    null
  );
}