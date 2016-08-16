import http from 'http';
import { bindConfig, singleton } from '../utilities/inject';
import Application from './Application';

class Server extends http.Server {
    constructor(listen) {
        const app = new Application();

        super(app.handler);

        console.log(listen);

        this.listen(listen, () => {
            console.log(`Listening on ${this.address}`);
        });
    }
}
export default singleton(bindConfig('server')(Server));
