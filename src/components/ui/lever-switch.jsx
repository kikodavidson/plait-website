import { cn } from "@/lib/utils";

export function LeverSwitch({ checked, onChange, className }) {
  return (
    <div
      className={cn(
        "toggle-container relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        checked ? "bg-[#2d2d2d]" : "bg-gray-300",
        className
      )}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onChange?.(!checked)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange?.(!checked);
        }
      }}
    >
      <input
        className="toggle-input sr-only"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className="toggle-base absolute inset-0 rounded-full" />
      <div className="toggle-base-inside absolute inset-[2px] rounded-full ring-1 ring-inset ring-black/5" />
      <div
        className={cn(
          "toggle-handle-wrapper absolute top-1/2 -translate-y-1/2 transition-transform duration-200 ease-out",
          checked ? "translate-x-[24px]" : "translate-x-[2px]"
        )}
      >
        <div className="toggle-handle relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
          <div className="toggle-handle-knob absolute h-1.5 w-1.5 rounded-full bg-gray-400" />
          <div className="toggle-handle-bar-wrapper flex h-3 w-3 items-center justify-center">
            <div
              className={cn(
                "toggle-handle-bar h-[2px] w-3 rounded-full bg-gray-400 transition-transform duration-200",
                checked ? "rotate-0" : "-rotate-90"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeverSwitch;