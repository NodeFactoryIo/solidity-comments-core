import test from 'tape';
import fs from 'fs';
import { generateCommentsFromText } from '../src/index';

test('Assert generate comments from text', (t) => {
  t.plan(1);
  let commentedContract =
    generateCommentsFromText(fs.readFileSync('./test/Metacoin.sol', 'utf-8'));
  t.equal(
    commentedContract,
    fs.readFileSync('./test/Metacoin.commented.sol', 'utf-8')
  );
});

test('Assert generate comments from text second time wont duplicate', (t) => {
  t.plan(1);
  let commentedContract =
    generateCommentsFromText(fs.readFileSync('./test/Metacoin.sol', 'utf-8'));
  commentedContract =
    generateCommentsFromText(commentedContract, 'utf-8');
  t.equal(
    commentedContract,
    fs.readFileSync('./test/Metacoin.commented.sol', 'utf-8')
  );
});
