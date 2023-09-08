import Query from './Query';

export default class OfferScopeService extends Query {
  constructor() {
    super();
    this.resource = '/auth/offer-scopes';
  }
}
