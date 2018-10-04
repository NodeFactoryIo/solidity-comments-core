import parser from 'solidity-parser-antlr';
import { ContractFile } from './lib/contract/contract-file';
import { Contract } from './lib/contract/contract';
import CommentsGenerator from './lib/generators/comments-generator';
import ContractParts from './lib/contract-parts.es6';
import { pad } from './lib/utils/string-utils';

const generator = new CommentsGenerator();

export function generateCommentsFromText(text, config = {}) {
  return generate(new Contract(text), config);
}

export function generateCommentsFromFile(path, config = {}) {
  let contract = new ContractFile(path);
  generate(contract, config);
  contract.save();
}

function generate(contract, config) {
  let ast = parser.parse(
    contract.getText(),
    {tolerant: true, loc: true, range: true}
  );
  const visitors = getVisitors(contract);
  parser.visit(ast, visitors);
  return contract.getText();
}

function getVisitors(contract) {
  let visitors = {};
  for (let prop in ContractParts) {
    if (ContractParts.hasOwnProperty(prop)) {
      visitors[ContractParts[prop]] = function(node) {
        insertComment(contract, node);
      };
    }
  }
  return visitors;
}

function isTab(originalLineAt) {
  return originalLineAt.startsWith('\t');
}

function hasComment(contract, line) {
  let counter = 1;
  while (true) {
    counter++;
    let lineText = contract.getOriginalLineAt(line - counter);
    if (lineText === undefined) return false;
    lineText = lineText.trim();
    if (lineText.startsWith('*') || lineText.startsWith('//')) return true;
    if (!lineText.replace(/\s/g, '').length) continue;
    return false;
  }
}

function insertComment(contract, node) {
  let comment = generator.generate(node).trim();
  if (!comment) return;
  if (hasComment(contract, node.loc.start.line)) return;
  let commentLines = comment.split('\n');
  commentLines = pad(
    node.loc.start.column,
    commentLines,
    isTab(contract.getOriginalLineAt(node.loc.start.line - 1))
  );
  contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
}
