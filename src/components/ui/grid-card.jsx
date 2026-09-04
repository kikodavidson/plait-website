import * as React from "react";

import { cn } from "@/lib/utils";

const GridCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group/grid-card relative flex h-full w-full flex-col items-start gap-4 overflow-hidden border border-border bg-background p-5 text-left transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
      className
    )}
    {...props}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/grid-card:opacity-100"
      style={{
        backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.09) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    />
    {children}
  </a>
));
GridCard.displayName = "GridCard";

export { GridCard };