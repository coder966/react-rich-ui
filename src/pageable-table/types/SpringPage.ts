import SpringPageable from "./SpringPageable";

/**
 * An interface for org.springframework.data.domain.Page
 */
interface SpringPage {
    pageable: SpringPageable,
    content: Array<Object>,
    totalPages: number,
    totalElements: number,
    number: number,
    size: number,
    numberOfElements: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    last: boolean,
    first: boolean,
    empty: boolean
}

export default SpringPage;
