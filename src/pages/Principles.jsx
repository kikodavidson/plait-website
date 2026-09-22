import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import PrinciplesToc from "@/components/principles/PrinciplesToc";
import PrinciplesChecklist from "@/components/principles/PrinciplesChecklist";
import DecisionLog from "@/components/principles/DecisionLog";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

const H2 = "mt-16 mb-6 scroll-mt-24 text-[22px] sm:text-[26px]";
const P = "leading-[1.85] text-[16px] text-[#1a1a1a]";
const SPACE = "space-y-5";
const OL = "list-decimal space-y-4 pl-6 text-[16px] leading-[1.8] text-[#1a1a1a] marker:font-bold";

function Section({ id, heading, children }) {
  return (
    <section id={id}>
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
      <div className="relative z-10">
        <PrinciplesToc />
        <main className="mx-auto max-w-[720px] px-5 pb-24 pt-12 sm:px-6 sm:pt-16">
          <h1 className="mb-10 text-4xl leading-tight sm:text-5xl">
            Who I Am and How I Work
          </h1>

          <Section id="who-i-am" heading="WHO I AM">
            <div className={SPACE}>
              <p className="text-lg font-bold leading-[1.7]">
                I'm a growth operator, not an ads guy.
              </p>
              <p className={P}>
                Ads are a tool. A good one. But when I call myself the person
                who runs ads, two things happen. I get compared to someone
                charging $10 an hour, and I get blamed for problems that were
                never mine to begin with.
              </p>
              <p className={P}>
                What I do is bigger than that. I figure out why a business
                isn't growing, and then I do the work to fix it. Research,
                creative, tracking, landing pages, email. One person who owns
                the problem from start to finish.
              </p>
              <p className={P}>
                I'm the person you want next to you when things aren't working.
                Not the one who shows up with a pretty deck and disappears when
                the numbers go sideways.
              </p>
            </div>
          </Section>

          <Section id="what-i-do" heading="WHAT I DO">
            <div className={SPACE}>
              <p className="text-lg font-bold leading-[1.7]">
                I own the growth system, not a channel.
              </p>
              <p className={P}>
                Every business I work with has a bottleneck. Sometimes it's the
                ads. More often it's something the ads expose: a weak offer, a
                leaky site, customers who never come back. My job is to find it
                and fix it.
              </p>
              <ol className={OL}>
                <li>
                  <strong>Understand the customer.</strong> Before I touch a
                  campaign, I find out who buys, why they buy, and what stops
                  them. That's UCAM, and it's where my best wins come from.
                </li>
                <li>
                  <strong>Find the bottleneck.</strong> Tracking, margins,
                  conversion rate, retention. Whatever breaks first gets fixed
                  first.
                </li>
                <li>
                  <strong>Create demand.</strong> Creative strategy and paid
                  media on Meta, Google, TikTok, and LinkedIn.
                </li>
                <li>
                  <strong>Convert it.</strong> Landing pages and offers that
                  turn clicks into customers.
                </li>
                <li>
                  <strong>Keep it.</strong> Email and SMS so the customer we
                  paid for buys again.
                </li>
                <li>
                  <strong>Measure it honestly.</strong> Tracking I trust, so
                  every decision runs on real numbers.
                </li>
              </ol>
              <p className={P}>
                If a prospect walks off a call thinking "he runs ads," I told
                the story wrong.
              </p>
            </div>
          </Section>

          <Section id="how-clients-benefit" heading="HOW CLIENTS BENEFIT">
            <div className={SPACE}>
              <p className={P}>
                Clients don't pay me for ad management. They pay me to stop
                losing money on growth that isn't working.
              </p>
              <ol className={OL}>
                <li>
                  <strong>One person who owns it.</strong> No handoffs between
                  a strategist, a media buyer, and a designer who've never met.
                  I do the thinking and the work, so nothing gets lost in
                  between.
                </li>
                <li>
                  <strong>The real problem, found fast.</strong> Something will
                  break. It always does. I find it, put a dollar amount on it,
                  and tell them what to do about it.
                </li>
                <li>
                  <strong>Assets they keep.</strong> Research, creative,
                  tracking, landing pages. Even if we part ways, they leave
                  with a business that understands its customers better.
                </li>
                <li>
                  <strong>The truth.</strong> If the math doesn't work, I say
                  it. Even if it costs me the retainer.
                </li>
              </ol>
              <p className={P}>
                The proof: a dating app came to me with messaging built around
                the brand. We listened to customers, rebuilt everything around
                what they told us, and CAC dropped 58% in a month. That's what
                happens when you solve the right problem.
              </p>
            </div>
          </Section>

          <Section id="who-fits" heading="WHO FITS AND WHO DOESN'T">
            <div className={SPACE}>
              <p className={P}>
                Most of my Murphy's law moments came from clients who were
                never ready for paid.
              </p>
              <p className={P}>
                Ads expose whatever is weakest in a business. Low margins, no
                retention, thin inventory. Ads don't cause any of that. They
                just make it visible faster and louder. So if I sign a client
                whose math can't work even with great marketing, I'm setting
                both of us up to lose.
              </p>
              <div>
                <p className="mb-3 text-[16px] font-bold">Good fit:</p>
                <ol className={OL}>
                  <li>
                    Consumer apps and ecommerce brands. That's where my
                    results are.
                  </li>
                  <li>
                    Margins healthy enough to pay for a customer and still
                    make money.
                  </li>
                  <li>
                    Customers who come back, or a real plan to get them there.
                  </li>
                  <li>A real ad budget, plus room for my fee.</li>
                  <li>
                    A founder who wants a partner, not someone to push
                    buttons.
                  </li>
                </ol>
              </div>
              <div>
                <p className="mb-3 text-[16px] font-bold">Not a fit:</p>
                <ol className={OL}>
                  <li>
                    Shopping on price. If they're comparing me to $10/hour,
                    we're not having the same conversation.
                  </li>
                  <li>Wants me to "just run the ads."</li>
                  <li>
                    Margins or retention that break the math no matter how
                    good the marketing is.
                  </li>
                  <li>
                    Expects big results in two weeks with no room to test.
                  </li>
                </ol>
              </div>
              <p className={P}>
                Not a fit doesn't always mean no. Sometimes it means the
                diagnostic first, so we both find out if the business is ready.
              </p>
              <div>
                <h3 className="mb-4 mt-8 text-[18px]">
                  Questions to ask before signing
                </h3>
                <PrinciplesChecklist
                  items={[
                    "What's left after product and shipping costs?",
                    "How many customers buy again, and how soon?",
                    "What does a customer cost you today, and what can you afford to pay?",
                    "Can you handle more demand if it shows up?",
                    "What's your monthly ad budget?",
                    "How would you feel if the first 60 days mostly show us what's broken?",
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="pricing" heading="PRICING AND MY VALUE">
            <div className={SPACE}>
              <p className={P}>
                My retainer floor is $3,500 a month. Below that, I'm a part
                time employee, not a partner.
              </p>
              <p className={P}>
                Here's the honest part. $3,500 isn't expensive. It feels
                expensive because I've been selling hours instead of outcomes.
              </p>
              <div>
                <p className="mb-3 text-[16px] font-bold">Offers</p>
                <div className="overflow-x-auto rounded-xl border border-[#e7e2da] bg-white">
                  <table className="w-full min-w-[520px] text-left text-[15px]">
                    <thead>
                      <tr className="border-b border-[#e7e2da]">
                        <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">Offer</th>
                        <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">Price</th>
                        <th className="px-4 py-3 text-[13px] font-semibold text-[#6b6b6b]">What it is</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#f0ece4] align-top">
                        <td className="whitespace-nowrap px-4 py-3.5 font-semibold">Growth diagnostic</td>
                        <td className="whitespace-nowrap px-4 py-3.5">$2,000 to $3,000</td>
                        <td className="px-4 py-3.5 leading-[1.7]">
                          Customer research, tracking audit, and a 90 day plan.
                          Credited toward a retainer if they sign.
                        </td>
                      </tr>
                      <tr className="border-b border-[#f0ece4] align-top">
                        <td className="whitespace-nowrap px-4 py-3.5 font-semibold">Retainer</td>
                        <td className="whitespace-nowrap px-4 py-3.5">$3,500+ a month</td>
                        <td className="px-4 py-3.5 leading-[1.7]">
                          I own the growth system. Optional bonus tied to
                          targets we agree on.
                        </td>
                      </tr>
                      <tr className="align-top">
                        <td className="whitespace-nowrap px-4 py-3.5 font-semibold">Project</td>
                        <td className="whitespace-nowrap px-4 py-3.5">Scoped</td>
                        <td className="px-4 py-3.5 leading-[1.7]">
                          Always ends with a roadmap and a retainer proposal.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[16px] font-bold">Why I'm not $10/hour:</p>
                <p className={P}>
                  Someone at $10/hour runs ads. I find out why the business
                  isn't growing and fix it. Different jobs, different buyers.
                </p>
              </div>
              <ol className={OL}>
                <li>
                  <strong>Sell the outcome.</strong> "I'll manage your Meta
                  ads" gets compared to a freelancer. "I'll get your CAC from
                  $40 to $25 in 90 days" gets compared to the money they're
                  losing right now.
                </li>
                <li>
                  <strong>Do the math with them.</strong> If they spend $20k a
                  month and I make it 20% more efficient, that's $4k back
                  every month. My fee pays for itself.
                </li>
                <li>
                  <strong>Make the work visible.</strong> My friends sell $3k
                  websites and their clients are thrilled, because they can
                  see what they bought. Plans, reports, creative, the client
                  portal. Same idea.
                </li>
                <li>
                  <strong>Don't promise what I don't control.</strong> I own
                  the diagnosis and the growth system. I don't own their
                  margins or their product. Say that up front.
                </li>
              </ol>
              <p className={P}>
                I'm not robbing anyone when I'm clear about what I control,
                find the real problem, and tell the truth about it. I'd be
                robbing them if I kept spending their money while pretending
                the ads were the issue.
              </p>
            </div>
          </Section>

          <Section
            id="straight-line"
            heading="GROWTH ISN'T A STRAIGHT LINE"
          >
            <div className={SPACE}>
              <p className={P}>
                Every month either grows the business or shows us what's
                stopping it. Both move it forward. Neither is a failure.
              </p>
              <p className={P}>
                Nothing that's grown went up in a straight line. My job is to
                make sure every month, good or flat, leaves the business
                smarter and the next decision better.
              </p>
              <ol className={OL}>
                <li>
                  <strong>Judge in 90 day windows, not months.</strong> I agree
                  on this before we start. One month is too short to call
                  anything.
                </li>
                <li>
                  <strong>Track progress, not just revenue.</strong> Tests run,
                  what won, what lost, conversion rate, cost per click. These
                  move before revenue does, and they show the work is going
                  somewhere.
                </li>
                <li>
                  <strong>Every report answers three things.</strong> What we
                  learned, what it's worth, what we're doing next. A flat month
                  with a clear lesson reads as progress. A flat month with no
                  explanation reads as failure.
                </li>
                <li>
                  <strong>Say it in the pitch.</strong> "Growth isn't a
                  straight line. Some months grow, some months show us what's
                  in the way. You'll always know which one it was and why."
                </li>
              </ol>
              <p className={P}>
                The honest limit: if three or four months of lessons never
                turn into improvement, that's a real signal. That's when I
                have the direct conversation, not when one month comes in flat.
              </p>
            </div>
          </Section>

          <Section id="when-i-drift" heading="WHEN I DRIFT">
            <div className={SPACE}>
              <p className={P}>
                I know my patterns. When something feels off, it's usually one
                of these four.
              </p>
              <p className={P}>
                <strong>I shrink back to "just ads."</strong> It's comfortable.
                It's what I know. But when I only look at the ad account, I
                miss what's hurting the business, and I end up owning results I
                can't control. <em>Ask: am I fixing the bottleneck, or just
                adjusting bids?</em>
              </p>
              <p className={P}>
                <strong>I undervalue myself.</strong> Friends with less
                experience sell $3k websites and their clients love them. The
                difference isn't skill. They believe in what they're handing
                over. If I don't believe the price, the client won't either.
                And a bad month for a client with broken unit economics isn't
                my failure. It's a client I shouldn't have signed.
              </p>
              <p className={P}>
                <strong>I skip building systems.</strong> Systems don't pay
                this week. They pay every week after. Every checklist,
                template, and client doc makes the next client faster and the
                next pitch sharper. <em>Ask: will I do this again? If yes,
                build it once.</em>
              </p>
              <p className={P}>
                <strong>I polish instead of sell.</strong> The website has
                never signed a retainer. Conversations do. <em>Ask: is this
                getting me in front of someone who can hire me?</em>
              </p>
            </div>
          </Section>

          <Section id="how-i-judge" heading="HOW I JUDGE MYSELF">
            <div className={SPACE}>
              <blockquote className="border-l-4 border-[#2d2d2d] pl-5 text-xl font-bold leading-snug sm:text-2xl">
                A bad month isn't a verdict on me. It's information, and I'm
                the one who knows what to do with it.
              </blockquote>
              <p className={P}>
                When I grade myself on the chart, I'm grading myself on their
                product, their margins, their market, and their timing. Most
                of that isn't mine. That's why every flat month used to feel
                like a failure.
              </p>
              <p className={P}>
                So I judge myself on what I control:
              </p>
              <ul className="space-y-2.5 pl-1 text-[16px] leading-[1.8] text-[#1a1a1a]">
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d2d2d]" />
                  Did I find the real problem?
                </li>
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d2d2d]" />
                  Did I make a better call than last month?
                </li>
                <li className="flex gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d2d2d]" />
                  Did I tell the truth, even when it was uncomfortable?
                </li>
              </ul>
              <p className={P}>
                If the answer is yes, I did my job, whatever the chart looks
                like. That's the standard I hold myself to, and it's a hard
                one. It's just aimed at the right target.
              </p>
            </div>
          </Section>

          <Section id="sales-call" heading="BEFORE A SALES CALL">
            <div className={SPACE}>
              <p className={P}>
                The goal isn't to win the client. It's to find out if I can
                help them, and if I can, make that obvious.
              </p>
              <p className="text-lg font-bold leading-[1.7]">
                Five minutes. Run through this, then go.
              </p>
              <div>
                <h3 className="mb-4 text-[18px]">Checklist</h3>
                <PrinciplesChecklist
                  items={[
                    'Reread "Who I am" and "How clients benefit"',
                    "Look at their business first: site, ad library, reviews, pricing",
                    "Walk in with one likely bottleneck to talk about",
                    "Have the dating app story ready",
                    "Know my floor: $3,500 or the diagnostic. No $1k deals.",
                    "Talk about their problem before my services",
                    "Ask the fit questions. If they don't fit, that's a win too.",
                    "Set expectations: \"Something will break. My job is to find it fast and tell you what it's costing you.\"",
                    "End with a clear next step: diagnostic, proposal, or a friendly no",
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="decision-log" heading="DECISION LOG">
            <div className={SPACE}>
              <p className={P}>
                Add a row whenever I decide something about the business.
                Newest first.
              </p>
            </div>
            <div className="mt-6">
              <DecisionLog />
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}