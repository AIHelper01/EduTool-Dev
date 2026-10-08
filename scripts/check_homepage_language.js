// Run with: node scripts/check_homepage_language.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '');
function check(savedLanguage, blockedStorage = false) {
  const nodes = [...markup.matchAll(/>([^<>]+)</g)].map(match => ({
    textContent: match[1], parentElement: { closest: () => false }
  }));
  const original = nodes.map(node => node.textContent);
  const attributes = [...markup.matchAll(/<[^>]*(?:aria-label="([^"]+)"|name="description" content="([^"]+)")[^>]*>/g)].map(match => ({
    tagName: match[2] ? 'META' : 'NAV', value: match[1] || match[2],
    getAttribute() { return this.value; }, setAttribute(name, value) { this.value = value; }
  }));
  const button = { setAttribute() {}, addEventListener(event, handler) { this.click = handler; } };
  let position = 0;
  const document = {
    documentElement: { lang: 'zh-CN' },
    createTreeWalker: () => ({ nextNode() { this.currentNode = nodes[position++]; return !!this.currentNode; } }),
    querySelectorAll: () => attributes, getElementById: () => button
  };
  const localStorage = {
    getItem() { if (blockedStorage) throw Error('blocked'); return savedLanguage; },
    setItem(key, value) { if (blockedStorage) throw Error('blocked'); savedLanguage = value; }
  };
  vm.runInNewContext(script, { document, NodeFilter: { SHOW_TEXT: 4 }, localStorage });
  assert.equal(document.documentElement.lang, savedLanguage === 'en' ? 'en' : 'zh-CN');
  if (document.documentElement.lang === 'en') button.click();
  assert.deepEqual(nodes.map(node => node.textContent), original);
  button.click();
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(button.textContent, '中文');
  assert.ok(nodes.some(node => node.textContent.includes('Interactive AI tools')));
  assert.ok(nodes.every(node => !/[\u3400-\u9fff]/.test(node.textContent)), 'Untranslated visible Chinese text: ' + nodes.filter(node => /[\u3400-\u9fff]/.test(node.textContent)).map(node => node.textContent).join(' | '));
  assert.ok(attributes.every(node => !/[\u3400-\u9fff]/.test(node.value)), 'Untranslated accessible label or metadata');
  if (!blockedStorage) assert.equal(savedLanguage, 'en');
  button.click();
  assert.equal(document.documentElement.lang, 'zh-CN');
  assert.equal(button.textContent, 'English');
  assert.deepEqual(nodes.map(node => node.textContent), original);
}
check(null);
check('en');
check('invalid');
check(null, true);
console.log('Homepage language check passed: translation coverage, round trip, saved preference, and blocked storage.');

