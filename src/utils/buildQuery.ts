const buildQuery = (query: any) => {
  const {
    take,
    skip,
    sortBy = "createdAt",
    order = "desc",
    ...filters
  } = query;

  return {
    where: filters,
    options: {
      limit: Number(take) || 20,
      skip: Number(skip) || 0,
      sort: { [sortBy]: order === "asc" ? 1 : -1 },
    },
  };
};

export default buildQuery;
