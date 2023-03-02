export const paginate = (data, itemsPerPage, page) => {
	const begin = (page - 1) * itemsPerPage;
	const end = begin + itemsPerPage;
	return data.slice(begin, end);
};
export const initialPaginate = (pageSize = 5, pageNumber = 1) => ({
  pageSize,
  pageNumber,
});
