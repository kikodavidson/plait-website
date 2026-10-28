import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { ogMetaFor } from '../../shared/sitePreview.ts';

// Pulls a site's preview title and image for a saved link (Open Graph tags).
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { url } = await req.json().catch(() => ({}));
    if (!url || !/^https?:\/\//i.test(url)) {
      return Response.json({ error: 'A valid http(s) URL is required.' }, { status: 400 });
    }

    const meta = await ogMetaFor(url);
    return Response.json(meta);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}