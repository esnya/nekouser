'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.whereToSQL = exports.fromSQL = exports.toSQL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Database = require('../databases/Database');

var _Database2 = _interopRequireDefault(_Database);

var _inject = require('../utilities/inject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toSQL = exports.toSQL = function toSQL(data) {
    return _lodash2.default.mapKeys(data, function (value, key) {
        return _lodash2.default.snakeCase(key);
    });
};
var fromSQL = exports.fromSQL = function fromSQL(data) {
    return _lodash2.default.mapKeys(data, function (value, key) {
        return _lodash2.default.camelCase(key);
    });
};
var whereToSQL = exports.whereToSQL = function whereToSQL(args) {
    return typeof args[0] === 'string' ? [_lodash2.default.snakeCase(args[0]), args[1]] : [toSQL(args[0])];
};

var DefaultOptions = {
    primaryKey: 'id',
    autoInc: false
};

var Table = function () {
    function Table(tableName, options) {
        _classCallCheck(this, Table);

        this.database = (0, _inject.inject)(_Database2.default);
        this.tableName = tableName;
        this.options = _lodash2.default.defaults(options, DefaultOptions);
    }

    _createClass(Table, [{
        key: 'findBase',
        value: function findBase() {
            var _table;

            for (var _len = arguments.length, where = Array(_len), _key = 0; _key < _len; _key++) {
                where[_key] = arguments[_key];
            }

            return (_table = this.table).where.apply(_table, _toConsumableArray(whereToSQL(where)));
        }
    }, {
        key: 'findAll',
        value: function findAll() {
            return this.findBase.apply(this, arguments).then(function (data) {
                return data.map(fromSQL);
            });
        }
    }, {
        key: 'find',
        value: function find() {
            return this.findBase.apply(this, arguments).first().then(fromSQL);
        }
    }, {
        key: 'insert',
        value: function insert(data) {
            return this.table.insert(toSQL(data));
        }
    }, {
        key: 'inesrtFind',
        value: function inesrtFind(data) {
            var _this = this;

            var _options = this.options;
            var primaryKey = _options.primaryKey;
            var autoInc = _options.autoInc;


            return this.find(data).then(function (ids) {
                return _this.find(autoInc ? ids[0] : _defineProperty({}, primaryKey, data[primaryKey]));
            });
        }
    }, {
        key: 'update',
        value: function update(data) {
            var _table2;

            for (var _len2 = arguments.length, where = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                where[_key2 - 1] = arguments[_key2];
            }

            return (_table2 = this.table).where.apply(_table2, _toConsumableArray(whereToSQL(where))).update(toSQL(data));
        }
    }, {
        key: 'updateFind',
        value: function updateFind(data) {
            var _this2 = this;

            for (var _len3 = arguments.length, where = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                where[_key3 - 1] = arguments[_key3];
            }

            return this.update.apply(this, [data].concat(where)).then(function () {
                return _this2.find.apply(_this2, where);
            });
        }
    }, {
        key: 'table',
        get: function get() {
            return this.database(this.tableName);
        }
    }]);

    return Table;
}();

exports.default = (0, _inject.singleton)(Table);