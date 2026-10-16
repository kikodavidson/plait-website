import React from "react";
import GlassFolder from "@/components/ui/glass-folder-cards";

/** Branding assets, contracts, and reference files for the partnership. */
export default function FilesTab() {
  return (
    <div
      className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl px-4 py-10 sm:px-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative grid w-full max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
        <GlassFolder
          label="Brand assets"
          art="aurora"
          seed={3}
          appearDelay={0}
          files={[
            { name: "Logo pack", meta: "SVG · PNG · EPS" },
            { name: "Primary wordmark", meta: "SVG", art: "verdant" },
            { name: "Brand colors", meta: "ASE · 12 KB" },
            { name: "Typography", meta: "PDF · 2 MB", art: "dusk" },
          ]}
        />
        <GlassFolder
          label="Contracts"
          art="none"
          action="more"
          labelPlacement="top-left"
          appearDelay={140}
          files={[
            { name: "Partnership agreement", meta: "PDF · 420 KB" },
            { name: "Operating agreement", meta: "PDF · 510 KB", art: "dusk" },
            { name: "MSA — clients", meta: "DOCX · 88 KB" },
            { name: "NDA template", meta: "PDF · 96 KB" },
          ]}
          menu={[{ label: "Rename" }, { label: "Share…" }, { label: "Move to Trash", danger: true }]}
        />
        <GlassFolder
          label="Reference files"
          meta="Oct 2026"
          tone="dark"
          art="ember"
          seed={11}
          action="none"
          labelPlacement="top-right"
          appearDelay={280}
          files={[
            { name: "Messaging notes", meta: "TXT · 4 KB" },
            { name: "Positioning draft", meta: "DOCX · 31 KB", art: "aurora" },
            { name: "Naming exercise", meta: "PDF · 240 KB", art: "verdant" },
          ]}
        />
      </div>
      <p className="relative mt-12 text-center text-[12px] text-[#6b6b6b]">
        Hover to lean · Click to open · + to add
      </p>
    </div>
  );
}