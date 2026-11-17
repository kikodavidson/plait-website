import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import useFunnelPlan from "@/hooks/useFunnelPlan";
import SignInWall from "@/components/partnership/SignInWall";
import NoAccess from "@/components/partnership/NoAccess";
import FunnelHeader from "@/components/funnel/FunnelHeader";
import PhaseBoard from "@/components/funnel/PhaseBoard";
import ServicesList from "@/components/funnel/ServicesList";
import FeatureTable from "@/components/funnel/FeatureTable";
import NameTester from "@/components/funnel/NameTester";
import FunnelMap from "@/components/funnel/FunnelMap";
import StepPanel from "@/components/funnel/StepPanel";
import RulesCard from "@/components/funnel/RulesCard";
import { ACCENT, STEPS } from "@/lib/funnelPlan";

const SECTIONS = [
  { id: "action-plan", label: "Action plan" },
  { id: "services", label: "Services" },
  { id: "feature-benefit", label: "Feature to benefit" },
  { id: "name-tester", label: "Name tester" },
  { id: "funnel-map", label: "Funnel map" },
  { id: "rules", label: "Rules" },
];

const SectionHead = ({ number, title, blurb }) => (
  <div>
    <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
      {number}
    </p>
    <h2
      className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
      style={{ WebkitTextFillColor: "#ffffff", backgroundImage: "none" }}
    >
      {title}
    </h2>
    {blurb && <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#A9ACA2]">{blurb}</p>}
  </div>
);

export default function FunnelPlan() {
  const { user, isLoadingAuth } = useAuth();
  const data = useFunnelPlan();
  const [step, setStep] = useState(STEPS[0].key);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0C]">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#26262A] border-t-[#C8FF3D]" />
      </div>
    );
  }

  const slug = user?.client_slug || user?.data?.client_slug;
  const workspaces = user?.workspaces || user?.data?.workspaces || [];
  if (!user) return <SignInWall />;
  if (user.role !== "admin" && slug !== "partnership" && !workspaces.includes("partnership")) return <NoAccess />;

  const first = (user.full_name || user.email || "").split(" ")[0];
  const userName = ["Luke", "Max"].includes(first) ? first : user.role === "admin" ? "Luke" : "Max";

  const total = data.tasks.length;
  const done = data.tasks.filter((t) => t.status === "done").length;
  const overall = total ? Math.round((done / total) * 100) : 0;

  const activeStep = STEPS.find((s) => s.key === step) || STEPS[0];
  const stepNote = data.stepNotes.find((n) => n.step === step);
  const linkedTasks = data.tasks.filter((t) => t.funnel_step === step);

  if (!data.loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0C]">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#26262A] border-t-[#C8FF3D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
        <FunnelHeader overall={overall} done={done} total={total} saving={data.saving} />

        <div className="sticky top-0 z-20 -mx-4 mt-8 border-b border-[#1C1C20] bg-[#0B0B0C]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full border border-[#26262A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A9ACA2] transition-colors hover:border-[#C8FF3D] hover:text-white"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>

        <section id="action-plan" className="mt-12 scroll-mt-20">
          <SectionHead
            number="01 — Action plan"
            title="What has to happen, by phase"
            blurb="Tap the circle to move a task along, the arrows to reorder, the speech bubble to talk about it."
          />
          <div className="mt-5">
            <PhaseBoard data={data} userName={userName} />
          </div>
        </section>

        <section id="services" className="mt-16 scroll-mt-20">
          <SectionHead
            number="02 — Services & deliverables"
            title="What we actually sell"
            blurb="Every service with the deliverables inside it. Click a line to edit, Enter to add another deliverable."
          />
          <div className="mt-5">
            <ServicesList
              services={data.services}
              onAdd={data.addService}
              onSave={data.updateService}
              onDelete={data.deleteService}
            />
          </div>
        </section>

        <section id="feature-benefit" className="mt-16 scroll-mt-20">
          <SectionHead
            number="03 — Feature to benefit"
            title="Say it in their language"
            blurb="Every deliverable, translated from what we do into what they get and why it matters."
          />
          <div className="mt-5">
            <FeatureTable
              features={data.features}
              onAdd={data.addFeature}
              onSave={data.updateFeature}
              onDelete={data.deleteFeature}
            />
          </div>
        </section>

        <section id="name-tester" className="mt-16 scroll-mt-20">
          <SectionHead
            number="04 — Name tester"
            title="Pick the name that pulls"
            blurb="Four formulas, as many names as we can stand. Vote, log what the test said, and the top score lights up."
          />
          <div className="mt-5">
            <NameTester
              names={data.names}
              onAdd={data.addName}
              onUpdate={data.updateName}
              onVote={data.voteName}
              onDelete={data.deleteName}
            />
          </div>
        </section>

        <section id="funnel-map" className="mt-16 scroll-mt-20">
          <SectionHead
            number="05 — Funnel map"
            title="The path from stranger to call"
            blurb="Tap a step to see the tasks feeding it and leave the notes for that stage."
          />
          <div className="mt-5">
            <FunnelMap tasks={data.tasks} selected={step} onSelect={setStep} />
            <StepPanel
              key={step}
              step={activeStep}
              linkedTasks={linkedTasks}
              allTasks={data.tasks}
              notes={stepNote ? stepNote.notes : ""}
              onSaveNotes={data.saveStepNotes}
              onLink={(taskId) => data.updateTask(taskId, { funnel_step: step })}
              onUnlink={(taskId) => data.updateTask(taskId, { funnel_step: null })}
              onPatchTask={data.updateTask}
            />
          </div>
        </section>

        <section id="rules" className="mt-16 scroll-mt-20">
          <SectionHead number="06 — Rules we follow" title="The non-negotiables" />
          <div className="mt-5">
            <RulesCard />
          </div>
        </section>
      </div>
    </div>
  );
}