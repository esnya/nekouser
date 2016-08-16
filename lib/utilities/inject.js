'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inject = exports.bindConfig = exports.singleton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wrapper = function () {
    function Wrapper() {
        _classCallCheck(this, Wrapper);
    }

    _createClass(Wrapper, [{
        key: 'getInstance',
        value: function getInstance() {
            return null;
        }
    }]);

    return Wrapper;
}();

var SingletonWrapper = function (_Wrapper) {
    _inherits(SingletonWrapper, _Wrapper);

    function SingletonWrapper(ClassType) {
        _classCallCheck(this, SingletonWrapper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SingletonWrapper).call(this));

        _this.ClassType = ClassType;
        _this.instance = null;
        return _this;
    }

    _createClass(SingletonWrapper, [{
        key: 'getInstance',
        value: function getInstance() {
            return this.instance || (this.instance = new SingletonWrapper());
        }
    }]);

    return SingletonWrapper;
}(Wrapper);

var singleton = exports.singleton = function singleton(ClassType) {
    return new SingletonWrapper(ClassType);
};

var bindConfig = exports.bindConfig = function bindConfig(configKey) {
    var selector = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    return function (ClassType) {
        if (ClassType instanceof Wrapper) {
            return new ClassType.constructor(bindConfig(configKey, selector)(ClassType));
        }

        return function (_ClassType) {
            _inherits(ConfigWrapper, _ClassType);

            function ConfigWrapper() {
                _classCallCheck(this, ConfigWrapper);

                var conf = _config2.default.get(configKey);
                return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigWrapper).call(this, selector ? conf.get(_config2.default.get(selector)) : conf));
            }

            return ConfigWrapper;
        }(ClassType);
    };
};
var inject = exports.inject = function inject(ClassType) {
    return ClassType instanceof Wrapper ? ClassType.getInstance() : new ClassType();
};