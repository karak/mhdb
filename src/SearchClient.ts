import HtmlClient from './HtmlClient';
import HtmlSquraper from './HtmlSquraper';
import SearchResult from './SearchResult';
import Work from './Work';

/**
 * Client to search.
 */
export default class SearchClient {
  private client: HtmlClient;
  private squraper: HtmlSquraper;

  /**
   * Constructor
   *
   * @param host URL of the host
   */
  constructor(host: string) {
    this.client = new HtmlClient(host);
    this.squraper = new HtmlSquraper();
  }

  async searchWorks(): Promise<SearchResult<Work>> {
    const html = await this.client.searchWorks();
    const works = await this.squraper.parseWorks(html);
    return works;
  }
}
