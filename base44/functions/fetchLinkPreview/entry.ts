import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Pulls a site's preview title and image for a saved link (Open Graph tags).
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { url } = await req.json();
    if (!url || !/^https?:\/\//i.test(url)) {
      return Response.json({ error: 'A valid http(s) URL is required.' }, { status: 400 });
    }

    let title = null;
    let image = null;
    let site = null;
    try {
      const page = await fetch(url, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; PlaitPreview/1.0)',
          accept: 'text/html',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      });
      if (page.ok) {
        const html = (await page.text()).slice(0, 400000);
        const decode = (s) =>
          s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'");
        const grab = (pattern) => {
          const m = pattern.exec(html);
          return m && m[1] ? decode(m[1].trim()) : null;
        };
        title =
          grab(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
          grab(/<meta[^>]+content=["']([^"']*)["'][^>]*property=["']og:title["']/i) ||
          grab(/<title[^>]*>([\s\S]{1,300}?)<\/title>/i);
        image =
          grab(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i) ||
          grab(/<meta[^>]+content=["']([^"']*)["'][^>]*property=["']og:image["']/i) ||
          grab(/<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i);
        site = grab(/<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i);
        if (image) {
          try {
            image = new URL(image, url).href;
          } catch {
            image = null;
          }
        }
      }
    } catch {
      // unreachable or slow sites still get a saved link, just without a preview
    }

    return Response.json({ title, image, site });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}