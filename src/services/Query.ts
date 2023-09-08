import axios, { type AxiosRequestConfig } from 'axios';

interface IConfig extends AxiosRequestConfig {
  skip: boolean;
}

export default class Query {
  public resource = axios.defaults.baseURL ?? '127.0.0.1';
  public queries: string[];
  public config: IConfig;

  constructor() {
    this.queries = [];
    this.config = { skip: false };
  }

  query() {
    const query = '?' + this.queries.join('&');
    this.queries = [];
    return query;
  }

  filter(value: string) {
    if (value) {
      this.queries.push(`searches=${value}`);
    }
    return this;
  }

  filterByCriteria(criteria: Record<string, string>) {
    Object.keys(criteria).map(x => {
      const key = criteria[x];
      this.queries.push(`${x}=${key}`);

      return null;
    });
    return this;
  }

  fields(fields: string[]) {
    this.queries.push(`fields=${fields.join(',')}`);
    return this;
  }

  include(relations: string[]) {
    this.queries.push(`include=${relations.join(',')}`);
    return this;
  }

  parameter(key: string, value: string) {
    if (value) {
      this.queries.push(`${key}${value ? '=' + value : ''}`);
    }
    return this;
  }

  sort(field: string, sortBy = 'asc') {
    if (field) {
      this.queries.push(`orderBy=${field}`);
      this.queries.push(`sortedBy=${sortBy}`);
    }
    return this;
  }

  paginate(page = 1, perPage = 10) {
    this.queries.push(`paginate=${perPage}`);
    this.queries.push(`page=${page}`);
    return this;
  }

  async all() {
    return await axios.get(`${this.resource}${this.query()}`, this.config);
  }

  async show(id: string) {
    return await axios.get(
      `${this.resource}/${id}${this.query()}`,
      this.config
    );
  }

  async store(params: object) {
    return await axios.post(`${this.resource}${this.query()}`, params);
  }

  async update(id: string, params: object) {
    return await axios.put(`${this.resource}/${id}${this.query()}`, params);
  }

  async destroy(id: string) {
    return await axios.delete(`${this.resource}/${id}${this.query()}`);
  }

  skip() {
    this.config.skip = true;
    return this;
  }

  async table() {
    return await axios.get(`${this.resource}${this.query()}`, this.config);
  }
}
