import React, { useState } from "react";
import { Check, History } from "lucide-react";
import StagePill from "./StagePill";
import ApprovalsBar from "./ApprovalsBar";
import SectionContent from "./SectionContent";
import ReopenControl from "./ReopenControl";
import VersionHistory from "./VersionHistory";
import DiscussionLog from "./DiscussionLog";
import SectionTasks from "./SectionTasks";
import SectionQuestions from "./SectionQuestions";

export default function SectionCard({ section, data, userName }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const locked = section.stage === "locked";
  const myKey = userName === "Luke" ? "approved_luke" : userName === "Max" ? "approved_max" : null;
  const myApproved = myKey ? !!section[myKey] : false;
  const otherApproved = !!section[myKey === "approved_luke" ? "approved_max" : "approved_luke"];
  const waitingOnMe = !locked && myKey && !myApproved && otherApproved;

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${locked ? "border-[#619e80] bg-[#fbfdfc]" : "border-[#e5e2dc]"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[19px]">{section.name}</h3>
        <div className="flex items-center gap-2">
          <StagePill section={section} onSet={(st) => data.setStage(section.id, st)} />
          <button
            onClick={() => setHistoryOpen((h) => !h)}
            className="inline-flex items-center gap-1 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a]"
          >
            <History className="h-3.5 w-3.5" /> History
          </button>
        </div>
      </div>
      <ApprovalsBar section={section} />
      <SectionContent section={section} data={data} />
      <div className="mt-4">
        {locked && <ReopenControl section={section} data={data} />}
        {!locked && myKey && !myApproved && (
          <button
            onClick={() => data.approve(section.id, userName)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#619e80] px-4 py-2 text-[14px] font-semibold text-white hover:opacity-90"
          >
            <Check className="h-4 w-4" /> {waitingOnMe ? "Approve and lock" : "Approve"}
          </button>
        )}
        {!locked && myKey && myApproved && (
          <button
            onClick={() => data.unapprove(section.id, userName)}
            className="rounded-full border border-[#e5e2dc] px-4 py-2 text-[14px] hover:border-[#b0532f] hover:text-[#b0532f]"
          >
            Withdraw approval
          </button>
        )}
      </div>
      {historyOpen && (
        <VersionHistory versions={data.versions.filter((v) => v.section_id === section.id)} />
      )}
      <DiscussionLog
        section={section}
        entries={data.notes.filter((n) => n.section_id === section.id)}
        data={data}
        userName={userName}
      />
      <SectionTasks section={section} tasks={data.tasks.filter((t) => t.section_id === section.id)} data={data} />
      <SectionQuestions
        section={section}
        questions={data.questions.filter((q) => q.section_id === section.id)}
        data={data}
        userName={userName}
      />
    </div>
  );
}