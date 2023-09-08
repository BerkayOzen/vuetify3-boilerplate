import axios from 'axios';

import Query from './Query';

export default class UserService extends Query {
  constructor() {
    super();
    this.resource = '/auth/users';
  }

  async me() {
    this.resource = '/auth/me';
    return await axios.get(`${this.resource}${this.query()}`);
  }
}
