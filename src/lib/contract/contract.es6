export class Contract {

  constructor(text) {
    if (Array.isArray(text)) {
      this.lines = text;
    } else {
      this.lines = text.split('\n');
    }
    this.pos = 0;
    this.offsets = {};
  }

  reset() {
    this.pos = 0;
  }

  getLineCount() {
    return this.lines.length;
  }

  getPosition() {
    return this.pos;
  }

  setPosition(pos) {
    this.pos = pos;
  }

  getNextLine() {
    if (this.pos >= this.lines.length) {
      return null;
    }
    return this.lines[this.pos++];
  }

  removeLine(pos) {
    this.lines.splice(pos, 1);
  }

  removeLines(positions) {
    positions.forEach((pos) => this.removeLine(pos));
  }

  insertLinesBefore(lines, line) {
    line += this.offset(line);
    this.addOffset(line, lines.length);
    this.lines.splice(line, 0, ...lines);
  }

  insertTextBefore(text, line) {
    let lines = text.split('\n');
    this.insertLinesBefore(lines, line);
  }

  getText() {
    return this.lines.join('\n');
  }

  getLineAt(pos) {
    return this.lines[pos];
  }

  getOriginalLineAt(pos) {
    return this.lines[pos + this.offset(pos)];
  }

  addOffset(line, offset) {
    this.offsets[line] = offset;
  }

  offset(line) {
    let offsetAmount = 0;
    for (let offset in this.offsets) {
      if (this.offsets.hasOwnProperty(offset)) {
        if (line >= offset) {
          offsetAmount += this.offsets[offset];
        }
      }
    }
    return offsetAmount;
  }
}
