import Pagination from 'tui-pagination';
import '../sass/_pagination.scss';

const options = {
  totalItems: 400,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export const pagination = new Pagination('pagination', options);
