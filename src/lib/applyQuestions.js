// Booking calendar and free guide links — paste them here when ready.
export const BOOKING_URL = "";
export const GUIDE_URL = "";

export const TOTAL_STEPS = 14;

export const CONTACT_FIELDS = [
  { key: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email" },
  { key: "company", label: "Company name", type: "text", placeholder: "Company", autoComplete: "organization" },
  { key: "website", label: "Website URL", type: "text", placeholder: "yourcompany.com", autoComplete: "url" },
];

export const QUESTIONS = [
  {
    key: "role",
    type: "choice",
    label: "What's your role?",
    options: [
      { value: "founder", label: "Founder or co-founder" },
      { value: "marketing_lead", label: "Marketing lead" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "sells",
    type: "choice",
    label: "What do you sell?",
    options: [
      { value: "ecommerce", label: "E-commerce" },
      { value: "saas", label: "SaaS" },
      { value: "app", label: "App" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "stage",
    type: "choice",
    label: "What stage are you at?",
    options: [
      { value: "pre_launch", label: "Getting ready to launch" },
      { value: "under_year", label: "Launched less than a year ago" },
      { value: "established", label: "Established and growing" },
    ],
  },
  {
    key: "ad_spend",
    type: "choice",
    label: "Monthly ad spend right now?",
    options: [
      { value: "none", label: "Not running ads yet" },
      { value: "under_5k", label: "Under 5k" },
      { value: "5k_15k", label: "5k to 15k" },
      { value: "15k_30k", label: "15k to 30k" },
      { value: "30k_100k", label: "30k to 100k" },
      { value: "100k_plus", label: "100k+" },
    ],
  },
  {
    key: "budget_6mo",
    type: "choice",
    label: "Total marketing budget for the next 6 months?",
    options: [
      { value: "under_10k", label: "Under 10k" },
      { value: "10k_25k", label: "10k to 25k" },
      { value: "25k_50k", label: "25k to 50k" },
      { value: "50k_plus", label: "50k+" },
    ],
  },
  {
    key: "differentiator",
    type: "text",
    label: "What makes your product different from the big brands in your space?",
    placeholder: "Type your answer...",
  },
  {
    key: "margins",
    type: "choice",
    label: "Roughly what are your margins?",
    options: [
      { value: "under_30", label: "Under 30%" },
      { value: "30_50", label: "30% to 50%" },
      { value: "50_70", label: "50% to 70%" },
      { value: "over_70", label: "Over 70%" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    key: "adjust_pricing",
    type: "choice",
    label: "Would you adjust pricing if it meant better margins?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe" },
    ],
  },
  {
    key: "profit_timing",
    type: "choice",
    label: "When do you expect ads to be profitable?",
    options: [
      { value: "first_month", label: "First month" },
      { value: "within_3_months", label: "Within 3 months" },
      { value: "long_term", label: "We're building for the long term" },
    ],
  },
  {
    key: "agencies",
    type: "choice",
    label: "How many agencies have you worked with in the last 2 years?",
    options: [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3+", label: "3+" },
    ],
  },
  {
    key: "looking_for",
    type: "choice",
    label: "What are you looking for?",
    options: [
      { value: "run_it", label: "Someone to run what I tell them" },
      { value: "partner", label: "A partner to build the strategy with me" },
    ],
  },
  {
    key: "share_numbers",
    type: "choice",
    label: "Are you open to sharing past ad and sales numbers?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "growth_blocker",
    type: "text",
    label: "What's the biggest thing holding your growth back?",
    placeholder: "Type your answer...",
  },
];

export const QUESTION_BY_KEY = QUESTIONS.reduce((acc, q) => ({ ...acc, [q.key]: q }), {});

export const optionLabel = (key, value) => {
  const question = QUESTION_BY_KEY[key];
  const option = question?.options?.find((o) => o.value === value);
  return option ? option.label : value || "—";
};

export const questionLabel = (key) => QUESTION_BY_KEY[key]?.label || key;

export const RESULT_META = {
  qualified: { label: "Qualified", className: "border-[#cfe3d8] bg-[#eef5f1] text-[#3d6b52]" },
  review: { label: "Review", className: "border-[#f0e0ae] bg-[#fdf3d7] text-[#8a6100]" },
  not_fit: { label: "Not a Fit", className: "border-[#e5e2dc] bg-[#f2f0ee] text-[#6b6b6b]" },
  incomplete: { label: "Incomplete", className: "border-[#e5e2dc] bg-[#f2f0ee] text-[#6b6b6b]" },
};

export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "call_booked", label: "Call Booked" },
  { value: "client", label: "Client" },
  { value: "passed", label: "Passed" },
];