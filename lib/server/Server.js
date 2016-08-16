'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _inject = require('../utilities/inject');

var _Application = require('./Application');

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Server = function (_http$Server) {
    _inherits(Server, _http$Server);

    function Server(listen) {
        _classCallCheck(this, Server);

        var app = new _Application2.default();

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Server).call(this, app.handler));

        console.log(listen);

        _this.listen(listen, function () {
            console.log('Listening on ' + _this.address);
        });
        return _this;
    }

    return Server;
}(_http2.default.Server);

exports.default = (0, _inject.singleton)((0, _inject.bindConfig)('server')(Server));