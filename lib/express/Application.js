'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Application;

var _events = require('events');

var _express = require('express');

function Application() {
    var app = this;

    app.init();
    app.handler = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return app.handle(args);
    };

    function Request() {
        this.app = app;
    }
    Request.prototype = _express.request;

    function Response() {
        this.app = app;
    }
    Response.prototype = _express.response;

    this.request = new Request();
    this.response = new Response();
}

Application.prototype = new _events.EventEmitter();
Object.assign(Application.prototype, _express.application);