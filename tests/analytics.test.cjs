'use strict';

// Run with: node --test tests/analytics.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const analytics = fs.readFileSync(path.join(root, 'analytics.js'), 'utf8');

function makeHarness(ready = true) {
  const listeners = new Map();
  const intervals = [];
  const calls = [];
  const scripts = [];
  const card = {
    id: 'sample-tool',
    classList: { contains: (name) => name === 'card' },
    querySelector: (selector) => selector === 'h3' ? { textContent: 'Sample Tool' } : null,
  };
  const document = {
    head: { appendChild: (script) => scripts.push(script) },
    createElement: () => ({
      setAttribute(name, value) { this[name] = value; },
    }),
    addEventListener(name, fn) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(fn);
    },
    getElementById: (id) => id === card.id ? card : null,
  };
  const window = {
    goatcounter: ready ? { count: (data) => calls.push(data) } : null,
  };
  vm.runInNewContext(analytics, {
    document,
    window,
    setInterval: (fn) => { intervals.push(fn); return intervals.length; },
    clearInterval: () => {},
  }, { filename: 'analytics.js' });

  function emit(name, event) {
    for (const fn of listeners.get(name) || []) fn(event);
  }
  function click(elements) {
    emit('click', {
      target: { closest: (selector) => elements[selector] || null },
    });
  }
  function flush() {
    while (intervals.length) intervals.shift()();
  }
  function link() {
    return { closest: (selector) => selector === '.card' ? card : null };
  }
  return { document, window, card, calls, scripts, intervals, emit, click, flush, link };
}

test('first visit loads analytics without waiting for the service worker', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  assert.match(html, /<script src="\.\/analytics\.js" defer><\/script>/);
  assert.match(sw, /'\.\/analytics\.js'/);
  assert.doesNotMatch(sw, /withAnalytics/);
});

test('initializes the official GoatCounter script with the expected endpoint', () => {
  const h = makeHarness();
  assert.equal(h.scripts.length, 1);
  assert.equal(h.scripts[0].src, 'https://gc.zgo.at/count.js');
  assert.equal(h.scripts[0]['data-goatcounter'], 'https://tools-portal.goatcounter.com/count');
});

test('tracks adding and removing a favorite as distinct per-tool events', () => {
  const h = makeHarness();
  let isFavorite = false;
  const favorite = {
    dataset: { tool: 'sample-tool' },
    getAttribute: () => String(isFavorite),
  };
  h.click({ '.fav-btn': favorite });
  h.flush();
  isFavorite = true;
  h.click({ '.fav-btn': favorite });
  h.flush();
  assert.deepEqual(h.calls.map((entry) => entry.path), [
    'tool-favorite-add:sample-tool', 'tool-favorite-remove:sample-tool',
  ]);
  for (const entry of h.calls) {
    assert.equal(entry.event, true);
    assert.equal(entry.no_session, true);
    assert.match(entry.title, /Sample Tool/);
  }
});

test('real GitHub links are tracked, share buttons are not misclassified', () => {
  const h = makeHarness();
  h.click({ 'a.gh-link[href^="https://github.com/"]': h.link() });
  h.click({ 'button.share-btn': h.link() });
  h.flush();
  assert.deepEqual(h.calls.map((entry) => entry.path), [
    'tool-github:sample-tool', 'tool-share:sample-tool',
  ]);
});

test('external opens and actual demo openings share one event name without duplication', () => {
  const h = makeHarness();
  h.click({ 'a.cta[href]:not(.demo-link)': h.link() });
  h.emit('tools-portal:tool-open', { detail: { toolId: 'sample-tool' } });
  h.flush();
  assert.deepEqual(h.calls.map((entry) => entry.path), [
    'tool-open:sample-tool', 'tool-open:sample-tool',
  ]);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /function openDemo\(link\)[\s\S]*?new CustomEvent\('tools-portal:tool-open'/);
});

test('ignores missing cards and waits for the analytics library to load', () => {
  const h = makeHarness(false);
  h.emit('tools-portal:tool-open', { detail: { toolId: 'not-a-card' } });
  assert.equal(h.intervals.length, 0);

  h.emit('tools-portal:tool-open', { detail: { toolId: 'sample-tool' } });
  assert.equal(h.intervals.length, 1);
  const retry = h.intervals.shift();
  retry();
  assert.equal(h.calls.length, 0);
  h.window.goatcounter = { count: (data) => h.calls.push(data) };
  retry();
  assert.equal(h.calls[0].path, 'tool-open:sample-tool');
});
