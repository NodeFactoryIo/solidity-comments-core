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

function updateComment(contract, commentLines, line) {
  if (hasComment(contract,line)) {

    let newCommentsParams = [];
    let newCommentsMap = commentLines.reduce(function(map, obj) {
      let key = obj.match(/\/\/\/ @([a-zA-Z]*)\b/g)[0];
      if(key === "/// @param") {
        newCommentsParams.push(obj);
      } else map[key] = obj;
      return map;
    }, {});

    let oldCommentsParams = [];
    let oldCommentsMap = {};
    let oldCommentPosition = line - 2;
    while (true) {
      let comment = contract.getLineAt(oldCommentPosition);
      if(comment.startsWith('/// @param')) {
        oldCommentsParams.push(comment)
      } else if(comment.startsWith('//')) {
        oldCommentsMap[comment.match(/\/\/\/ @([a-zA-Z]*)\b/g)[0]] = comment
      } else break;
    }

    return true;
  }
  //   let offsetCounter = commentLines.length + 1;
  //   for(let l of commentLines) {
  //     let currentLine = line - offsetCounter;
  //     let currentComment = contract.getLineAt(currentLine).trim();
  //     if (currentComment.startsWith('/// @param') && l.trim().startsWith('/// @param')) {
  //       contract.removeLine(currentLine);
  //       contract.insertLinesBefore(l.split(), currentLine);
  //     }
  //     offsetCounter--;
  //   }
  //   return true;
  // }
  return false;
}

function insertComment(contract, node) {
  let comment = generator.generate(node);
  if (!comment) return;
  let commentLines = comment.split('\n');
  if (updateComment(contract, commentLines, node.loc.start.line)) return;
  commentLines = pad(
    node.loc.start.column,
    commentLines,
    isTab(contract.getOriginalLineAt(node.loc.start.line - 1))
  );
  contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
}
