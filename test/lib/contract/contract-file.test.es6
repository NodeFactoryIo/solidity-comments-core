import test from 'tape';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ContractFile } from '../../../src/lib/contract/contract-file';

test('Assert not founding contract file', (t) => {
  t.plan(1);
  try {
    new ContractFile('./random.sol');
  } catch (e) {
    t.equal(e.message, 'File ./random.sol not found!');
  }
});

test('Assert creating new ContractFile instance', (t) => {
  t.plan(1);
  let contract = new ContractFile('./test/test-contracts/Metacoin.sol');
  t.notEqual(contract, null);
});

test('Assert get filename', (t) => {
  t.plan(1);
  let contract = new ContractFile('./test/test-contracts/Metacoin.sol');
  const filename = contract.getFilename();
  t.equal(filename, 'Metacoin.sol');
});

test('Assert get path', (t) => {
  t.plan(1);
  let contract = new ContractFile('./test/test-contracts/Metacoin.sol');
  const path = contract.getPath();
  t.equal(path, './test/test-contracts/Metacoin.sol');
});

test('Save file', async(t) => {
  t.plan(1);
  let contract = new ContractFile('./test/test-contracts/Metacoin.sol');
  contract.insertTextBefore('test1\nbla', 'pragma solidity ^0.4.24;');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(),"solidity-comments-core"));
  const filePath = path.join(tmp,'Metacoin-test.sol');
  await contract.save(filePath);
  t.notEqual(fs.readFileSync(filePath), fs.readFileSync('./test/test-contracts/Metacoin.sol'));
});
