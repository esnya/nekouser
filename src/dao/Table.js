import _ from 'lodash';
import Database from '../databases/Database';
import { inject, singleton } from '../utilities/inject';

export const toSQL = data => _.mapKeys(data, (value, key) => _.snakeCase(key));
export const fromSQL = data => _.mapKeys(data, (value, key) => _.camelCase(key));
export const whereToSQL = (args) => (
    typeof args[0] === 'string'
        ? [_.snakeCase(args[0]), args[1]]
        : [toSQL(args[0])]
);

const DefaultOptions = {
    primaryKey: 'id',
    autoInc: false,
};

class Table {
    constructor(tableName, options) {
        this.database = inject(Database);
        this.tableName = tableName;
        this.options = _.defaults(options, DefaultOptions);
    }

    get table() {
        return this.database(this.tableName);
    }

    findBase(...where) {
        return this.table.where(...whereToSQL(where));
    }

    findAll(...where) {
        return this.findBase(...where).then((data) => data.map(fromSQL));
    }

    find(...where) {
        return this.findBase(...where).first().then(fromSQL);
    }

    insert(data) {
        return this.table.insert(toSQL(data));
    }

    inesrtFind(data) {
        const { primaryKey, autoInc } = this.options;

        return this.find(data)
            .then((ids) => this.find(autoInc ? ids[0] : { [primaryKey]: data[primaryKey] }));
    }

    update(data, ...where) {
        return this.table.where(...whereToSQL(where)).update(toSQL(data));
    }

    updateFind(data, ...where) {
        return this.update(data, ...where).then(() => this.find(...where));
    }
}
export default singleton(Table);
