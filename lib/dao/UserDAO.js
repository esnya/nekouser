'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _inject = require('../utilities/inject');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableKey = Symbol('table');

var filter = function filter(user) {
    return user && _lodash2.default.omit(user, 'password');
};

var UserDAO = function () {
    function UserDAO() {
        _classCallCheck(this, UserDAO);

        this[TableKey] = new _Table2.default('users');
    }

    _createClass(UserDAO, [{
        key: 'findById',
        value: function findById(id) {
            return this[TableKey].find({ id: id }).then(filter);
        }
    }]);

    return UserDAO;
}();

exports.default = (0, _inject.singleton)(UserDAO);