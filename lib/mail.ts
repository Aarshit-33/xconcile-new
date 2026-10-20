import "server-only";

/**
 * Admin notification email via Microsoft Graph (same mailbox setup as the old site's
 * lib/sendMail.ts), using a plain OAuth client-credentials request instead of the Azure SDK.
 *
 * Env: AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, GRAPH_MAILBOX, ADMIN_EMAIL.
 */
const env = () => ({
  tenantId: process.env.AZURE_TENANT_ID,
  clientId: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  mailbox: process.env.GRAPH_MAILBOX,
  adminEmail: process.env.ADMIN_EMAIL,
});

export function isMailConfigured() {
  return Object.values(env()).every(Boolean);
}

async function getGraphToken() {
  const { tenantId, clientId, clientSecret } = env();
  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Graph token request failed (${res.status}): ${await res.text()}`);
  const { access_token } = (await res.json()) as { access_token: string };
  return access_token;
}

export async function sendAdminMail({ subject, html, replyTo }: { subject: string; html: string; replyTo?: string }) {
  const { mailbox, adminEmail } = env();
  const token = await getGraphToken();

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox!)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: "HTML", content: html },
        toRecipients: [{ emailAddress: { address: adminEmail } }],
        ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
      },
      saveToSentItems: true,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Graph sendMail failed (${res.status}): ${await res.text()}`);
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Minimal, inline-styled admin email. Every user-supplied value is HTML-escaped. */
export function leadEmailHtml(rows: [label: string, value: string | undefined][], submittedAt: string) {
  const body = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#54515c;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 12px;color:#28272a;white-space:pre-wrap">${escapeHtml(value!)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html lang="en"><body style="margin:0;padding:24px;background:#f5f7f8;font-family:Arial,sans-serif">
<table role="presentation" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:8px;border-collapse:collapse">
<tr><td colspan="2" style="padding:20px 24px;background:#13212c;color:#ffffff;border-radius:8px 8px 0 0">
<strong style="font-size:18px">New contact form submission</strong><br><span style="color:#6abe52;font-size:13px">${escapeHtml(submittedAt)}</span></td></tr>
${body}
</table></body></html>`;
}
