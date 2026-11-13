import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const portal = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const analytics = readFileSync(new URL('../analytics.js', import.meta.url), 'utf8');

test('le portail référence 14 outils avec des IDs uniques', () => {
  const ids = [...portal.matchAll(/<article class="card" id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 14);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(portal, /<dt>Outils<\/dt><dd>14<\/dd>/);
});

test('Front Pattern Catalog est dans la section catalogues, avec lien de démo et GitHub', () => {
  const start = portal.indexOf('<article class="card" id="frontend-patterns">');
  assert.ok(start > portal.indexOf('data-category="catalogue"'));
  assert.ok(start < portal.indexOf('data-category="productivite"'));
  const card = portal.slice(start, portal.indexOf('</article>', start));
  assert.match(card, /<h3>Front Pattern Catalog<\/h3>/);
  assert.match(card, /class="cta demo-link" href="https:\/\/sims07\.github\.io\/front-pattern-catalog\/"/);
  assert.match(card, /class="gh-link" href="https:\/\/github\.com\/Sims07\/front-pattern-catalog"/);
  assert.match(card, /<div class="card-top-right"><\/div>/);
});

test('raccourci PWA et renouvellement du cache', () => {
  const shortcut = manifest.shortcuts.find((s) => s.url === './index.html#demo=frontend-patterns');
  assert.ok(shortcut);
  assert.equal(shortcut.name, 'Front Pattern Catalog');
  assert.match(sw, /CACHE_VERSION = 'v11'/);
});

test('les événements GoatCounter utilisent les classes génériques des vignettes', () => {
  assert.match(analytics, /closest\('\.fav-btn'\)/);
  assert.match(analytics, /closest\('\.cta\[href\]'\)/);
  assert.match(analytics, /closest\('\.gh-link'\)/);
  assert.match(portal, /document\.querySelectorAll\('\.card'\)/);
});
