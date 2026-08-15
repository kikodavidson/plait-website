import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

function base64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { toEmail, clientName, portalUrl } = body;
    if (!toEmail || !clientName || !portalUrl) {
      return Response.json({ error: "Missing toEmail, clientName, or portalUrl" }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("gmail");

    const subject = `You're invited to ${clientName}'s Creative Gameplan Studio`;
    const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#F5F5F5;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#222222;padding:24px 32px;">
          <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.04em;">Plait <span style="color:#666;">|</span> Creative Gameplan Studio</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 12px;font-size:22px;color:#222222;font-weight:700;">You're invited</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#555555;">
            You've been added to <strong style="color:#222222;">${clientName}</strong>'s content gameplan portal. This is where strategy turns into reality — each plan lays out the audiences and concepts being tested, the content needed, and examples of what's already winning.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555555;">
            Use the same email you received this invite at to sign in and view your gameplans.
          </p>
          <a href="${portalUrl}" style="display:inline-block;background:#2d2d2d;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:999px;">Open your portal</a>
        </td></tr>
        <tr><td style="padding:0 32px 32px;">
          <p style="margin:0;font-size:13px;color:#999999;line-height:1.5;">
            If the button above doesn't work, copy and paste this link into your browser:<br/>
            <a href="${portalUrl}" style="color:#4F6EF7;word-break:break-all;">${portalUrl}</a>
          </p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#999999;">Sent by Plait Creative Gameplan Studio</p>
    </td></tr>
  </table>
</body></html>`;

    const rawMessage = [
      `From: Plait <luke@plaitgrowth.com>`,
      `To: ${toEmail}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      html
    ].join("\r\n");

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ raw: base64UrlEncode(rawMessage) })
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ error: "Gmail send failed", details: errText }, { status: 502 });
    }

    const data = await res.json();
    return Response.json({ ok: true, messageId: data.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}