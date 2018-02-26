/**
 * Search Result.
 */
export default interface SearchResult<T> {
  /** result items */
  items: ReadonlyArray<T>;
  /** total count of the items */
  totalCount: number;
  /** whether result has more items or not */
  hasNext: boolean;
}
