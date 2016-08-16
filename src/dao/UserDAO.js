import _ from 'lodash';
import { singleton } from '../utilities/inject';
import Table from './Table';

const TableKey = Symbol('table');

const filter = user => user && _.omit(user, 'password');

class UserDAO {
    constructor() {
        this[TableKey] = new Table('users');
    }

    findById(id) {
        return this[TableKey].find({ id }).then(filter);
    }
}
export default singleton(UserDAO);
