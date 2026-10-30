import { type NextRequest } from "next/server";

/**
 * Content-Security-Policy violation reports (security audit 2026-10-30, S6). Browsers POST here
 * (`report-uri /api/csp-report` in next.config.ts) whenever the policy blocks something, in
 * either format:
 * - `application/csp-report`: `{ "csp-report": { ... } }` (report-uri, every browser)
 * - `application/reports+json`: `[{ type: "csp-violation", body: { ... } }]` (Reporting API)
 * Each report becomes ONE compact log line (`[csp] {...}`) in the server / Vercel logs, so a new
 * GTM tag or widget host shows up there and can be added to the policy. Nothing is stored.
 * Bodies over 16 KB are ignored and every field is truncated, so the endpoint can't be used to
 * flood the logs with large payloads. Always answers 204.
 */

const MAX_BODY = 16 * 1024;

type Report = Record<string, unknown>;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max) : undefined);

/** Drops query strings and fragments (they can carry tokens or personal data). */
const clean = (v: unknown) => {
  const s = str(v, 300);
  if (!s) return s;
  try {
    const u = new URL(s);
    return `${u.origin}${u.pathname}`.slice(0, 200);
  } catch {
    return s.split(/[?#]/)[0].slice(0, 200); // "inline", "eval", "data", ...
  }
};

function summarize(r: Report) {
  return {
    directive: str(r["effective-directive"] ?? r.effectiveDirective ?? r["violated-directive"], 60),
    blocked: clean(r["blocked-uri"] ?? r.blockedURL),
    page: clean(r["document-uri"] ?? r.documentURL),
    source: clean(r["source-file"] ?? r.sourceFile),
    line:
      typeof (r["line-number"] ?? r.lineNumber) === "number"
        ? (r["line-number"] ?? r.lineNumber)
        : undefined,
    sample: str(r["script-sample"] ?? r.sample, 60),
    mode: str(r.disposition, 10),
  };
}

export async function POST(req: NextRequest) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return new Response(null, { status: 204 });
  try {
    const text = (await req.text()).slice(0, MAX_BODY);
    const data: unknown = JSON.parse(text);
    const reports: Report[] = Array.isArray(data)
      ? data
          .filter((x) => x && typeof x === "object" && (x as Report).type === "csp-violation")
          .map((x) => ((x as Report).body ?? {}) as Report)
          .slice(0, 10)
      : data && typeof data === "object" && "csp-report" in data
        ? [(data as Record<string, Report>)["csp-report"]]
        : [];
    for (const r of reports) console.warn("[csp]", JSON.stringify(summarize(r)));
  } catch {
    // Malformed body: ignore.
  }
  return new Response(null, { status: 204 });
}
