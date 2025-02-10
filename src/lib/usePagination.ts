type UsePaginationReturnType<T> = {
  totalPages: number;
  currentItems: T[];
};

export const usePagination = <T>(
  itemsArray: T[],
  itemsPerPage: number,
  pageNumber: number
): UsePaginationReturnType<T> => {
  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = itemsArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemsArray.length / itemsPerPage);

  return { totalPages, currentItems };
};
