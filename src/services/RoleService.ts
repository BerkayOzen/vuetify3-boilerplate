import Query from './Query';

export default class RoleService extends Query {
  constructor() {
    super();
    this.resource = '/auth/roles';
  }
}
