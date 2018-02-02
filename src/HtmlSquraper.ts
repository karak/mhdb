import SearchResult from './SearchResult';
import Work from './Work';
import * as cheerio from 'cheerio';

export default class HtmlSquraper {
  parseWorks(html: string): SearchResult<Work> {
    const $ = this.load(html);

    const $trs = this.parseRows($);
    const totalCount = $trs.length; // TODO: get from actual data
    const hasNext = false; // TODO: get from actual data

    // The following line -- even "empty" map function -- causes out of memory. BUG of Cheerio?
    const items = $trs.map((i, tr) => {
      const $tds = $('td', tr);
      const id = this.getCid($tds.eq(0));
      const body = this.getBody($tds.eq(0));
      const author = this.getAuthor($tds.eq(1));
      return { id, body, author } as Work;
    }).get() as any as Work[]; // Quickfix for @types/cheerio v0.22.0

    return { items, totalCount, hasNext };
  }

  private load(html: string) {
    return cheerio.load(html, {
      xmlMode: false,
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
      normalizeWhitespace: true,
    });
  }

  private parseRows($: CheerioStatic) {
    return $('a[name="result"] + table a[name="top"] + br + table + table + table tr');
  }

  private getCid($td1: Cheerio) {
    const href = $td1.find('a').attr('href') as (string | undefined);
    const id = href !== undefined ? this.parseHref(href) : undefined;
    return id;
  }

  private parseHref(href: string) {
    return href.replace(/^work_detail.php\?cd=(.*)/, '$1');
  }

  private getBody($td1: Cheerio) {
    return $td1.text();
  }

  private getAuthor($td2: Cheerio) {
    return $td2.text();
  }
}
