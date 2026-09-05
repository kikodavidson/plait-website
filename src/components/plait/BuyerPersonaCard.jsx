import { clsx } from "clsx";

const PERSONA_IMG =
  "https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/83065e763_Screenshot2026-09-04at112122PM.png";

// Image-only card matching the height of its bento row siblings
// (h-[29rem] image + h-[14rem] panel - 110px overlap = 36.125rem).
export default function BuyerPersonaCard({ className = "" }) {
  return (
    <div
      className={clsx(
        className,
        "relative overflow-hidden rounded-lg bg-black shadow-sm ring-1 ring-white/10 transform-gpu"
      )}
    >
      <img
        src={PERSONA_IMG}
        alt="Verified Buyer Motives — customer persona dashboard"
        className="h-[36.125rem] w-full object-cover"
      />
    </div>
  );
}