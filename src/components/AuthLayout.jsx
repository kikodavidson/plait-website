import React from "react";

// onDark: render over a dark shader background — transparent page, light text,
// and the wordmark gets a cream chip so it stays visible against the canvas.
export default function AuthLayout({ icon: Icon, logo, title, subtitle, footer, children, onDark }) {
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${onDark ? "" : "bg-background"}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          {logo ? (
            onDark ? (
              <div className="inline-block rounded-[2rem] bg-[#F5F3ED] px-10 py-4 mb-4">
                <img src={logo} alt="PLAIT" className="h-32 w-auto max-w-[260px] mx-auto object-contain mix-blend-multiply" />
              </div>
            ) : (
              <img src={logo} alt="PLAIT" className="h-56 w-auto max-w-[340px] mx-auto mb-2 object-contain mix-blend-multiply" />
            )
          ) : (
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
              <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
            </div>
          )}
          <h1 className={`text-3xl font-bold tracking-tight ${onDark ? "text-white" : "text-foreground"}`}>{title}</h1>
          {subtitle && <p className={`mt-2 ${onDark ? "text-white/60" : "text-muted-foreground"}`}>{subtitle}</p>}
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
          {children}
        </div>
        {footer && (
          <p className={`text-center text-sm mt-6 ${onDark ? "text-white/60" : "text-muted-foreground"}`}>{footer}</p>
        )}
      </div>
    </div>
  );
}