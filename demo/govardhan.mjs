import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const key = process.env.FLAGSMITH_DEMO_ENVIRONMENT_KEY || process.env.FLAGSMITH_API_KEY;
if (!key || !/^[a-zA-Z0-9_-]+$/.test(key) || key.startsWith('ser.')) {
  throw new Error('Set FLAGSMITH_API_KEY to a public Flagsmith client key, or override it with FLAGSMITH_DEMO_ENVIRONMENT_KEY.');
}
const port = Number(process.env.PORT || 4173);
const origin = 'http://127.0.0.1:' + port;
const chapter = '/govardhan-fpv/';
const template = await readFile(new URL('../govardhan-fpv/index.html', import.meta.url), 'utf8');
const html = template.replace('name="govardhan-demo-environment" content=""',
  'name="govardhan-demo-environment" content="' + key + '"');
const eventWebhook = process.env.NUDGEBEE_EVENT_WEBHOOK_URL;
const webhook = eventWebhook || process.env.NUDGEBEE_WEBHOOK_URL;
if (webhook && new URL(webhook).protocol !== 'https:') {
  throw new Error('NUDGEBEE_WEBHOOK_URL must use HTTPS.');
}

async function report(req, res) {
  if (req.headers.origin !== origin || req.headers['content-type'] !== 'application/json') {
    return res.writeHead(403).end();
  }
  let body = '';
  for await (const chunk of req) {
    if (body.length + chunk.length > 256) return res.writeHead(413).end();
    body += chunk;
  }
  let simulated;
  try { ({ simulated } = JSON.parse(body)); } catch { return res.writeHead(400).end(); }
  if (typeof simulated !== 'boolean') return res.writeHead(400).end();
  if (!webhook) return res.writeHead(503).end();

  const incident = {
    id: randomUUID(), observed_at: new Date().toISOString(), event: 'chapter_engine_load_failed',
    chapter: 'govardhan', environment: 'local-demo', simulated,
    flag: 'govardhan_simulate_engine_failure',
    failed_module: simulated ? './demo-unavailable-three.js' : 'three'
  };
  const payload = eventWebhook ? {
    id: incident.id, fingerprint: 'govardhan-demo-engine-load', status: 'firing',
    title: 'Govardhan engine load failed' + (simulated ? ' (demo)' : ''),
    rule_name: 'govardhan_engine_load_failed', severity: 'low', starts_at: incident.observed_at,
    labels: { environment: incident.environment, simulated: String(simulated), module: incident.failed_module }
  } : incident;
  const upstream = await fetch(webhook, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), redirect: 'error', signal: AbortSignal.timeout(8000)
  });
  await upstream.body?.cancel();
  res.writeHead(upstream.ok ? 202 : 502).end();
}

createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.headers.host !== new URL(origin).host) return res.writeHead(403).end();
  const { pathname } = new URL(req.url, origin);
  try {
    if (req.method === 'GET' && (pathname === '/' || pathname === '/govardhan-fpv')) {
      return res.writeHead(302, { Location: chapter }).end();
    }
    if (req.method === 'GET' && [chapter, chapter + 'index.html'].includes(pathname)) {
      return res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    }
    if (req.method === 'GET' && /^\/audio\/[a-zA-Z0-9_-]+\.(js|mp3)$/.test(pathname)) {
      const asset = await readFile(new URL('..' + pathname, import.meta.url)).catch(() => null);
      if (!asset) return res.writeHead(404).end();
      const type = pathname.endsWith('.js') ? 'text/javascript' : 'audio/mpeg';
      return res.writeHead(200, { 'Content-Type': type }).end(asset);
    }
    if (req.method === 'POST' && pathname === chapter + 'load-report') return await report(req, res);
    res.writeHead(404).end();
  } catch {
    res.writeHead(502).end();
  }
}).listen(port, '127.0.0.1', () => {
  console.log('Govardhan demo listening at ' + origin + chapter);
  if (!webhook) console.warn('No NudgeBee webhook configured. Reports will show as undelivered.');
});
