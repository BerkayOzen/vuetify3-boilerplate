import Query from './Query';

export default class WorkDisciplineService extends Query {
  constructor() {
    super();
    this.resource = '/auth/work-disciplines';
  }
}
