import search from './api/search';

export = {
  search,
};

(window as any).search = search;
