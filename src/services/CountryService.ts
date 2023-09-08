import Query from './Query';

export default class CountryService extends Query {
  constructor() {
    super();
    this.resource = '/auth/countries';
  }
}
