import test from 'tape';
import fs from 'fs';
import { generateCommentsFromText } from '../src/index';

test('Assert generate comments from text', (t) => {
  t.plan(1);
  let commentedContract =
    generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.sol', 'utf-8'));
    console.log(commentedContract);
  t.equal(
    commentedContract,
    fs.readFileSync('./test/test-contracts/Metacoin.commented.sol', 'utf-8')
  );
});

test('Assert generate comments from text second time wont duplicate', (t) => {
  t.plan(1);
  let commentedContract =
    generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.sol', 'utf-8'));
  commentedContract =
    generateCommentsFromText(commentedContract, 'utf-8');
  t.equal(
    commentedContract,
    fs.readFileSync('./test/test-contracts/Metacoin.commented.sol', 'utf-8')
  );
});

test('Assert generate comments from edited contract', (t) => {
    t.plan(1);
    let commentedContract =
        generateCommentsFromText(fs.readFileSync('./test/test-contracts/Metacoin.edited.sol', 'utf-8'));

    t.equal(
        commentedContract,
        fs.readFileSync('./test/test-contracts/Metacoin.edited.commented.sol', 'utf-8')
    );
});