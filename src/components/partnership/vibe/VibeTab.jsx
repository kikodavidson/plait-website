import React, { useState } from "react";
import { PHASES, phaseDone } from "./vibeMeta";
import VibeTracker from "./VibeTracker";
import PhaseFooter from "./PhaseFooter";
import FoundationPhase from "./FoundationPhase";
import CollectPhase from "./CollectPhase";
import DirectionsPhase from "./DirectionsPhase";
import PickPhase from "./PickPhase";
import BuildPhase from "./BuildPhase";
import LockPhase from "./LockPhase";

/** Brand Vibe Board: 6 phases from a feeling to a locked brand identity. */
export default function VibeTab({ data, userName }) {
  const phases = React.useMemo(
    () => [...data.vibePhases].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.vibePhases]
  );
  const firstOpen = phases.findIndex((p) => !phaseDone(p));
  const current = firstOpen === -1 ? phases.length - 1 : firstOpen;
  const [selected, setSelected] = useState(null);
  const shown = selected ?? current;

  if (phases.length < PHASES.length) {
    return <p className="text-[14px] text-[#9a9a9a]">Setting up the vibe board…</p>;
  }

  const record = phases[shown];
  const meta = PHASES[shown];

  return (
    <div className="fade-in">
      <div className="mb-5">
        <h3 className="text-[18px] font-semibold text-[#1a1a1a]">Brand Vibe Board</h3>
        <p className="mt-0.5 text-[13px] text-[#9a9a9a]">
          From a feeling to a finished brand identity, one phase at a time.
        </p>
      </div>

      <VibeTracker phases={phases} selectedIndex={shown} current={current} onSelect={setSelected} />

      <div className="mt-6">
        <h4 className="text-[16px] font-semibold text-[#1a1a1a]">
          {shown + 1}. {meta.label}
        </h4>
        <p className="mb-4 mt-0.5 text-[13.5px] text-[#6b6b6b]">{meta.blurb}</p>

        {meta.key === "foundation" && <FoundationPhase phase={record} data={data} />}
        {meta.key === "collect" && <CollectPhase items={data.vibeItems} data={data} userName={userName} />}
        {meta.key === "directions" && (
          <DirectionsPhase items={data.vibeItems} data={data} userName={userName} />
        )}
        {meta.key === "pick" && <PickPhase items={data.vibeItems} data={data} />}
        {meta.key === "build" && <BuildPhase items={data.vibeItems} data={data} userName={userName} />}
        {meta.key === "lock" && <LockPhase phases={phases} items={data.vibeItems} />}

        <PhaseFooter phase={record} data={data} />
      </div>
    </div>
  );
}