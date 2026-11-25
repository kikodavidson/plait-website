import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

const TEXT_FIELDS = ['name', 'email', 'company', 'website', 'differentiator', 'growth_blocker'];

const CHOICE_FIELDS = {
  role: ['founder', 'marketing_lead', 'other'],
  sells: ['ecommerce', 'saas', 'app', 'other'],
  stage: ['pre_launch', 'under_year', 'established'],
  ad_spend: ['none', 'under_5k', '5k_15k', '15k_30k', '30k_100k', '100k_plus'],
  budget_6mo: ['under_10k', '10k_25k', '25k_50k', '50k_plus'],
  margins: ['under_30', '30_50', '50_70', 'over_70', 'unsure'],
  adjust_pricing: ['yes', 'no', 'maybe'],
  profit_timing: ['first_month', 'within_3_months', 'long_term'],
  agencies: ['0', '1', '2', '3+'],
  looking_for: ['run_it', 'partner'],
  share_numbers: ['yes', 'no'],
};

const LABELS = {
  role: { founder: 'Founder or co-founder', marketing_lead: 'Marketing lead', other: 'Other' },
  sells: { ecommerce: 'E-commerce', saas: 'SaaS', app: 'App', other: 'Other' },
  stage: { pre_launch: 'Getting ready to launch', under_year: 'Launched less than a year ago', established: 'Established and growing' },
  ad_spend: { none: 'Not running ads yet', under_5k: 'Under 5k', '5k_15k': '5k to 15k', '15k_30k': '15k to 30k', '30k_100k': '30k to 100k', '100k_plus': '100k+' },
  budget_6mo: { under_10k: 'Under 10k', '10k_25k': '10k to 25k', '25k_50k': '25k to 50k', '50k_plus': '50k+' },
  margins: { under_30: 'Under 30%', '30_50': '30% to 50%', '50_70': '50% to 70%', over_70: 'Over 70%', unsure: 'Not sure' },
  adjust_pricing: { yes: 'Yes', no: 'No', maybe: 'Maybe' },
  profit_timing: { first_month: 'First month', within_3_months: 'Within 3 months', long_term: "Building for the long term" },
  agencies: { '0': '0', '1': '1', '2': '2', '3+': '3+' },
  looking_for: { run_it: 'Someone to run what I tell them', partner: 'A partner to build the strategy with me' },
  share_numbers: { yes: 'Yes', no: 'No' },
};

const QUESTIONS = [
  ['role', 'Role'],
  ['sells', 'What they sell'],
  ['stage', 'Stage'],
  ['ad_spend', 'Monthly ad spend'],
  ['budget_6mo', '6 month budget'],
  ['differentiator', 'Differentiator'],
  ['margins', 'Margins'],
  ['adjust_pricing', 'Open to adjusting pricing'],
  ['profit_timing', 'Expects profit'],
  ['agencies', 'Agencies in last 2 years'],
  ['looking_for', 'Looking for'],
  ['share_numbers', 'Open to sharing numbers'],
  ['growth_blocker', 'Biggest growth blocker'],
];

function cleanAnswers(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const key of TEXT_FIELDS) {
    if (typeof raw[key] === 'string') out[key] = raw[key].trim().slice(0, 2000);
  }
  for (const key of Object.keys(CHOICE_FIELDS)) {
    const value = raw[key];
    if (typeof value === 'string' && CHOICE_FIELDS[key].includes(value)) out[key] = value;
  }
  return out;
}

function scoreLead(a) {
  const notFit =
    a.ad_spend === '100k_plus' ||
    a.profit_timing === 'first_month' ||
    a.agencies === '3+' ||
    a.looking_for === 'run_it' ||
    a.share_numbers === 'no';
  if (notFit) return 'not_fit';
  const qualified =
    a.ad_spend === '15k_30k' ||
    ((a.stage === 'pre_launch' || a.stage === 'under_year') &&
      ['10k_25k', '25k_50k', '50k_plus'].includes(a.budget_6mo));
  return qualified ? 'qualified' : 'review';
}

function answerText(lead, key) {
  if (CHOICE_FIELDS[key]) return LABELS[key][lead[key]] || '—';
  return (lead[key] || '').trim() || '—';
}

async function notifyPartners(base44, lead) {
  const users = await base44.asServiceRole.entities.User.list();
  const recipients = users
    .filter((u) => ['luke', 'max'].includes((u.full_name || '').trim().split(' ')[0].toLowerCase()))
    .map((u) => u.email)
    .filter(Boolean);
  if (!recipients.length) return;

  const rows = QUESTIONS.map(
    ([key, label]) =>
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#525252;font-size:13px;width:44%">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#1a1a1a;font-size:13px">${answerText(lead, key)}</td></tr>`
  ).join('');

  const html = `<div style="background:#ffffff;padding:32px 20px;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto">
    <div style="background:#619e80;border-radius:24px 24px 0 0;padding:20px 24px">
      <p style="margin:0;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#000000">Mile 27 application</p>
    </div>
    <div style="background:#f2f0ee;border-radius:0 0 24px 24px;padding:24px">
      <h1 style="margin:0 0 6px;font-size:22px;color:#1a1a1a">${lead.name}</h1>
      <p style="margin:0 0 16px;font-size:14px;color:#525252">${lead.company} · ${lead.email}</p>
      <p style="margin:0 0 20px;font-size:14px;color:#1a1a1a">Result: <strong>${lead.result === 'qualified' ? 'Qualified' : lead.result === 'review' ? 'Review' : 'Not a Fit'}</strong></p>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border-radius:16px;overflow:hidden">${rows}</table>
    </div>
  </div>
</div>`;

  for (const to of recipients) {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to,
      subject: `New application: ${lead.name} (${lead.company})`,
      html,
      category: 'transactional',
    });
  }
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const answers = cleanAnswers(body.answers);
    const completed = body.completed === true;

    let lead = null;
    if (body.id && body.code) {
      lead = await base44.asServiceRole.entities.ApplyLead.get(body.id).catch((e) =>
        e.status === 404 ? null : Promise.reject(e)
      );
      if (!lead || lead.submit_code !== body.code) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
    }

    const data = { ...answers, completed };
    if (completed) data.result = scoreLead(answers);

    if (lead) {
      lead = await base44.asServiceRole.entities.ApplyLead.update(lead.id, data);
    } else {
      lead = await base44.asServiceRole.entities.ApplyLead.create({
        ...data,
        submit_code: crypto.randomUUID(),
        status: 'new',
        notified: false,
      });
    }

    if (completed && !lead.notified) {
      await notifyPartners(base44, lead);
      await base44.asServiceRole.entities.ApplyLead.update(lead.id, { notified: true });
    }

    return Response.json({ id: lead.id, code: lead.submit_code, result: lead.result || null });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}