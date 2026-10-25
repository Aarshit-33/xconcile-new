// Share a local port publicly through a Cloudflare Quick Tunnel (trycloudflare.com).
// No account, no domain, no bandwidth cap — but the URL changes on every run.
//
//   npm run share:cf            -> tunnels port 3000 (`npm run dev`)
//   npm run share:cf -- 3100    -> tunnels another port (e.g. a local `next start -p 3100`)
//
// Needs the `cloudflared` binary on PATH, in ~/.local/bin, or set CLOUDFLARED_BIN=/path/to/cloudflared.
// Install: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);

function findCloudflared() {
  const candidates = [
    process.env.CLOUDFLARED_BIN,
    "cloudflared",
    join(homedir(), ".local", "bin", "cloudflared"),
    "/usr/local/bin/cloudflared",
  ].filter(Boolean);
  for (const bin of candidates) {
    const probe = spawnSync(bin, ["--version"], { stdio: "ignore" });
    if (!probe.error && probe.status === 0) return bin;
  }
  return null;
}

const bin = findCloudflared();
if (!bin) {
  console.error(
    "cloudflared not found. Install it (no sudo needed):\n\n" +
      "  mkdir -p ~/.local/bin\n" +
      "  curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o ~/.local/bin/cloudflared\n" +
      "  chmod +x ~/.local/bin/cloudflared\n\n" +
      "or set CLOUDFLARED_BIN=/path/to/cloudflared.",
  );
  process.exit(1);
}

// A named-tunnel config file can hijack quick tunnels; warn so the failure isn't mysterious.
for (const name of ["config.yml", "config.yaml"]) {
  if (existsSync(join(homedir(), ".cloudflared", name))) {
    console.warn(
      `  Warning: ~/.cloudflared/${name} exists — quick tunnels may not start. Rename it if this fails.\n`,
    );
  }
}

console.log(`\n  Starting Cloudflare quick tunnel for http://localhost:${port} ...`);

const child = spawn(bin, ["tunnel", "--no-autoupdate", "--url", `http://localhost:${port}`], {
  stdio: ["ignore", "pipe", "pipe"],
});

const verbose = process.env.CLOUDFLARED_VERBOSE === "1";
let announced = false;
const onOutput = (chunk) => {
  const text = chunk.toString();
  if (verbose) process.stderr.write(text);
  const match = !announced && text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
  if (match) {
    announced = true;
    console.log(
      `\n  Sharing http://localhost:${port}\n  Public URL: ${match[0]}\n\n` +
        "  (DNS can take a few seconds to propagate.) Press Ctrl+C to stop.\n",
    );
  } else if (/\bERR\b/.test(text) && !verbose) {
    process.stderr.write(text);
  }
};
child.stdout.on("data", onOutput);
child.stderr.on("data", onOutput);

child.on("exit", (code) => process.exit(code ?? 0));
const stop = () => child.kill("SIGTERM");
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
