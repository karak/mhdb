import SearchResult from './SearchResult';

/**
 * Client to retrieve results as HTML.
 */
export default class HtmlClient {
  private host: string;

  constructor(host: string) {
    this.host = host;
  }

  searchWorks(): Promise<string> {
    throw new Error('NOT IMPLE');
  }
}
