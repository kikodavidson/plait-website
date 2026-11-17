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
import { ACCENT, STATUS, STEPS } from "@/lib/funnelPlan";
import { SECTIONS, jumpToSection, nextStatus } from "@/lib/taskSections";
import ChecklistLink from "@/components/funnel/ChecklistLink";

const SectionHead = ({ number, title, blurb, task, onToggle }) => (
  <div>
    <p className="text-[10px] font-extrabold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
      {number}
    </p>
    <h2
      className="mt-2 text-3xl font-extrabold leading-tight text-[#1a1a1a] sm:text-4xl"
      style={{ WebkitTextFillColor: "#1a1a1a", backgroundImage: "none" }}
    >
      {title}
    </h2>
    {blurb && <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#6b6b6b]">{blurb}</p>}
    {task && <ChecklistLink task={task} onToggle={onToggle} />}
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
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

  // The action-plan task a section is the working content for, so the two stay together.
  const taskFor = (id) => {
    const section = SECTIONS.find((s) => s.id === id);
    return section && section.task ? data.tasks.find((t) => t.title === section.task) : null;
  };
  const toggleTask = (task) => data.updateTask(task.id, { status: nextStatus[task.status] || "in_progress" });

  if (!data.loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e5e2dc] border-t-[#619e80]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10">
        <FunnelHeader overall={overall} done={done} total={total} saving={data.saving} />

        <div className="sticky top-0 z-20 -mx-4 mt-8 border-b border-[#efece8] bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full border border-[#e5e2dc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b] transition-colors hover:border-[#619e80] hover:text-[#1a1a1a]"
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
            <PhaseBoard data={data} userName={userName} onJump={jumpToSection} />
          </div>
        </section>

        <section id="services" className="mt-16 scroll-mt-20">
          <SectionHead
            number="02 — Services & deliverables"
            title="What we actually sell"
            blurb="Every service with the deliverables inside it. Click a line to edit, Enter to add another deliverable."
            task={taskFor("services")}
            onToggle={toggleTask}
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
            task={taskFor("feature-benefit")}
            onToggle={toggleTask}
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
            task={taskFor("name-tester")}
            onToggle={toggleTask}
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
            task={taskFor("funnel-map")}
            onToggle={toggleTask}
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