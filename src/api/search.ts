import SearchClient from './SearchClient';
import { Query } from './HtmlClient';
import Work from './Work';

const client = new SearchClient('www.haiku-data.jp/');

export interface IncrementalResult<T> {
  items: ReadonlyArray<T>;
  moreItems?: () => Promise<IncrementalResult<T>>;
}

export default async function search(
  query: Query,
): Promise<IncrementalResult<Work>> {
  return await getItems(query);
}

async function getItems(
  query: Query,
  page?: number,
): Promise<IncrementalResult<Work>> {
  const result = await client.searchWorks(
    Object.assign({}, query, { page } as any),
  );
  const nextPage = page !== undefined ? page + 1 : 1;

  return {
    items: result.items,
    moreItems: result.hasNext
      ? async () => getItems(query, nextPage)
      : undefined,
  };
}
