import SearchResult from './SearchResult';
import Work from './Work';
import * as cheerio from 'cheerio';

export default class HtmlSquraper {
  parseWorks(html: string): SearchResult<Work> {
    const $ = this.load(html);

    const $trs = this.parseWorkRows($);
    const { totalCount, hasNext } = this.parseCountRows($);

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

  private parseWorkRows($: CheerioStatic) {
    let $trs = $('a[name="result"] + table a[name="top"] + br + table + table + table tr');
    $trs = $trs.slice(0, Math.max(0, $trs.length - 1));
    return $trs;
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

  private parseCountRows($: CheerioStatic) {
    const $tds = $('a[name="result"] + table table > tbody > tr:last-child > td table td');

    if ($tds.length === 2) {
      const totalCount = this.getTotalCount($tds.eq(0));
      const [start, end] = this.getCurrentRange($tds.eq(1)) || [0, totalCount];

      return {
        totalCount,
        hasNext: end < totalCount,
      };
    } else {
      return {
        totalCount: 0,
        hasNext: false,
      };
    }
  }

  private getTotalCount($td1: Cheerio) {
    const text = $td1.text().replace(/^(.*?)検索結果　(\d+)件中(.*?)$/, '$2');
    return parseInt(text, 10);
  }

  private getCurrentRange($td2: Cheerio): [number, number] | null {
    const result = /(\d+)件～(\d+)件/.exec($td2.text());
    if (result !== null) {
      return [parseInt(result[1], 10), parseInt(result[2], 10)];
    } else {
      return null;
    }
  }
}
