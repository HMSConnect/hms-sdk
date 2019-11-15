exports.createPaginate = (results, paginationOption) => {
  const offset = paginationOption.offset ? Number(paginationOption.offset) : 0
  const max = paginationOption.max ? Number(paginationOption.max) : 5

  return {
    schema: { version: 1.0, standard: 'SFHIR' },
    results: results.slice(offset, offset + max),
    totalCount: results.length
  }
}

// Give a sort spec, which can be in any of these forms:
//   {"key1": 1, "key2": -1}
//   [["key1", "asc"], ["key2", "desc"]]
//   ["key1", ["key2", "desc"]]
exports.createOptions = query => {
  const options = { fields: { __mock_meta: 0 } }
  if (query.sort) {
    const { orderBy, order } = query.sort || {}
    if (orderBy.includes('identifier')) {
      options.sort = [[`__mock_meta.${orderBy}`, order]]
    } else {
      options.sort = [[orderBy || 'id', order || 'desc']]
    }
  }
  return options
}
