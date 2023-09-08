import Query from './Query';

export default class DisciplineService extends Query {
  constructor() {
    super();
    this.resource = '/auth/disciplines';
  }
}
