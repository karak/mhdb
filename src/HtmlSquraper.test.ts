import HtmlSquraper from './HtmlSquraper';
import SearchResult from './SearchResult';
import Work from './Work';

describe('HtmlSquraper', () => {
  it('parse simple HTML.', () => {
    const html = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<a name="result"></a>
<table>
  <tr>
    <td>
      <tbody>
        <tr>
          <td class=text><!-- 右本文　タイトル -->
            <a name="top"></a><br>
            <TABLE>
            </TABLE>
            <table>
              <tr>
                <td><div><strong>以下の2件が検索されました。</strong></div></td>
              </tr>
            </table>
            <table>
              <tbody>
                <tr>
                  <td><a href="work_detail.php?cd=1">work1</a></td>
                  <td>author1</td>
                </tr>
                <tr>
                  <td><a href="work_detail.php?cd=2">work2</a></td>
                  <td>author2</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </td>
  </tr>
</body>
</html>
`;
    const squraper = new HtmlSquraper();

    const result = squraper.parseWorks(html);

    const expected: SearchResult<Work> = {
      items: [{
        id: '1',
        body: 'work1',
        author: 'author1',
      }, {
        id: '2',
        body: 'work2',
        author: 'author2',
      }],
      totalCount: 2,
      hasNext: false,
    };

    expect(result).toEqual(expected);
  });
});
