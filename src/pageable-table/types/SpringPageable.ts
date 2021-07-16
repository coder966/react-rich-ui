/**
 * An interface for org.springframework.data.domain.Pageable
 */
interface SpringPageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export default SpringPageable;
