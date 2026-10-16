import React from "react";
import Timeline from "@/components/ui/timeline";

/** Brand buildout milestones, October through December 2026. */
const MILESTONES = [
  // October — due Oct 31
  {
    id: "oct-partnership-agreement",
    name: "Partnership agreement signed",
    detail:
      "50/50 split, tie breaker, exit terms, and how current client income is split until the business bank account is open",
    meta: "Due Oct 31 · Business Setup",
    tag: "Top Priority",
  },
  {
    id: "oct-north-star",
    name: "North Star locked",
    meta: "Due Oct 31 · Mission",
  },
  {
    id: "oct-values",
    name: "Values locked",
    meta: "Due Oct 31 · Mission",
  },
  {
    id: "oct-brand-name",
    name: "Brand name chosen",
    meta: "Due Oct 31 · Brand",
  },
  {
    id: "oct-name-check",
    name: "Name check",
    detail: "Domain, Instagram handle, and state business name available",
    meta: "Due Oct 31 · Brand",
  },
  {
    id: "oct-roles",
    name: "Roles defined",
    detail: "Who does sales, delivery, and money",
    meta: "Due Oct 31 · Business Setup",
  },
  // November, first half — due Nov 15
  {
    id: "nov1-look-feel",
    name: "Look and feel locked",
    detail: "Logo, colors, fonts",
    meta: "Due Nov 15 · Brand",
  },
  {
    id: "nov1-offer-pricing",
    name: "Offer and pricing locked",
    meta: "Due Nov 15 · Offer",
  },
  {
    id: "nov1-tax-advisor",
    name: "Meeting with tax advisor",
    meta: "Due Nov 15 · Business Setup",
  },
  // November, second half — due Nov 30
  {
    id: "nov2-entity-type",
    name: "Entity type chosen",
    meta: "Due Nov 30 · Business Setup",
  },
  {
    id: "nov2-taxes-handler",
    name: "Who handles taxes chosen",
    detail: "Us or a CPA, and which one",
    meta: "Due Nov 30 · Business Setup",
  },
  {
    id: "nov2-luke-llc",
    name: "Plan for Luke's current LLC",
    meta: "Due Nov 30 · Business Setup",
  },
  {
    id: "nov2-registration",
    name: "Business registered and EIN",
    meta: "Due Nov 30 · Accounts & Setup, Phase 1",
  },
  {
    id: "nov2-contract-template",
    name: "Client contract template done",
    meta: "Due Nov 30 · Offer",
  },
  {
    id: "nov2-case-studies-written",
    name: "Case studies written",
    detail: "Results, numbers, and client story",
    meta: "Due Nov 30 · Website",
  },
  // December — due Dec 31
  {
    id: "dec-operating-agreement",
    name: "Operating agreement signed",
    detail: "Based on the partnership agreement",
    meta: "Due Dec 31 · Business Setup",
    waitOn: "Business registered and EIN",
  },
  {
    id: "dec-bank-account",
    name: "Business bank account open",
    detail: "After registration",
    meta: "Due Dec 31 · Accounts & Setup, Phase 1",
    waitOn: "Business registered and EIN",
  },
  {
    id: "dec-pay-ourselves",
    name: "How we pay ourselves set up",
    meta: "Due Dec 31 · Business Setup",
  },
  {
    id: "dec-accounts",
    name: "Domain, email, and platform accounts set up",
    meta: "Due Dec 31 · Accounts & Setup, Phases 2 and 3",
  },
  {
    id: "dec-website-live",
    name: "Website live",
    meta: "Due Dec 31 · Website",
    waitOn: "Offer and pricing locked, and look and feel locked",
  },
  {
    id: "dec-case-studies-live",
    name: "Case studies designed and live as a subpage",
    meta: "Due Dec 31 · Website",
    waitOn: "Look and feel locked",
  },
  {
    id: "dec-client-transition",
    name: "Client transition plan done and clients told",
    meta: "Due Dec 31 · Accounts & Setup",
  },
  {
    id: "dec-launch-plan",
    name: "Launch plan ready",
    meta: "Due Dec 31 · Brand",
  },
];

/** Pinned, horizontally scrolling milestone timeline for the brand buildout. */
export default function TimelineTab() {
  return (
    <Timeline
      title="Launch timeline"
      periodLabel="October — December 2026"
      textColor="#1a1a1a"
      mutedTextColor="#6b6b6b"
      activeColor="#619e80"
      backgroundColor="#ffffff"
      imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd35f?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Two partners planning the brand buildout at a table"
      duration={1.1}
      items={MILESTONES}
    />
  );
}