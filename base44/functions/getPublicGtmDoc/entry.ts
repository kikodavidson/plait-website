import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Public reader for the Go-to-market doc. No auth: returns only what the public
// page renders — locked sections in full, unfinished ones by name and stage only.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const [tabs, sections, versions] = await Promise.all([
      base44.asServiceRole.entities.PartnershipTab.list('order', 200),
      base44.asServiceRole.entities.PartnershipSection.list('order', 500),
      base44.asServiceRole.entities.PartnershipVersion.list('-created_date', 500),
    ]);

    const publicSections = sections.map((s) =>
      s.stage === 'locked'
        ? {
            id: s.id,
            tab_id: s.tab_id,
            name: s.name,
            order: s.order,
            stage: s.stage,
            content: s.content || '',
            approved_luke: !!s.approved_luke,
            approved_max: !!s.approved_max,
          }
        : { id: s.id, tab_id: s.tab_id, name: s.name, order: s.order, stage: s.stage }
    );

    return Response.json({
      tabs: tabs.map((t) => ({ id: t.id, name: t.name, order: t.order })),
      sections: publicSections,
      versions: versions
        .filter((v) => v.kind === 'locked')
        .map((v) => ({ id: v.id, section_id: v.section_id, kind: v.kind, created_date: v.created_date })),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}