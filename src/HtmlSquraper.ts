import SearchResult from './SearchResult';
import Work from './Work';
import * as cheerio from 'cheerio';

export default class HtmlSquraper {
  parseWorks(html: string): SearchResult<Work> {
    const $ = this.load(html);

    const totalCount = this.parseTotalCountRow($) || 0;
    const $trs = this.parseWorkRows($);
    const { hasNext } = this.parseCountRows($);

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

  private parseTotalCountRow($: CheerioStatic): number | undefined {
    const text = $('a[name="top"] + br + table + table tr td:first-child').text();
    const result = /以下の(\d+)件が検索されました。/.exec(text);
    if (result !== null) {
      return parseInt(result[1], 10);
    }
  }

  private parseWorkRows($: CheerioStatic) {
    let $trs = $('a[name="result"] + table a[name="top"] + br + table + table + table tr');
    if ($trs.length >= 2) {
      // chop first header row and last empty row.
      $trs = $trs.slice(1, $trs.length - 1);
    }
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
    const $tds = $([
      'a[name="result"] + table table > tbody > tr:last-child > td',
      'table tr:first-child td',
    ].join(' '));

    if ($tds.length === 2) {
      const totalCount = this.getTotalCount($tds.eq(0));
      const hasNext = this.getHasNext($tds.eq(1));

      return {
        totalCount,
        hasNext,
      };
    }
    const htmlAll = $tds.map((i, x) => $(x).html()).get().join('\r\n');
    return {
      totalCount: undefined,
      hasNext: false,
    };
  }

  private getTotalCount($td1: Cheerio) {
    const text = $td1.text().replace(/^(.*?)検索結果　(\d+)件中(.*?)$/, '$2');
    return parseInt(text, 10);
  }

  private getHasNext($td2: Cheerio): boolean {
    const result = /(\d+)件～(\d+)件　次へ/.exec($td2.text());
    return result !== null;
  }
}
