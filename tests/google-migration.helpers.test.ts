import test from 'node:test';
import assert from 'node:assert/strict';

import {
  convertHtmlToGoogleDocText,
  pickFirstNonEmptyArray,
} from '@/lib/google-migration/helpers';

test('convertHtmlToGoogleDocText strips markup and preserves block spacing', () => {
  const html = `
    <h1>Maintenance Agreement</h1>
    <p>Line one.</p>
    <ul>
      <li>Inspect roof</li>
      <li>Clear gutters</li>
    </ul>
    <p>Final line.</p>
  `;

  assert.equal(
    convertHtmlToGoogleDocText(html),
    'Maintenance Agreement\n\nLine one.\n\n- Inspect roof\n- Clear gutters\n\nFinal line.'
  );
});

test('pickFirstNonEmptyArray chooses the first populated collection', () => {
  const result = pickFirstNonEmptyArray([], null, undefined, ['a', 'b'], ['c']);
  assert.deepEqual(result, ['a', 'b']);
});

test('pickFirstNonEmptyArray returns empty array when all candidates are empty', () => {
  const result = pickFirstNonEmptyArray([], null, undefined);
  assert.deepEqual(result, []);
});
