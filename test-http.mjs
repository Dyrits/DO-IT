import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const origin = 'http://127.0.0.1:4183';
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4183'], { stdio: ['ignore', 'pipe', 'pipe'] });
let logs = '';
server.stdout.on('data', chunk => logs += chunk);
server.stderr.on('data', chunk => logs += chunk);
let checks = 0;
/**
 * @param {string} method
 * @param {string} path
 * @param {number} expected
 * @param {Record<string, string> | undefined} [data]
 */
async function request(method, path, expected, data, json = true, from = origin) {
  const headers = { origin: from, ...(json ? { accept: 'application/json' } : {}) };
  const body = data ? new URLSearchParams(data) : undefined;
  const response = await fetch(origin + path, { method, headers, body, redirect: 'manual' });
  assert.equal(response.status, expected, `${method} ${path}`); checks++;
  return response;
}
try {
  let ready = false;
  for (let n = 0; n < 100; n++) {
    try { if ((await fetch(origin)).ok) { ready = true; break; } } catch {}
    await delay(100);
  }
  assert.ok(ready, logs);
  const before = await (await request('GET', '/todos.json', 200)).json();
  assert.deepEqual(before, []);
  const created = await (await request('POST', '/todos.json', 201, { text: '  Fixture todo  ' })).json();
  assert.equal(created.text, 'Fixture todo'); assert.equal(created.done, false);
  assert.match(created.uid, /^[0-9a-f-]{36}$/);
  const path = `/todos/${created.uid}.json`;
  const done = await (await request('PATCH', path, 200, { done: 'true' })).json();
  assert.equal(done.done, true);
  const edited = await (await request('POST', path + '?_method=PATCH', 200, { text: 'Changed' })).json();
  assert.equal(edited.text, 'Changed');
  assert.equal((await (await request('PATCH', path, 200, { text: ' ' })).json()).text, 'Changed');
  await request('POST', '/todos.json', 204, { text: ' ' });
  await request('PATCH', '/todos/missing.json', 404, { text: 'missing' });
  await request('POST', path, 405, { text: 'not an override' });
  await request('POST', '/todos.json?_method=DELETE', 405, {});
  await request('POST', '/todos.json', 403, { text: 'Cross origin' }, true, 'https://untrusted.invalid');
  const form = await request('POST', path + '?_method=PATCH', 303, { done: 'false' }, false);
  assert.equal(form.headers.get('location'), '/');
  const blank = await request('POST', '/todos.json', 303, { text: ' ' }, false);
  assert.equal(blank.headers.get('location'), '/');
  const html = await (await request('GET', '/', 200, undefined, false)).text();
  assert.ok(html.includes('Changed'));
  const deleted = await (await request('DELETE', path, 200)).json();
  assert.deepEqual(deleted, []);
  const first = await (await request('POST', '/todos.json', 201, { text: 'Same millisecond A' })).json();
  const second = await (await request('POST', '/todos.json', 201, { text: 'Same millisecond B' })).json();
  assert.notEqual(first.uid, second.uid);
  await request('POST', `/todos/${first.uid}.json?_method=DELETE`, 303, {}, false);
  await request('DELETE', `/todos/${second.uid}.json`, 200);
  console.log(JSON.stringify({ checks, actualHTTP: true, csrfRejection: true, noJSRedirects: true }));
} finally {
  server.kill();
}
