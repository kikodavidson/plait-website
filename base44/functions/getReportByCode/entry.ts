import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Public: resolves a report link code to its stored HTML, for viewers with no login.
// The 8-character code is the only credential, so it is validated strictly.
export default async function (req) {
  try {
    const { code } = await req.json().catch(() => ({}));
    const clean = String(code || '').trim().toLowerCase();
    if (!/^[a-z0-9]{8}$/.test(clean)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const base44 = createClientFromRequest(req);
    const page = await base44.asServiceRole.entities.Report.filter(
      { code: clean },
      { limit: 1 }
    );
    const report = (page.items || [])[0];
    if (!report) return Response.json({ error: 'Not found' }, { status: 404 });

    let html = null;
    try {
      const file = await fetch(report.file_url, { signal: AbortSignal.timeout(20000) });
      if (file.ok) html = await file.text();
    } catch {
      // leave html null so the page can show its unavailable message
    }

    return Response.json({
      code: report.code,
      client_name: report.client_name,
      report_title: report.report_title,
      date_range: report.date_range,
      html,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}