import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Power-to-Chip assessment", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Power-to-Chip Readiness Lab<\/title>/i);
  assert.match(html, /Can your facility carry the next/);
  assert.match(html, /Build a shared starting point/);
  assert.match(html, /No numerical readiness score is calculated/);
  assert.match(html, /Modern Data Center Engineering/);
  assert.match(html, /Educational screening only/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps assessment values local and avoids collection forms", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Assessment values remain in the browser/);
  assert.match(page, /No facility names/);
  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.doesNotMatch(page, /<form|type=["']email["']|fetch\(|XMLHttpRequest/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /const title = "Power-to-Chip Readiness Lab"/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /\/og\.png/);
});
