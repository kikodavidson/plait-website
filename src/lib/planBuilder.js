export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const CONTENT_TYPES = [
  "HQ photo", "graphic carousel", "UGC", "HQ video edit", "static graphic", "motion graphic",
];

const CONTENT_CODE = {
  "HQ photo": "HQ",
  "graphic carousel": "CAR",
  "UGC": "UGC",
  "HQ video edit": "VID",
  "static graphic": "STAT",
  "motion graphic": "MO",
};

// Label format: MONTH_ANGLE_NUMBER e.g. JUN_A1_HQ_01
export function exampleLabel({ month, angleType, angleOrder, contentType, seq }) {
  const m = (month || "").slice(0, 3).toUpperCase();
  const a = angleType === "audience" ? "A" : angleType === "concept" ? "C" : "X";
  const code = CONTENT_CODE[contentType] || "XX";
  return `${m}_${a}${angleOrder}_${code}_${String(seq).padStart(2, "0")}`;
}