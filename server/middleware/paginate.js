/**
 * Function to paginate
 * @param {any} count
 * @param {any} limit
 * @param {any} offset
 * @returns
 */
const paginate = (count, limit, offset) => {
    const page = Math.floor(offset / limit) + 1;
    const pageCount = Math.ceil(count / limit);
    const pageSize = (count - offset) > limit ? limit : (count - offset);
  
    return {
      page,
      pageCount,
      pageSize,
      count
    };
  };
  
  export default paginate;

  