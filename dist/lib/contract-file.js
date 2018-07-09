'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContractFile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _contract = require('./contract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractFile = exports.ContractFile = function (_Contract) {
  _inherits(ContractFile, _Contract);

  function ContractFile(filePath) {
    _classCallCheck(this, ContractFile);

    if (!_fs2.default.existsSync(filePath)) {
      throw new Error('File ' + filePath + ' not found!');
    }

    var _this = _possibleConstructorReturn(this, (ContractFile.__proto__ || Object.getPrototypeOf(ContractFile)).call(this, _fs2.default.readFileSync(filePath, 'utf-8').split('\n')));

    _this.path = filePath;
    _this.fileName = path.basename(filePath);
    return _this;
  }

  _createClass(ContractFile, [{
    key: 'getFilename',
    value: function getFilename() {
      return this.fileName;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }
  }, {
    key: 'save',
    value: function save() {
      var _this2 = this;

      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!path) {
        path = this.path;
      }
      return new Promise(function (resolve, reject) {
        var file = _fs2.default.createWriteStream(path);
        file.on('error', function (err) {
          reject(err);
        });
        _this2.lines.forEach(function (line) {
          file.write(line + '\n');
        });
        file.end();
        resolve();
      });
    }
  }]);

  return ContractFile;
}(_contract.Contract);
//# sourceMappingURL=contract-file.js.map