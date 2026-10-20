// Share a local port publicly through an ngrok tunnel (official @ngrok/ngrok SDK).
//
//   npm run share            -> tunnels port 3000 (`npm run dev`)
//   npm run share -- 3100    -> tunnels another port (e.g. a local `next start -p 3100`)
//
// Needs a free ngrok auth token (https://dashboard.ngrok.com/get-started/your-authtoken):
// set NGROK_AUTHTOKEN in .env.local (loaded by the npm script) or in your shell.
// Optional: NGROK_DOMAIN=your-static-domain.ngrok-free.app for a stable URL.
import ngrok from "@ngrok/ngrok";

const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);

if (!process.env.NGROK_AUTHTOKEN) {
  console.error(
    "Missing NGROK_AUTHTOKEN. Get one at https://dashboard.ngrok.com/get-started/your-authtoken\n" +
      "and add `NGROK_AUTHTOKEN=...` to .env.local.",
  );
  process.exit(1);
}

const listener = await ngrok.forward({
  addr: port,
  authtoken_from_env: true,
  ...(process.env.NGROK_DOMAIN ? { domain: process.env.NGROK_DOMAIN } : {}),
});

console.log(`\n  Sharing http://localhost:${port}\n  Public URL: ${listener.url()}\n\n  Press Ctrl+C to stop.\n`);

const close = async () => {
  await ngrok.disconnect();
  process.exit(0);
};
process.on("SIGINT", close);
process.on("SIGTERM", close);

// Keep the process alive while the tunnel is open.
setInterval(() => {}, 1 << 30);
