import parser from 'solidity-parser-antlr';
import { ContractFile } from './lib/contract/contract-file';
import { Contract } from './lib/contract/contract';
import CommentsGenerator from './lib/generators/comments-generator';
import ContractParts from './lib/contract-parts.es6';

const generator = new CommentsGenerator();

export function generateCommentsFromText(text, config = {}) {
  return generate(new Contract(text), config);
}

export function generateCommentsFromFile(path, config = {}) {
  let contract = new ContractFile(path);
  return generate(contract, config);
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

function insertComment(contract, node) {
  let comment = generator.generate(node);
  if (!comment) return;
  let commentLines = comment.split('\n');
  // TODO: generate padding
  contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
}
