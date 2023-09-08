import Query from './Query';

export default class RequestService extends Query {
  constructor() {
    super();
    this.resource = '/auth/requests';
  }
}
