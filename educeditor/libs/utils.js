export const getPageAmount = (totalLen, limit) => totalLen < limit ? 1 : Math.ceil(totalLen / limit)
export const getOffsetByPage = (page, limit) => (page - 1) * limit
