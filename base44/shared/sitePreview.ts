// Shared Open Graph preview extraction for link-preview functions.

/** Fetches a page and extracts its Open Graph / Twitter preview metadata. */
export async function ogMetaFor(url) {
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
  return { title, image, site };
}