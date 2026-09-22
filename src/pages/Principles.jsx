import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import DecisionLog from "@/components/principles/DecisionLog";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

const H2 = "mt-16 mb-6 text-[22px] sm:text-[26px]";
const P = "leading-[1.85] text-[16px] text-[#1a1a1a]";
const SPACE = "space-y-5";

function Section({ heading, children }) {
  return (
    <section>
      <h2 className={H2}>{heading}</h2>
      {children}
    </section>
  );
}

function AdminOnlyScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#e7e2da] bg-white p-8 text-center">
        <Lock className="mx-auto mb-4 h-6 w-6 text-[#2d2d2d]" />
        <h1 className="mb-2 text-2xl">Admin access only</h1>
        <p className="mb-6 text-[15px] leading-relaxed text-[#6b6b6b]">
          This page is private. Sign in with the admin account to view it.
        </p>
        <Link
          to="/creativelogin"
          className="mb-4 inline-flex items-center justify-center rounded-full bg-[#2d2d2d] px-6 py-2.5 text-[15px] text-white transition-opacity hover:opacity-90"
        >
          Go to login
        </Link>
        <div>
          <Link to="/" className="text-[13px] text-[#6b6b6b] underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Principles() {
  const { user, isLoadingAuth } = useAuth();

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4]">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#e7e2da] border-t-[#2d2d2d]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <AdminOnlyScreen />;
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F4] text-[#1a1a1a]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: GRAIN }}
      />
      <main className="relative z-10 mx-auto max-w-[680px] px-5 pb-24 pt-12 sm:px-6 sm:pt-16">
        <h1 className="mb-10 text-4xl leading-tight sm:text-5xl">
          Who I Am and How I Work
        </h1>

        <Section heading="WHAT I'M BUILDING">
          <div className={SPACE}>
            <p className={P}>
              I use marketing and psychology to help companies understand their
              customers: who they are, what they struggle with, and why they
              buy.
            </p>
            <p className={P}>
              Then I turn that understanding into the work that grows the
              company. Creative, campaigns, pages, and systems they keep.
            </p>
          </div>
        </Section>

        <Section heading="WHAT I BELIEVE">
          <ul className="space-y-3.5">
            {[
              "Growth starts with understanding the customer.",
              "Every month either grows the business or teaches us what's next. Both are relevant and valuable.",
              "The best work comes from owning the problem start to finish.",
              "Honest numbers lead to better decisions.",
              "Anything I build once makes every client after it better.",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-[16px] leading-[1.8] text-[#1a1a1a]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d2d2d]" />
                {line}
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="WHO IT'S FOR">
          <div className={SPACE}>
            <p className={P}>
              Companies ready to invest in understanding their customers, with
              the runway to let that work pay off over a few months.
            </p>
            <p className={P}>
              That means some startups aren't a fit yet, especially ones that
              need profit every single month. That's the right call for both of
              us. I do my best work with room to learn, and they deserve a
              partner who fits where they are.
            </p>
            <p className={P}>
              Retainers start at $3,500 a month. The growth diagnostic is the
              way in.
            </p>
          </div>
        </Section>

        <Section heading="DECISION LOG">
          <p className={`${P} mb-6`}>
            Add a row whenever I decide something about the business. Newest
            first.
          </p>
          <DecisionLog />
        </Section>
      </main>
    </div>
  );
}