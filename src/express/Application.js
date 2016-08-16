import { EventEmitter } from 'events';
import { application, request, response } from 'express';

export default function Application() {
    const app = this;

    app.init();
    app.handler = (...args) => app.handle(args);

    function Request() { this.app = app; }
    Request.prototype = request;

    function Response() { this.app = app; }
    Response.prototype = response;

    this.request = new Request();
    this.response = new Response();
}

Application.prototype = new EventEmitter();
Object.assign(Application.prototype, application);
