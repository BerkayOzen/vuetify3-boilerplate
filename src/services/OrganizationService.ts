import Query from './Query';

export default class OrganizationService extends Query {
  constructor() {
    super();
    this.resource = '/auth/organizations';
  }
}
