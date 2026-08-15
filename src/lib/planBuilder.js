export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const CONTENT_TYPES = [
  "HQ photo", "graphic carousel", "UGC", "HQ video edit", "static graphic", "motion graphic",
];

export const VIDEO_FORMATS = [
  "Talking head", "Voiceover over b roll", "Testimonial", "Product demo", "Review",
  "Before and after", "Tutorial", "Reaction", "Unboxing", "Screen recording or app walkthrough",
  "Kinetic text", "Skit or scripted comedy", "Street interview", "Split screen comparison",
  "Transformation", "Duet or stitch", "Podcast clip", "Trend audio", "Day in the life",
  "Slideshow", "Montage", "Mashup or compilation", "Animated explainer", "Documentary or brand film",
  "Behind the scenes", "ASMR or sensory", "Vlog", "Livestream clip", "Whiteboard", "AI generated",
];

export const ON_CAMERA = [
  "Creator", "Customer", "Founder", "Product only", "Actor", "Employee", "Influencer", "Animated",
];

export const VIDEO_PRODUCTION_TIERS = [
  "Phone shot raw", "Phone shot edited", "Creator studio quality", "Motion design",
  "Studio lit", "Commercial production", "AI generated",
];

export const IMAGE_STYLES = [
  "Product on plain background", "Lifestyle photo", "Text only or typographic", "Review or testimonial screenshot",
  "Offer or promo graphic", "Before and after", "Stat or data card", "Comparison chart",
  "Quote card", "Founder or team photo", "Flat lay", "Infographic",
  "Phone shot UGC photo", "Packaging or unboxing shot", "Meme", "In use or demonstration",
  "Press or logo bar", "Ingredient or materials breakdown", "Size or fit guide", "Collage or grid",
  "Editorial or campaign shot", "Screenshot of app or interface", "Illustration", "AI generated",
];

export const IMAGE_SUBJECTS = [
  "Product only", "Product in use", "Customer or model", "Founder or team",
  "Text only", "Illustration or graphic", "Screenshot", "Animated or AI",
];

export const IMAGE_PRODUCTION_TIERS = [
  "Graphic design", "Phone shot raw", "Studio product photography", "Creator supplied photo",
  "Lifestyle shoot", "Stock assembled", "3D render", "AI generated",
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