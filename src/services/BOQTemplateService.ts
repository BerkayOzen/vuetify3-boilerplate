import Query from './Query';

export default class BOQTemplateService extends Query {
  constructor() {
    super();
    this.resource = '/auth/boq-templates';
  }
}
