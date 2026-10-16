import React from "react";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

/** Small halftone-dot header banner for Partnership HQ. */
export default function HalftoneHeader() {
  return (
    <div className="w-full">
      <style>{`
        .phh .hwf-top { padding: 34px 9% 0; }
        .phh .hwf-rule { margin: 22px 9% 0; }
        .phh .hwf-brand span {
          display: block; margin-top: 10px;
          font-family: 'Mavora Sans', sans-serif;
          font-size: 44px; font-weight: 800; line-height: 1;
          letter-spacing: normal; text-transform: none; opacity: 1;
          user-select: none;
        }
        @media (max-width: 720px) {
          .phh .hwf-top { padding: 26px 9% 0; }
          .phh .hwf-rule { margin: 16px 9% 0; }
          .phh .hwf-brand span { font-size: 30px; }
        }
      `}</style>
      <HalftoneWordmarkFooter
        wordmark="brand buildout"
        topWord=""
        label="Partnership HQ"
        meta="Max + Luke's"
        columns={[]}
        backToTop={false}
        height="240px"
        crop={0.1}
        bottomInset={40}
        wordWidth={0.82}
        grain={0.3}
        radius={70}
        palette={{ background: "#ffffff", ink: "#000000", warm: "#619e80" }}
        fontFamily="'Mavora Sans', Arial, sans-serif"
        fontWeight={800}
        className="phh"
      />
    </div>
  );
}