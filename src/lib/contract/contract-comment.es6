import {pad} from "../utils/string-utils";
import CommentsGenerator from "../generators/comments-generator";

const generator = new CommentsGenerator();

export function insertComment(contract, node) {
    let comment = generator.generate(node).trim();
    if (!comment) return;
    let commentLines = comment.split('\n');
    if (updateComment(contract, commentLines, node.loc)) return;
    commentLines = pad(
        node.loc.start.column,
        commentLines,
        isTab(contract.getOriginalLineAt(node.loc.start.line - 1))
    );
    contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
}

function updateComment(contract, commentLines, location) {
    let line = location.start.line;
    if (hasComment(contract, line)) {
        // extract old comments
        let oldCommentsParams = [];
        let oldCommentsMap = {};
        let oldCommentPosition = line - 2;
        while (true) {
            let comment = contract.getLineAt(oldCommentPosition).trim();
            if (comment.startsWith('/// @param')) {
                oldCommentsParams.push({line: oldCommentPosition, value: comment})
            } else if (comment.startsWith('//')) {
                oldCommentsMap[comment.match(/\/\/\/ @([a-zA-Z]*)\b/g)[0]] = comment
            } else if (!comment.startsWith('function')) {
                break;
            }
            oldCommentPosition--;
        }
        // check if old comment is generated comment
        if (isEmptyObject(oldCommentsMap)) {
            return true;
        }
        // extract new comments
        let newCommentsParams = [];
        let newCommentsMap = commentLines.reduce(function (map, obj) {
            let key = obj.match(/\/\/\/ @([a-zA-Z]*)\b/g)[0];
            if (key === "/// @param") {
                newCommentsParams.push(obj);
            } else map[key] = obj;
            return map;
        }, {});
        // update params if changed
        if (newCommentsParams.length) {
            for (let k in oldCommentsMap) {
                if (!k in newCommentsMap) {
                    return true;
                }
            }
            let firstCommentLine = oldCommentsParams
                .reduce((min, b) => Math.min(min, b.line), oldCommentsParams[0].line);
            // remove old params comments and save additional information about params
            let savedComments = {};
            for (let oldComment of oldCommentsParams) {
                contract.removeLine(firstCommentLine);
                // save old right part of comment
                let c = oldComment.value.toString().trim().split(' ');
                if (c.length > 3) {
                    savedComments[c[2]] = c.slice(3).join(' ');
                }
            }
            // insert new params comments
            newCommentsParams = pad(
                location.start.column,
                newCommentsParams,
                isTab(contract.getOriginalLineAt(location.start.line - 1))
            );
            for (let newComment of newCommentsParams.reverse()) {
                let oldCommentParamName = newComment.trim().split(' ')[2];
                let savedComment = savedComments[oldCommentParamName];
                if (typeof savedComment !== "undefined") {
                    newComment = newComment + " " + savedComment;
                }
                contract.insertLinesBeforeWithoutCalculatingAndAddingOffset(newComment.split(), firstCommentLine);
            }
            contract.addOffset(firstCommentLine, newCommentsParams.length - oldCommentsParams.length);
            return true;
        }
        return true;
    }
    return false;
}

function hasComment(contract, line) {
    let counter = 1;
    while (true) {
        counter++;
        let lineText = contract.getOriginalLineAt(line - counter);
        if (lineText.trim().startsWith('function')) {
            lineText = contract.getOriginalLineAt(line - counter - 1);
        }
        if (lineText === undefined) return false;
        lineText = lineText.trim();
        if (lineText.startsWith('*') || lineText.startsWith('//')) return true;
        if (!lineText.replace(/\s/g, '').length) continue;
        return false;
    }
}

function isEmptyObject(obj) {
    for (let name in obj) {
        return false;
    }
    return true;
}

function isTab(originalLineAt) {
    return originalLineAt.startsWith('\t');
}