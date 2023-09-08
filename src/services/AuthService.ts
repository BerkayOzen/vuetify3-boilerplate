import axios from 'axios';

import Query from './Query';

export default class AuthService extends Query {
  constructor() {
    super();
    this.resource = '/auth';
  }

  async login(credentials: object) {
    this.resource = '/auth/login';
    return await axios.post(`${this.resource}${this.query()}`, credentials);
  }

  async logout() {
    this.resource = '/auth/logout';
    return await axios.get(`${this.resource}${this.query()}`);
  }
}
