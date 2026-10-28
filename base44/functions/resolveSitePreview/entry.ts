import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { ogMetaFor } from '../../shared/sitePreview.ts';

// Resolves a website link to a preview image: a 1440x900 screenshot stored on
// our files, falling back to the site's Open Graph image.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { url } = await req.json().catch(() => ({}));
    if (!url || !/^https?:\/\//i.test(url)) {
      return Response.json({ error: 'A valid http(s) URL is required.' }, { status: 400 });
    }

    // 1. Full-page screenshot via thum.io, saved to our own file storage.
    try {
      const shot = await fetch(`https://image.thum.io/get/width/1440/crop/900/${url}`, {
        signal: AbortSignal.timeout(45000),
      });
      const type = shot.headers.get('content-type') || '';
      if (shot.ok && type.startsWith('image/')) {
        const blob = await shot.blob();
        const ext = (type.split('/')[1] || 'png').split(';')[0];
        const uploaded = await base44.asServiceRole.integrations.Core.UploadPublicFile({
          file: new File([blob], `site.${ext}`, { type: blob.type || type }),
        });
        if (uploaded?.file_url) return Response.json({ image_url: uploaded.file_url });
      }
    } catch {
      // fall through to the Open Graph fallback
    }

    // 2. The site's own Open Graph preview image.
    const meta = await ogMetaFor(url);
    return Response.json({ image_url: meta.image });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}