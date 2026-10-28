/** Font options for the vibe board font-pairing picker. */
export const FONT_OPTIONS = [
  { value: "Playfair Display", stack: "'Playfair Display', Georgia, serif" },
  { value: "DM Serif Display", stack: "'DM Serif Display', Georgia, serif" },
  { value: "Space Grotesk", stack: "'Space Grotesk', 'Helvetica Neue', sans-serif" },
  { value: "Montserrat", stack: "Montserrat, 'Helvetica Neue', sans-serif" },
  { value: "Lora", stack: "Lora, Georgia, serif" },
  { value: "Poppins", stack: "Poppins, 'Helvetica Neue', sans-serif" },
  { value: "Georgia", stack: "Georgia, serif" },
  { value: "Helvetica Neue", stack: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { value: "Courier New", stack: "'Courier New', Courier, monospace" },
  { value: "Impact", stack: "Impact, 'Arial Black', sans-serif" },
  { value: "Verdana", stack: "Verdana, Geneva, sans-serif" },
  { value: "Trebuchet MS", stack: "'Trebuchet MS', sans-serif" },
];

export const stackFor = (name) =>
  FONT_OPTIONS.find((f) => f.value === name)?.stack || "'Helvetica Neue', sans-serif";