import React from "react";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

/** Small halftone-dot header banner for Partnership HQ. */
export default function HalftoneHeader() {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="brand buildout"
        label="Partnership HQ"
        meta="Max + Luke"
        columns={[]}
        backToTop={false}
        height="170px"
        crop={0.1}
        grain={0.4}
        radius={70}
        palette={{ background: "#1a1a1a", ink: "#e5e2dc", warm: "#619e80" }}
        fontFamily="'Mavora Sans', Arial, sans-serif"
        fontWeight={800}
      />
    </div>
  );
}