import test from 'tape';
import { Contract } from '../../../src/lib/contract/contract';

test('Assert creating instance with array of lines', (t) => {
  t.plan(1);
  let contract = new Contract(['line1', 'line2']);
  t.equal(contract.getLineCount(), 2);
});

test('Assert creating instance with text', (t) => {
  t.plan(1);
  let contract = new Contract('line1\nline2');
  t.equal(contract.getLineCount(), 2);
});

test('Assert reset Contract position', (t) => {
  t.plan(2);
  let contract = new Contract(['line1', 'line2']);
  contract.getNextLine();
  t.equal(contract.getPosition(), 1);
  contract.reset();
  t.equal(contract.getPosition(), 0);
});

test('Assert get next line', (t) => {
  t.plan(1);
  let contract = new Contract(['line1', 'line2']);
  const line = contract.getNextLine();
  t.equal(line, 'line1');
});

test('Assert get next line when index out of range', (t) => {
  t.plan(1);
  let contract = new Contract(['line1', 'line2']);
  contract.setPosition(99999);
  const line = contract.getNextLine();
  t.equal(line, null);
});

test('Assert remove line', (t) => {
  t.plan(1);
  let contract = new Contract(['line1', 'line2']);
  contract.removeLine(0);
  t.equal(contract.getNextLine(), 'line2');
});

test('Insert single line before', (t) => {
  t.plan(1);
  let contract = new Contract(['line1', 'line2']);
  contract.insertLinesBefore(['test'], 0);
  t.equal(contract.getLineAt(0), 'test');
});

test('Insert text before', (t) => {
  t.plan(2);
  let contract =new Contract(['line1', 'line2']);
  contract.insertTextBefore('test1\nbla', 0);
  t.equal(contract.getNextLine(), 'test1');
  t.equal(contract.getNextLine(), 'bla');
});

test('Insert text before with offset', (t) => {
  t.plan(4);
  let contract =new Contract(['line1', 'line2']);
  contract.insertTextBefore('test1\nbla', 0);
  t.equal(contract.getLineAt(0), 'test1');
  t.equal(contract.getLineAt(1), 'bla');
  contract.insertTextBefore('offset', 0);
  t.equal(contract.offset(0), 2);
  t.equal(contract.getLineAt(2), 'offset');
});


test('Assert get line at', (t) => {
  t.plan(1);
  let contract =new Contract(['line1', 'line2']);
  contract.insertTextBefore('test1\nbla', 0);
  t.equal(contract.getLineAt(1), 'bla');
});

test('Assert get original line at', (t) => {
  t.plan(1);
  let contract =new Contract(['line1', 'line2']);
  contract.insertTextBefore('test1\nbla', 0);
  t.equal(contract.getOriginalLineAt(1), 'line2');
});
