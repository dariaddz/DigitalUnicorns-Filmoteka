import Pagination from 'tui-pagination';
import '../sass/_pagination.scss';

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export let pagination = new Pagination('pagination', options);

export function paginationStart(data) {
  options.totalItems = data.total_results;
  pagination = new Pagination('pagination', options);
  return pagination;
}
