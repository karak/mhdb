import SearchResult from './SearchResult';
import * as request from 'request-promise-native';
import { Response } from 'request';

/// 「現代俳句協会「現代俳句データベース」」
// tslint:disable-next-line:max-line-length
const DB_ENCODED = '%E7%8F%BE%E4%BB%A3%E4%BF%B3%E5%8F%A5%E5%8D%94%E4%BC%9A%E3%80%8C%E7%8F%BE%E4%BB%A3%E4%BF%B3%E5%8F%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%80%8D';
/// 「絞込検索」submitボタン
const SUBMIT_AND_ENCODED = '%E7%B5%9E%E8%BE%BC%E6%A4%9C%E7%B4%A2';

/**
 * Condition to search with
 */
export interface Query {
  /** kigo */
  kigo?: string;

  /** page number, 0-origin */
  page?: number;

  /** name of author that matches with surname or penname */
  author?: string;

  /** first part(perferct match) */
  first5?: string;

  /** last part(perferct match) */
  last5?: string;

  /** free word(partial match) */
  keyword?: string;
}

/** Alias to {encodeURIComponent} */
const enc = encodeURIComponent;

function makeQueryComponent(query: Query, propertyName: string, parameterName?: string) {
  const actualParameterName = parameterName || propertyName;
  return propertyName in query ? `&${actualParameterName}=${enc((<any>query)[propertyName])}` : '';
}

/**
 * Client to retrieve results as HTML.
 */
export default class HtmlClient {
  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  async searchWorks(query: Query): Promise<string> {

    const kigo = makeQueryComponent(query, 'kigo');
    const author = makeQueryComponent(query, 'author', 'author_name');
    const first5 = makeQueryComponent(query, 'first5');
    const last5 = makeQueryComponent(query, 'last5');
    const keyword = makeQueryComponent(query, 'keyword');
    const database = `&database=${DB_ENCODED}`;
    const order = '&order=work_up';
    const and = query.page === undefined || query.page === 0 ?
      `submit_and=${SUBMIT_AND_ENCODED}` :
      `search_type=and&next_i=${query.page}`;
    const queryString = `?${and}${kigo}${author}${first5}${last5}${keyword}${database}${order}`;
    const url = `http://${this.host}/search.php${queryString}`;
    return await request.get(url) as string;
  }
}
