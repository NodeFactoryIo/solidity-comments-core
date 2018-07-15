import test from 'tape';
import fs from 'fs';
import { generateCommentsFromFile } from '../src/index';

test('Assert generate comments from text', (t) => {
  t.plan(1);
  let commentedContract = generateCommentsFromFile('./test/Metacoin.sol');
  t.equal(commentedContract, fs.readFileSync('./test/Metacoin.commented.sol', 'utf-8'));
});
