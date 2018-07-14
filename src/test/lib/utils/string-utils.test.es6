import test from 'tape';
import * as stringUtils from '../../../lib/utils/string-utils';

test('Assert single line text is padded with 2 spaces', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, 'test-text');
  t.equal(padded, '  test-text', 'Given text should have 2 spaces infront');
});

test('Assert each line of multiline text is padded with 2 spaces', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, 'test-text\ntest2-text');
  t.equal(
    padded,
    '  test-text\n  test2-text',
    'Given text should have 2 spaces infront of each line'
  );
});

test('Assert single line text is padded with 2 tabs', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, 'test-text', true);
  t.equal(padded, '\t\ttest-text', 'Given text should have 2 tabs infront');
});

test('Assert each line of multiline text is padded with 2 tabs', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, 'test-text\ntest2-text', true);
  t.equal(
    padded,
    '\t\ttest-text\n\t\ttest2-text',
    'Given text should have 2 tabs infront of each line'
  );
});

test('Assert each line of array is padded with 2 spaces', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, ['test-text', 'test2-text']);
  t.deepEqual(
    padded,
    ['  test-text', '  test2-text'],
    'Given text should have 2 spaces infront of each line'
  );
});

test('Assert each line of aray is padded with 2 tabs', (t) => {
  t.plan(1);
  let padded = stringUtils.pad(2, ['test-text', 'test2-text'], true);
  t.deepEqual(
    padded,
    ['\t\ttest-text', '\t\ttest2-text'],
    'Given text should have 2 tabs infront of each line'
  );
});
