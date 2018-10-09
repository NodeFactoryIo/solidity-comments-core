import {pad} from "../utils/string-utils";
import CommentsGenerator from "../generators/comments-generator";

// regexps
const generatedCommentRegex = new RegExp('/// @([a-zA-Z]*)\\b');
const parameterCommentRegex = '/// @param';

export class ContractComment {

    constructor(contract) {
        this.contract = contract;
        this.generator = new CommentsGenerator();
    }

    insertComment(node) {
        const comment = this.generator.generate(node).trim();
        if (!comment) return;
        let commentLines = comment.split('\n');
        if (this.updateComment(commentLines, node.loc)) return;
        commentLines = pad(
            node.loc.start.column,
            commentLines,
            this.isTab(this.contract.getOriginalLineAt(node.loc.start.line - 1))
        );
        this.contract.insertLinesBefore(commentLines, node.loc.start.line - 1);
    }

    updateComment(commentLines, location) {
        let line = location.start.line;
        if (this.hasComment(line)) {
            // extract old comments
            let oldCommentsParams = [];
            let oldCommentsMap = {};
            let oldCommentPosition = line - 2;
            while (true) {
                let comment = this.contract.getLineAt(oldCommentPosition).trim();
                if (comment.startsWith(parameterCommentRegex)) {
                    oldCommentsParams.push({line: oldCommentPosition, value: comment})
                } else if (comment.startsWith('//')) {
                    oldCommentsMap[comment.match(generatedCommentRegex)[0]] = comment
                } else if (!comment.startsWith('function')) {
                    break;
                }
                oldCommentPosition--;
            }
            // check if old comment is generated comment
            if (this.isEmptyObject(oldCommentsMap)) {
                return true;
            }
            // extract new comments
            let newCommentsParams = [];
            let newCommentsMap = commentLines.reduce(function (map, obj) {
                let key = obj.match(generatedCommentRegex)[0];
                if (key === parameterCommentRegex) {
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
                    this.contract.removeLine(firstCommentLine);
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
                    this.isTab(this.contract.getOriginalLineAt(location.start.line - 1))
                );
                for (let newComment of newCommentsParams.reverse()) {
                    let oldCommentParamName = newComment.trim().split(' ')[2];
                    let savedComment = savedComments[oldCommentParamName];
                    if (typeof savedComment !== "undefined") {
                        newComment = newComment + " " + savedComment;
                    }
                    this.contract.insertLinesBeforeWithoutCalculatingAndAddingOffset(newComment.split(), firstCommentLine);
                }
                this.contract.addOffset(firstCommentLine, newCommentsParams.length - oldCommentsParams.length);
                return true;
            }
            return true;
        }
        return false;
    }

    hasComment(line) {
        let counter = 1;
        while (true) {
            counter++;
            let lineText = this.contract.getOriginalLineAt(line - counter);
            if (lineText.trim().startsWith('function')) {
                lineText = this.contract.getOriginalLineAt(line - counter - 1);
            }
            if (lineText === undefined) return false;
            lineText = lineText.trim();
            if (lineText.startsWith('*') || lineText.startsWith('//')) return true;
            if (!lineText.replace(/\s/g, '').length) continue;
            return false;
        }
    }

    isEmptyObject(obj) {
        for (let name in obj) {
            return false;
        }
        return true;
    }

    isTab(originalLineAt) {
        return originalLineAt.startsWith('\t');
    }
}



