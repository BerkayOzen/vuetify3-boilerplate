import Query from './Query';

export default class ProjectService extends Query {
  constructor() {
    super();
    this.resource = '/auth/projects';
  }
}
