import router from 'express/lib/router';

export default class Router {
    constructor() {
        Object.assign(this, router());
    }
}
