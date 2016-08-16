'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UserDAO = require('../dao/UserDAO');

var _UserDAO2 = _interopRequireDefault(_UserDAO);

var _Router2 = require('../express/Router');

var _Router3 = _interopRequireDefault(_Router2);

var _inject = require('../utilities/inject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_Router) {
    _inherits(Users, _Router);

    function Users() {
        _classCallCheck(this, Users);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Users).call(this));

        _this.userDAO = (0, _inject.inject)(_UserDAO2.default);

        _this.get('/test', function (req, res) {
            return res.send('hello');
        });
        return _this;
    }

    return Users;
}(_Router3.default);

exports.default = Users;