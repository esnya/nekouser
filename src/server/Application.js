import Application from '../express/Application';
import Users from '../api/Users';

export default class App extends Application {
    constructor() {
        super();

        this.set('view engine', 'pug');

        this.use(Users);
    }
}
