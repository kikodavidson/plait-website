import React, { useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { CONTACT_FIELDS, QUESTIONS, TOTAL_STEPS } from "@/lib/applyQuestions";
import ProgressBar from "@/components/apply/ProgressBar";
import IntroScreen from "@/components/apply/IntroScreen";
import ContactStep from "@/components/apply/ContactStep";
import ChoiceStep from "@/components/apply/ChoiceStep";
import TextStep from "@/components/apply/TextStep";
import ResultScreen from "@/components/apply/ResultScreen";

const EMPTY_ANSWERS = {
  name: "",
  email: "",
  company: "",
  website: "",
  role: "",
  sells: "",
  stage: "",
  ad_spend: "",
  budget_6mo: "",
  differentiator: "",
  margins: "",
  adjust_pricing: "",
  profit_timing: "",
  agencies: "",
  looking_for: "",
  share_numbers: "",
  growth_blocker: "",
};

export default function Apply() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [record, setRecord] = useState(null);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const question = step > 1 ? QUESTIONS[step - 2] : null;

  const answered = useMemo(() => {
    if (step === 1) return CONTACT_FIELDS.every((field) => (answers[field.key] || "").trim().length > 0);
    if (!question) return false;
    return (answers[question.key] || "").trim().length > 0;
  }, [step, answers, question]);

  const setAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));

  const save = async (completed) => {
    const response = await base44.functions.invoke("saveApplyLead", {
      id: record?.id,
      code: record?.code,
      answers,
      completed,
    });
    const data = response.data || {};
    if (data.id) setRecord({ id: data.id, code: data.code });
    return data;
  };

  const next = async () => {
    if (!answered || saving) return;
    setError("");
    setSaving(true);
    try {
      const isLast = step === TOTAL_STEPS;
      const data = await save(isLast);
      if (isLast) setResult(data.result || "review");
      else setStep((current) => current + 1);
    } catch (e) {
      setError("Something went wrong saving your answer. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const back = () => {
    setError("");
    if (step === 1) setStarted(false);
    else setStep((current) => current - 1);
  };

  if (!started) return <IntroScreen onStart={() => setStarted(true)} />;
  if (result) return <ResultScreen result={result} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-10 pt-8 sm:px-6 sm:pt-10">
        <ProgressBar value={step} step={step} total={TOTAL_STEPS} />

        <div className="mt-8 flex-1">
          {step === 1 && <ContactStep answers={answers} onChange={setAnswer} />}
          {step > 1 && question?.type === "choice" && (
            <ChoiceStep
              question={question}
              value={answers[question.key]}
              onChange={(value) => setAnswer(question.key, value)}
            />
          )}
          {step > 1 && question?.type === "text" && (
            <TextStep
              question={question}
              value={answers[question.key]}
              onChange={(value) => setAnswer(question.key, value)}
            />
          )}
        </div>

        {error && <p className="mt-6 text-[13px] text-red-600">{error}</p>}

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={back}
            disabled={saving}
            className="rounded-full border border-[#e5e2dc] px-6 py-3.5 text-[15px] text-[#6b6b6b] transition-colors hover:border-[#c9c4bb] hover:text-[#1a1a1a] disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!answered || saving}
            className="flex-1 rounded-full bg-[#2d2d2d] px-6 py-3.5 text-[15px] text-white transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            {saving ? "Saving…" : step === TOTAL_STEPS ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}