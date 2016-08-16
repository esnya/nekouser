'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _router = require('express/lib/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function Router() {
    _classCallCheck(this, Router);

    Object.assign(this, (0, _router2.default)());
};

exports.default = Router;