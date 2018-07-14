export class Contract {

  constructor(text) {
    if (Array.isArray(text)) {
      this.lines = text;
    } else {
      this.lines = text.split('\n');
    }
    this.pos = 0;
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
    let index = this.lines.indexOf(line);
    this.lines.splice(index, 0, ...lines);
  }

  insertTextBefore(text, line) {
    let index = this.lines.indexOf(line);
    let lines = text.split('\n');
    this.lines.splice(index, 0, ...lines);
  }

}
