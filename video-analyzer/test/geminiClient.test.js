import test from 'node:test';
import assert from 'node:assert/strict';
import { GeminiClient } from '../src/services/geminiClient.js';

const secret = 'test-only-secret-do-not-log';
for (const method of ['analyzeFrame', 'generateText']) {
  const args = { prompt: 'fictional scene', base64Image: 'data:image/jpeg;base64,ZmFrZQ==' };
  test(`${method}: key in header, safe URL and expected payload/result`, async (t) => {
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.ok(!url.includes(secret) && !url.includes('?key='));
      assert.ok(url.includes('gemini-2.5-flash:generateContent'));
      assert.equal(options.headers['x-goog-api-key'], secret);
      const body = JSON.parse(options.body);
      assert.equal(body.contents[0].parts[0].text, args.prompt);
      if (method === 'analyzeFrame') assert.equal(body.contents[0].parts[1].inlineData.data, 'ZmFrZQ==');
      return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: 'A fictional scene.' }] } }] }) };
    });
    const result = await new GeminiClient({ apiKey: secret })[method](args);
    assert.equal(result.text, 'A fictional scene.');
  });
  test(`${method}: provider error body is not read, logged or thrown`, async (t) => {
    const logs = [];
    t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 403, statusText: secret,
      json: async () => { assert.fail('Must not read provider error body'); } }));
    const client = new GeminiClient({ apiKey: secret, logger: { log: (...x) => logs.push(x) } });
    await assert.rejects(client[method](args), (e) => e.message.includes('403') && !e.message.includes(secret));
    assert.ok(!JSON.stringify(logs).includes(secret));
  });
  test(`${method}: network failures do not leak underlying errors`, async (t) => {
    t.mock.method(globalThis, 'fetch', async () => { throw new Error(secret); });
    await assert.rejects(new GeminiClient({ apiKey: secret })[method](args), /Unable to reach Gemini/);
  });
  test(`${method}: preserves cancellation without raw reason`, async (t) => {
    t.mock.method(globalThis, 'fetch', async () => { throw new DOMException(secret, 'AbortError'); });
    await assert.rejects(new GeminiClient({ apiKey: secret })[method](args), (e) => e.name === 'AbortError' && !e.message.includes(secret));
  });
  test(`${method}: malformed response has a safe error`, async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => { throw new Error(secret); } }));
    await assert.rejects(new GeminiClient({ apiKey: secret })[method](args), /unreadable response/);
  });
  test(`${method}: cancellation while reading a response stays cancellation`, async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => { throw new DOMException(secret, 'AbortError'); } }));
    await assert.rejects(new GeminiClient({ apiKey: secret })[method](args), (e) => e.name === 'AbortError' && !e.message.includes(secret));
  });
  test(`${method}: missing key fails before network`, async (t) => {
    t.mock.method(globalThis, 'fetch', async () => assert.fail('No request without a key'));
    await assert.rejects(new GeminiClient({})[method](args), /Missing Gemini API key/);
  });
}
