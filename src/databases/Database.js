import Knex from 'knex';
import { bindConfig, singleton } from '../utilities/inject';

export default singleton(bindConfig('databases', 'database')(Knex));
