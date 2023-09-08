import Query from './Query';

export default class CurrencyService extends Query {
  constructor() {
    super();
    this.resource = '/auth/currencies';
  }
}
