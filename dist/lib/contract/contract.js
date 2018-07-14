'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contract = exports.Contract = function () {
  function Contract(text) {
    _classCallCheck(this, Contract);

    if (Array.isArray(text)) {
      this.lines = text;
    } else {
      this.lines = text.split('\n');
    }
    this.pos = 0;
  }

  _createClass(Contract, [{
    key: 'reset',
    value: function reset() {
      this.pos = 0;
    }
  }, {
    key: 'getLineCount',
    value: function getLineCount() {
      return this.lines.length;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.pos;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(pos) {
      this.pos = pos;
    }
  }, {
    key: 'getNextLine',
    value: function getNextLine() {
      if (this.pos >= this.lines.length) {
        return null;
      }
      return this.lines[this.pos++];
    }
  }, {
    key: 'removeLine',
    value: function removeLine(pos) {
      this.lines.splice(pos, 1);
    }
  }, {
    key: 'removeLines',
    value: function removeLines(positions) {
      var _this = this;

      positions.forEach(function (pos) {
        return _this.removeLine(pos);
      });
    }
  }, {
    key: 'insertLinesBefore',
    value: function insertLinesBefore(lines, line) {
      var _lines;

      var index = this.lines.indexOf(line);
      (_lines = this.lines).splice.apply(_lines, [index, 0].concat(_toConsumableArray(lines)));
    }
  }, {
    key: 'insertTextBefore',
    value: function insertTextBefore(text, line) {
      var _lines2;

      var index = this.lines.indexOf(line);
      var lines = text.split('\n');
      (_lines2 = this.lines).splice.apply(_lines2, [index, 0].concat(_toConsumableArray(lines)));
    }
  }]);

  return Contract;
}();
//# sourceMappingURL=contract.js.map