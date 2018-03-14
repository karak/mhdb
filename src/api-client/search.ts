import { IncrementalResult } from '../api/search';
import { Query } from '../api/HtmlClient';
import Work from '../api/Work';
import '../polyfill/fetch';
import * as qs from 'qs';

const SEARCH_API_URL = '/search';

export default async function search(
  query: Query,
): Promise<IncrementalResult<Work>> {
  const queryString = qs.stringify(query, { encode: true });
  const url = `${SEARCH_API_URL}?${queryString}`;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(json => JSON.parse(json));
}
