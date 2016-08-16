import UserDAO from '../dao/UserDAO';
import Router from '../express/Router';
import { inject } from '../utilities/inject';

export default class Users extends Router {
    constructor() {
        super();

        this.userDAO = inject(UserDAO);

        this.get('/test', (req, res) => res.send('hello'));
    }
}
